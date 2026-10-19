-- F-042: edit/delete trades with full journal replay (D16). Apply after 001; 004 recommended for profiles.

CREATE OR REPLACE FUNCTION public.rebuild_account_from_trades(p_user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_acc RECORD;
  v_trade RECORD;
  v_level INT := 1;
  v_capital NUMERIC(14, 2) := 10000.00;
  v_peak NUMERIC(14, 2) := 10000.00;
  v_profile TEXT := 'cyber_grid';
  v_dd_pct NUMERIC;
  v_target_pct NUMERIC;
  v_base_cap NUMERIC(14, 2);
  v_target NUMERIC(14, 2);
  v_dd_daily NUMERIC(14, 2);
  v_old_level INT;
  v_new_cap NUMERIC(14, 2);
  v_new_level INT;
  v_trigger TEXT;
  v_trade_type TEXT;
  v_starting NUMERIC(14, 2);
BEGIN
  SELECT * INTO v_acc FROM public.trading_accounts WHERE user_id = p_user_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Account not found';
  END IF;

  v_profile := COALESCE(v_acc.rule_profile, 'cyber_grid');

  SELECT rp.dd_daily, rp.target
  INTO v_dd_pct, v_target_pct
  FROM public.rule_profile_pcts(v_profile) AS rp(dd_daily, target);

  DELETE FROM public.level_history WHERE user_id = p_user_id;

  FOR v_trade IN
    SELECT id, pnl, notes, created_at
    FROM public.trades
    WHERE user_id = p_user_id
    ORDER BY created_at ASC, id ASC
  LOOP
    v_old_level := v_level;
    v_base_cap := 10000.00 * POWER(1.5, v_old_level - 1);
    v_target := v_base_cap * v_target_pct;
    v_dd_daily := v_base_cap * v_dd_pct;
    v_starting := v_capital;

    v_new_cap := GREATEST(0.00, v_capital + v_trade.pnl);
    v_new_level := v_old_level;
    v_trigger := 'NONE';

    IF v_trade.pnl > 0 THEN
      v_trade_type := 'PROFIT';
    ELSIF v_trade.pnl < 0 THEN
      v_trade_type := 'LOSS';
    ELSE
      v_trade_type := 'NEUTRAL';
    END IF;

    IF (v_new_cap - v_base_cap) >= v_target AND v_old_level < 42 THEN
      v_new_level := LEAST(42, v_old_level + 1);
      v_trigger := 'TARGET_MET';
    ELSIF (v_base_cap - v_new_cap) >= v_dd_daily THEN
      v_new_level := GREATEST(1, v_old_level - 2);
      v_trigger := 'DRAWDOWN_HIT';
    END IF;

    UPDATE public.trades
    SET
      level = v_old_level,
      starting_capital = v_starting,
      ending_capital = v_new_cap,
      trade_type = v_trade_type
    WHERE id = v_trade.id;

    IF v_trigger != 'NONE' THEN
      INSERT INTO public.level_history (user_id, old_level, new_level, trigger_reason, capital_at_transition)
      VALUES (p_user_id, v_old_level, v_new_level, v_trigger, v_new_cap);
    END IF;

    v_capital := v_new_cap;
    v_level := v_new_level;
    v_peak := GREATEST(v_peak, v_capital);
  END LOOP;

  UPDATE public.trading_accounts
  SET
    current_level = v_level,
    current_capital = v_capital,
    peak_capital = v_peak,
    updated_at = NOW()
  WHERE user_id = p_user_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_trade(
  p_trade_id UUID,
  p_pnl NUMERIC(14, 2),
  p_notes TEXT DEFAULT NULL,
  p_created_at TIMESTAMPTZ DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_level INT;
  v_capital NUMERIC(14, 2);
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  UPDATE public.trades
  SET
    pnl = p_pnl,
    notes = p_notes,
    created_at = COALESCE(p_created_at, created_at)
  WHERE id = p_trade_id AND user_id = v_user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Trade not found';
  END IF;

  PERFORM public.rebuild_account_from_trades(v_user_id);

  SELECT current_level, current_capital INTO v_level, v_capital
  FROM public.trading_accounts WHERE user_id = v_user_id;

  RETURN jsonb_build_object(
    'success', true,
    'rebuilt', true,
    'new_level', v_level,
    'new_capital', v_capital
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.delete_trade(p_trade_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_level INT;
  v_capital NUMERIC(14, 2);
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  DELETE FROM public.trades WHERE id = p_trade_id AND user_id = v_user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Trade not found';
  END IF;

  PERFORM public.rebuild_account_from_trades(v_user_id);

  SELECT current_level, current_capital INTO v_level, v_capital
  FROM public.trading_accounts WHERE user_id = v_user_id;

  RETURN jsonb_build_object(
    'success', true,
    'rebuilt', true,
    'new_level', v_level,
    'new_capital', v_capital
  );
END;
$$;

REVOKE ALL ON FUNCTION public.rebuild_account_from_trades(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.update_trade(UUID, NUMERIC, TEXT, TIMESTAMPTZ) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.delete_trade(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_trade(UUID, NUMERIC, TEXT, TIMESTAMPTZ) TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_trade(UUID) TO authenticated;

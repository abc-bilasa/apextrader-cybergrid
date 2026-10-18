-- F-039: rule profiles on trading_accounts + RPC thresholds (D15). Apply after 001 (D13).

ALTER TABLE public.trading_accounts
  ADD COLUMN IF NOT EXISTS rule_profile TEXT NOT NULL DEFAULT 'cyber_grid'
  CHECK (rule_profile IN ('cyber_grid', 'prop_challenge_10', 'prop_scalping_5'));

COMMENT ON COLUMN public.trading_accounts.rule_profile IS
  'Promotion/demotion pct keys — see docs/DECISIONS.md D15';

CREATE OR REPLACE FUNCTION public.rule_profile_pcts(p_key TEXT)
RETURNS TABLE (dd_daily NUMERIC, target NUMERIC)
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
BEGIN
  CASE p_key
    WHEN 'prop_challenge_10' THEN
      RETURN QUERY SELECT 0.10::NUMERIC, 0.10::NUMERIC;
    WHEN 'prop_scalping_5' THEN
      RETURN QUERY SELECT 0.05::NUMERIC, 0.05::NUMERIC;
    ELSE
      RETURN QUERY SELECT 0.30::NUMERIC, 0.50::NUMERIC;
  END CASE;
END;
$$;

CREATE OR REPLACE FUNCTION public.log_trade(
  p_pnl NUMERIC(14, 2),
  p_notes TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_acc RECORD;
  v_base_cap NUMERIC(14, 2);
  v_target NUMERIC(14, 2);
  v_dd_daily NUMERIC(14, 2);
  v_dd_pct NUMERIC;
  v_target_pct NUMERIC;
  v_new_cap NUMERIC(14, 2);
  v_new_level INT;
  v_trigger TEXT := 'NONE';
  v_trade_type TEXT;
  v_old_level INT;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT * INTO v_acc
  FROM public.trading_accounts
  WHERE user_id = v_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Account not found';
  END IF;

  SELECT rp.dd_daily, rp.target
  INTO v_dd_pct, v_target_pct
  FROM public.rule_profile_pcts(v_acc.rule_profile) AS rp(dd_daily, target);

  v_old_level := v_acc.current_level;
  v_base_cap := 10000.00 * POWER(1.5, v_old_level - 1);
  v_target := v_base_cap * v_target_pct;
  v_dd_daily := v_base_cap * v_dd_pct;

  v_new_cap := GREATEST(0.00, v_acc.current_capital + p_pnl);
  v_new_level := v_old_level;

  IF p_pnl > 0 THEN
    v_trade_type := 'PROFIT';
  ELSIF p_pnl < 0 THEN
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

  UPDATE public.trading_accounts
  SET
    current_capital = v_new_cap,
    current_level = v_new_level,
    peak_capital = GREATEST(peak_capital, v_new_cap),
    updated_at = NOW()
  WHERE user_id = v_user_id;

  INSERT INTO public.trades (user_id, level, starting_capital, pnl, ending_capital, trade_type, notes)
  VALUES (v_user_id, v_old_level, v_acc.current_capital, p_pnl, v_new_cap, v_trade_type, p_notes);

  IF v_trigger != 'NONE' THEN
    INSERT INTO public.level_history (user_id, old_level, new_level, trigger_reason, capital_at_transition)
    VALUES (v_user_id, v_old_level, v_new_level, v_trigger, v_new_cap);
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'old_level', v_old_level,
    'new_level', v_new_level,
    'new_capital', v_new_cap,
    'trigger', v_trigger,
    'level_changed', (v_trigger != 'NONE'),
    'rule_profile', v_acc.rule_profile
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.simulate_trade(p_pnl NUMERIC(14, 2))
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_acc RECORD;
  v_base_cap NUMERIC(14, 2);
  v_target NUMERIC(14, 2);
  v_dd_daily NUMERIC(14, 2);
  v_dd_pct NUMERIC;
  v_target_pct NUMERIC;
  v_new_cap NUMERIC(14, 2);
  v_new_level INT;
  v_trigger TEXT := 'NONE';
  v_trade_type TEXT;
  v_old_level INT;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT * INTO v_acc
  FROM public.trading_accounts
  WHERE user_id = v_user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Account not found';
  END IF;

  SELECT rp.dd_daily, rp.target
  INTO v_dd_pct, v_target_pct
  FROM public.rule_profile_pcts(v_acc.rule_profile) AS rp(dd_daily, target);

  v_old_level := v_acc.current_level;
  v_base_cap := 10000.00 * POWER(1.5, v_old_level - 1);
  v_target := v_base_cap * v_target_pct;
  v_dd_daily := v_base_cap * v_dd_pct;

  v_new_cap := GREATEST(0.00, v_acc.current_capital + p_pnl);
  v_new_level := v_old_level;

  IF p_pnl > 0 THEN
    v_trade_type := 'PROFIT';
  ELSIF p_pnl < 0 THEN
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

  RETURN jsonb_build_object(
    'simulation', true,
    'success', true,
    'old_level', v_old_level,
    'new_level', v_new_level,
    'new_capital', v_new_cap,
    'trigger', v_trigger,
    'level_changed', (v_trigger != 'NONE'),
    'trade_type', v_trade_type,
    'rule_profile', v_acc.rule_profile
  );
END;
$$;

REVOKE ALL ON FUNCTION public.log_trade(NUMERIC, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.log_trade(NUMERIC, TEXT) TO authenticated;
REVOKE ALL ON FUNCTION public.simulate_trade(NUMERIC) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.simulate_trade(NUMERIC) TO authenticated;

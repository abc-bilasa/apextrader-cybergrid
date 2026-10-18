-- F-032: read-only preview of log_trade outcome (no writes). Apply after 001 (D13).

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

  v_old_level := v_acc.current_level;
  v_base_cap := 10000.00 * POWER(1.5, v_old_level - 1);
  v_target := v_base_cap * 0.50;
  v_dd_daily := v_base_cap * 0.30;

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
    'trade_type', v_trade_type
  );
END;
$$;

REVOKE ALL ON FUNCTION public.simulate_trade(NUMERIC) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.simulate_trade(NUMERIC) TO authenticated;

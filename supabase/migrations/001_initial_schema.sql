-- ApexTrader Cyber-Grid — initial schema (run once on empty Supabase project)
-- Authority: docs/DECISIONS.md + this file. After apply on shared DB, use 002_*.sql only.

-- ============================================================================
-- 1. EXTENSIONS
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 2. TABLES
-- ============================================================================
CREATE TABLE public.trading_accounts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  current_level INT DEFAULT 1 NOT NULL CHECK (current_level BETWEEN 1 AND 42),
  current_capital NUMERIC(14, 2) DEFAULT 10000.00 NOT NULL,
  peak_capital NUMERIC(14, 2) DEFAULT 10000.00 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE public.trades (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  level INT NOT NULL CHECK (level BETWEEN 1 AND 42),
  starting_capital NUMERIC(14, 2) NOT NULL,
  pnl NUMERIC(14, 2) NOT NULL,
  ending_capital NUMERIC(14, 2) NOT NULL,
  trade_type TEXT NOT NULL CHECK (trade_type IN ('PROFIT', 'LOSS', 'NEUTRAL')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE public.level_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  old_level INT NOT NULL CHECK (old_level BETWEEN 1 AND 42),
  new_level INT NOT NULL CHECK (new_level BETWEEN 1 AND 42),
  trigger_reason TEXT NOT NULL CHECK (trigger_reason IN ('TARGET_MET', 'DRAWDOWN_HIT', 'MANUAL_RESET')),
  capital_at_transition NUMERIC(14, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 3. INDEXES
-- ============================================================================
CREATE INDEX idx_trades_user_created ON public.trades(user_id, created_at ASC);
CREATE INDEX idx_level_history_user_created ON public.level_history(user_id, created_at DESC);

-- ============================================================================
-- 4. ROW LEVEL SECURITY
-- ============================================================================
ALTER TABLE public.trading_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.level_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own account"
  ON public.trading_accounts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own account"
  ON public.trading_accounts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own trades"
  ON public.trades FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own trades"
  ON public.trades FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own level history"
  ON public.level_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own level history"
  ON public.level_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- 5. SIGNUP → TRADING ACCOUNT
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.trading_accounts (user_id, current_level, current_capital, peak_capital)
  VALUES (NEW.id, 1, 10000.00, 10000.00);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 6. ATOMIC PROGRESSION ENGINE (D3, D4, D5, D12 — see docs/DECISIONS.md)
-- ============================================================================
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

  -- D12: promotion checked before demotion on same trade
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
    'level_changed', (v_trigger != 'NONE')
  );
END;
$$;

REVOKE ALL ON FUNCTION public.log_trade(NUMERIC, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.log_trade(NUMERIC, TEXT) TO authenticated;

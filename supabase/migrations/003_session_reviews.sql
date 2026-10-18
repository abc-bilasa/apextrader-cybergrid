-- F-035: end-of-day session reviews (one row per user per local review_day).

CREATE TABLE public.session_reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  review_day TEXT NOT NULL CHECK (review_day ~ '^\d{4}-\d{2}-\d{2}$'),
  plan_followed TEXT NOT NULL CHECK (plan_followed IN ('YES', 'PARTIAL', 'NO')),
  best_note TEXT,
  worst_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE (user_id, review_day)
);

CREATE INDEX idx_session_reviews_user_day ON public.session_reviews(user_id, review_day DESC);

ALTER TABLE public.session_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own session reviews"
  ON public.session_reviews FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own session reviews"
  ON public.session_reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own session reviews"
  ON public.session_reviews FOR UPDATE
  USING (auth.uid() = user_id);

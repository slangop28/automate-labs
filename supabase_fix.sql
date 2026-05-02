-- ============================================================
-- AutomateLabs.in — Supabase Schema Fix
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ── 1. FIX: audits table ────────────────────────────────────
-- Add missing columns if they don't already exist
ALTER TABLE IF EXISTS public.audits
  ADD COLUMN IF NOT EXISTS "countryCode" TEXT,
  ADD COLUMN IF NOT EXISTS "companyName" TEXT,
  ADD COLUMN IF NOT EXISTS phone        TEXT,
  ADD COLUMN IF NOT EXISTS email        TEXT,
  ADD COLUMN IF NOT EXISTS niche        TEXT,
  ADD COLUMN IF NOT EXISTS bottlenecks  TEXT,
  ADD COLUMN IF NOT EXISTS created_at   TIMESTAMPTZ DEFAULT now();

-- ── 2. FIX: callbacks table ─────────────────────────────────
-- Create or fix the callbacks table
CREATE TABLE IF NOT EXISTS public.callbacks (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT,
  "countryCode" TEXT,
  phone       TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE IF EXISTS public.callbacks
  ADD COLUMN IF NOT EXISTS "countryCode" TEXT,
  ADD COLUMN IF NOT EXISTS name         TEXT,
  ADD COLUMN IF NOT EXISTS phone        TEXT,
  ADD COLUMN IF NOT EXISTS created_at   TIMESTAMPTZ DEFAULT now();

-- ── 3. FIX: newsletter table ────────────────────────────────
CREATE TABLE IF NOT EXISTS public.newsletter (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT,
  "countryCode" TEXT,
  phone       TEXT,
  email       TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE IF EXISTS public.newsletter
  ADD COLUMN IF NOT EXISTS "countryCode" TEXT,
  ADD COLUMN IF NOT EXISTS name         TEXT,
  ADD COLUMN IF NOT EXISTS phone        TEXT,
  ADD COLUMN IF NOT EXISTS email        TEXT,
  ADD COLUMN IF NOT EXISTS created_at   TIMESTAMPTZ DEFAULT now();

-- ── 4. Enable RLS + allow anon inserts on all 3 tables ─────
-- (Required when using the anon/publishable key)

ALTER TABLE public.audits    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.callbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter ENABLE ROW LEVEL SECURITY;

-- Drop + recreate policies to avoid duplication errors
DROP POLICY IF EXISTS "allow_anon_insert_audits"     ON public.audits;
DROP POLICY IF EXISTS "allow_anon_insert_callbacks"  ON public.callbacks;
DROP POLICY IF EXISTS "allow_anon_insert_newsletter" ON public.newsletter;

CREATE POLICY "allow_anon_insert_audits"
  ON public.audits FOR INSERT
  TO anon WITH CHECK (true);

CREATE POLICY "allow_anon_insert_callbacks"
  ON public.callbacks FOR INSERT
  TO anon WITH CHECK (true);

CREATE POLICY "allow_anon_insert_newsletter"
  ON public.newsletter FOR INSERT
  TO anon WITH CHECK (true);

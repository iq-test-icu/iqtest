-- IQ-Test: Supabase schema
-- Run in Supabase SQL editor (Project -> SQL Editor -> New query)
-- Note: dropped the earlier irt_theta/score_band fields — this build does not run real
-- Item Response Theory calibration, and keeping fields named after a method we don't
-- actually use is its own false-claim risk. cognitive_index/percentile_estimate below
-- are plainly-labeled estimates, matching what the site's copy actually says.

create extension if not exists "pgcrypto";

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  answers jsonb,
  raw_score int not null,
  cognitive_index int not null,
  percentile_estimate int,
  category_breakdown jsonb,
  paid boolean not null default false,
  report text,
  stripe_session_id text,
  report_sent_at timestamptz,
  consent_given_at timestamptz not null,
  consent_text_version text not null default 'v1',
  created_at timestamptz not null default now()
);

create index if not exists sessions_email_idx on sessions (email);

-- Service-role-only access — no public RLS policy. The frontend never talks to
-- Supabase directly, only through the Worker, which holds the service key as a secret.
alter table sessions enable row level security;

-- Consent records: retain a minimum of 3 years past last interaction (CASL evidentiary
-- requirement for a Canada-based sender). Do not shorten this without checking current
-- CASL guidance — this file is not legal advice, confirm with counsel before launch.

-- Migration: add tier column (§6 of execution contract) and lead capture columns
-- Safe to run multiple times — "add column if not exists" is idempotent.
alter table sessions add column if not exists tier text check (tier in ('basic','detailed','complete'));
alter table sessions add column if not exists lead_only boolean default false;
alter table sessions add column if not exists marketing_opt_in boolean default false;
alter table sessions add column if not exists recovery_sent boolean not null default false;
alter table sessions add column if not exists locale text default 'en';

-- Partial index for high-performance abandoned-lead recovery sweeps
create index if not exists sessions_recovery_sweep_idx on sessions (created_at)
  where paid = false and recovery_sent = false and marketing_opt_in = true;

-- Telemetry events table (funnel instrumentation & live statistics)
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  session_id text,
  tier text,
  status text,
  error_code text,
  email text,
  ip text,
  meta jsonb,
  environment text default 'production',
  created_at timestamptz not null default now()
);

create index if not exists events_event_name_idx on events (event_name, created_at);
alter table events enable row level security;


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

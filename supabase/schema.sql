-- APEX IQ-Test: Supabase Schema
-- Sessions table — service-role-only access (no public RLS policies)

create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  email text,
  answers jsonb not null,
  raw_score int not null,
  irt_theta float,
  iq_estimate int,
  category_scores jsonb not null,
  score_band text not null,
  percentile_estimate int,
  premium_purchased boolean default false,
  stripe_session_id text,
  report_sent_at timestamptz,
  consent_given_at timestamptz,
  consent_text_version text default 'v1',
  created_at timestamptz default now()
);

alter table public.sessions enable row level security;
-- NO public policy exists. Service-role key only, invoked exclusively from the Worker.
-- Consent records retained minimum 3 years past last interaction per CASL evidentiary requirement.

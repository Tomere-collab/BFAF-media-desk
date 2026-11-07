create table if not exists public.media_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text not null,
  applicant_type text not null,
  instagram text,
  tiktok text,
  contribution text not null,
  status text not null default 'Under review',
  reviewer_notes text
);

alter table public.media_applications enable row level security;

-- No public read, update, or delete policies are created.
-- The server inserts using the private service-role key.

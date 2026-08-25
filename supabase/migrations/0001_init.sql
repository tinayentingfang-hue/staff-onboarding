-- ISO Training Portal — initial schema
-- Run this in the Supabase SQL editor (or via `supabase db push`) on a fresh project.

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────
-- Profiles (one row per staff member, mirrors auth.users)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  role text not null default 'staff' check (role in ('staff', 'admin')),
  start_date date,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- SECURITY DEFINER runs with the function owner's privileges, bypassing RLS
-- for the query inside it. Without this, a policy on `profiles` that checks
-- "is the current user an admin" by querying `profiles` would trigger that
-- same policy again on its own subquery — infinite recursion.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

drop policy if exists "profiles: self read" on public.profiles;
create policy "profiles: self read" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles: admin read all" on public.profiles;
create policy "profiles: admin read all" on public.profiles
  for select using (
    public.is_admin()
  );

drop policy if exists "profiles: self update own name" on public.profiles;
create policy "profiles: self update own name" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Lets the app self-heal a missing profile row (e.g. a re-invited user whose
-- auth.users row was reused, so the on-signup trigger never fired). Staff can
-- only ever insert themselves as 'staff' — only Tina's email may self-insert
-- as 'admin' — so this can't be used to self-promote.
drop policy if exists "profiles: self insert" on public.profiles;
create policy "profiles: self insert" on public.profiles
  for insert with check (
    auth.uid() = id
    and (role = 'staff' or (auth.jwt() ->> 'email') = 'tina.yenting.fang@gmail.com')
  );

-- Auto-create a profile row whenever a new auth user is created.
-- Tina's account is promoted to admin by email match; everyone else starts as staff.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role, start_date)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    case when new.email = 'tina.yenting.fang@gmail.com' then 'admin' else 'staff' end,
    current_date
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─────────────────────────────────────────────────────────────
-- Modules (training content, admin-editable)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  order_index int not null,
  title text not null,
  content text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.modules enable row level security;

drop policy if exists "modules: any authenticated user can read" on public.modules;
create policy "modules: any authenticated user can read" on public.modules
  for select using (auth.role() = 'authenticated');

drop policy if exists "modules: admin can write" on public.modules;
create policy "modules: admin can write" on public.modules
  for all using (
    public.is_admin()
  ) with check (
    public.is_admin()
  );

-- ─────────────────────────────────────────────────────────────
-- Quiz questions & options
-- ─────────────────────────────────────────────────────────────
create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules (id) on delete cascade,
  question text not null,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.quiz_questions (id) on delete cascade,
  option_text text not null,
  is_correct boolean not null default false,
  order_index int not null default 0
);

alter table public.quiz_questions enable row level security;
alter table public.quiz_options enable row level security;

drop policy if exists "quiz_questions: any authenticated user can read" on public.quiz_questions;
create policy "quiz_questions: any authenticated user can read" on public.quiz_questions
  for select using (auth.role() = 'authenticated');

drop policy if exists "quiz_questions: admin can write" on public.quiz_questions;
create policy "quiz_questions: admin can write" on public.quiz_questions
  for all using (
    public.is_admin()
  ) with check (
    public.is_admin()
  );

drop policy if exists "quiz_options: any authenticated user can read" on public.quiz_options;
create policy "quiz_options: any authenticated user can read" on public.quiz_options
  for select using (auth.role() = 'authenticated');

drop policy if exists "quiz_options: admin can write" on public.quiz_options;
create policy "quiz_options: admin can write" on public.quiz_options
  for all using (
    public.is_admin()
  ) with check (
    public.is_admin()
  );

-- ─────────────────────────────────────────────────────────────
-- Progress tracking
-- ─────────────────────────────────────────────────────────────
create table if not exists public.module_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  module_id uuid not null references public.modules (id) on delete cascade,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, module_id)
);

alter table public.module_progress enable row level security;

drop policy if exists "module_progress: self read/write" on public.module_progress;
create policy "module_progress: self read/write" on public.module_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "module_progress: admin read all" on public.module_progress;
create policy "module_progress: admin read all" on public.module_progress
  for select using (
    public.is_admin()
  );

-- ─────────────────────────────────────────────────────────────
-- Quiz attempts
-- ─────────────────────────────────────────────────────────────
create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  module_id uuid not null references public.modules (id) on delete cascade,
  score int not null,
  total int not null,
  passed boolean not null,
  created_at timestamptz not null default now()
);

alter table public.quiz_attempts enable row level security;

drop policy if exists "quiz_attempts: self read/insert" on public.quiz_attempts;
create policy "quiz_attempts: self read/insert" on public.quiz_attempts
  for select using (auth.uid() = user_id);

drop policy if exists "quiz_attempts: self insert" on public.quiz_attempts;
create policy "quiz_attempts: self insert" on public.quiz_attempts
  for insert with check (auth.uid() = user_id);

drop policy if exists "quiz_attempts: admin read all" on public.quiz_attempts;
create policy "quiz_attempts: admin read all" on public.quiz_attempts
  for select using (
    public.is_admin()
  );

-- ─────────────────────────────────────────────────────────────
-- Staff notes — private to the staff member who wrote them.
-- Deliberately NOT visible to admins (personal scratch notes).
-- ─────────────────────────────────────────────────────────────
create table if not exists public.staff_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  module_id uuid references public.modules (id) on delete cascade,
  note text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.staff_notes enable row level security;

drop policy if exists "staff_notes: self only" on public.staff_notes;
create policy "staff_notes: self only" on public.staff_notes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

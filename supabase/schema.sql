-- Schéma appliqué sur le projet Supabase « Pépite » (migration pepite_v2_family_sync).
-- Il coexiste avec les anciennes tables du projet (app_user, children, etc.), qui ne sont pas touchées.
-- Auth : Supabase Auth (e-mail + Google). Chaque ligne appartient à un parent (auth.uid()).
create table public.pp_profiles (user_id uuid primary key references auth.users(id) on delete cascade, name text not null default '', code_salt text, code_hash text, created_at timestamptz not null default now());
create table public.pp_children (id uuid primary key, parent_id uuid not null references auth.users(id) on delete cascade, data jsonb not null, updated_at timestamptz not null default now());
create table public.pp_sessions (id text primary key, child_id uuid not null references public.pp_children(id) on delete cascade, parent_id uuid not null references auth.users(id) on delete cascade, day date not null, data jsonb not null);
-- RLS activée sur les trois tables ; une politique « le parent ne voit et ne modifie que ses lignes » par table.

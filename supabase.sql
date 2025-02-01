create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  role text null default 'worker'::text,
  status text null default 'incomplete'::text, 
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  first_name text null default '',
  last_name text null default '',
  title text null default '',
  description text null default '',
  constraint profiles_pkey primary key (id),
  constraint profiles_role_check check (
    (
      role = any (array['worker'::text, 'contractor'::text])
    )
  ),
  constraint profiles_status_check check (
    (
      status = any (
        array[
          'incomplete'::text,
          'active'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

alter table public.profiles enable row level security;

create policy "Enable users to view their own data only"
on "public"."profiles"
for select
to authenticated
using (
  (( SELECT auth.uid() AS uid) = id)
);

create policy "Enable update for users based on id"
on "public"."profiles"
for update
to authenticated
using (
  (( SELECT auth.uid() AS uid) = id)
with check (
  (( SELECT auth.uid() AS uid) = id)
);

create table public.jobs (
  id bigint generated always as identity not null,
  contractor_id uuid not null,
  title text not null,
  description text not null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  salary numeric not null,
  payment_frequency text not null,
  duration text not null,
  status text not null,
  constraint jobs_pkey primary key (id),
  constraint jobs_contractor_id_fkey foreign KEY (contractor_id) references profiles (id) on delete CASCADE,
  constraint jobs_payment_frequency_check check (
    (
      payment_frequency = any (
        array[
          'hourly'::text,
          'daily'::text,
          'weekly'::text,
          'monthly'::text
        ]
      )
    )
  ),
  constraint jobs_status_check check (
    (
      status = any (
        array['open'::text, 'closed'::text, 'in_progress'::text]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_jobs_contractor_id on public.jobs using btree (contractor_id) TABLESPACE pg_default;

alter table public.jobs enable row level security;

create policy "Enable jobs read access for all users"
on "public"."jobs"
for select
using (
  true
);

create policy "Enable insert for users based on contractor_id, role and status"
on "public"."jobs"
for insert
to authenticated
with check (
  ((( SELECT auth.uid() AS uid) IN ( SELECT profiles.id
   FROM profiles
  WHERE ((profiles.role = 'contractor'::text) AND (profiles.status = 'active'::text)))) AND (( SELECT auth.uid() AS uid) = contractor_id))
);

create policy "Enable update for users based on contractor_id, role and status"
on "public"."jobs"
for update
to authenticated
using (
  ((( SELECT auth.uid() AS uid) IN ( SELECT profiles.id
   FROM profiles
  WHERE ((profiles.role = 'contractor'::text) AND (profiles.status = 'active'::text)))) AND (( SELECT auth.uid() AS uid) = contractor_id)))
with check (
  ((( SELECT auth.uid() AS uid) IN ( SELECT profiles.id
   FROM profiles
  WHERE ((profiles.role = 'contractor'::text) AND (profiles.status = 'active'::text)))) AND (( SELECT auth.uid() AS uid) = contractor_id))
);

create policy "Enable delete for users based on contractor_id, role and status"
on "public"."jobs"
for delete
to authenticated
using (
  ((( SELECT auth.uid() AS uid) IN ( SELECT profiles.id
   FROM profiles
  WHERE ((profiles.role = 'contractor'::text) AND (profiles.status = 'active'::text)))) AND (( SELECT auth.uid() AS uid) = contractor_id))
);

create table public.applications (
  id bigint generated always as identity not null,
  job_id bigint not null,
  worker_id uuid not null,
  status text not null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint applications_pkey primary key (id),
  constraint applications_job_id_fkey foreign KEY (job_id) references jobs (id) on delete CASCADE,
  constraint applications_worker_id_fkey foreign KEY (worker_id) references profiles (id) on delete CASCADE,
  constraint applications_status_check check (
    (
      status = any (
        array[
          'applied'::text,
          'interview'::text,
          'hired'::text,
          'rejected'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_applications_job_id on public.applications using btree (job_id) TABLESPACE pg_default;
create index IF not exists idx_applications_worker_id on public.applications using btree (worker_id) TABLESPACE pg_default;

create policy "Enable applications read access for workers based on worker_id"
on "public"."applications"
for select
to authenticated
using (
  (( SELECT auth.uid() AS uid) in ( SELECT profiles.id
   FROM profiles
  WHERE profiles.role = 'worker'::text) AND (( SELECT auth.uid() AS uid) = worker_id))
);

create policy "Enable applications read access for contractors based on job_id"
on "public"."applications"
for select
to authenticated
using (
  (( SELECT auth.uid() AS uid) in ( SELECT profiles.id
   FROM profiles
  WHERE profiles.role = 'contractor'::text) AND (( SELECT auth.uid() AS uid) = ( SELECT contractor_id
   FROM jobs
  WHERE jobs.id = job_id)))
);

create policy "Enable insert for workers based on worker_id"
on "public"."applications"
for insert
to authenticated
with check (
  (( SELECT auth.uid() AS uid) in ( SELECT profiles.id
   FROM profiles
  WHERE profiles.role = 'worker'::text) AND (( SELECT auth.uid() AS uid) = worker_id))
);

create policy "Enable update for contractors based on contractor_id and applied status"
on "public"."applications"
for update
to authenticated
using (
  (( SELECT auth.uid() AS uid) in ( SELECT profiles.id
   FROM profiles
  WHERE profiles.role = 'contractor'::text) AND (( SELECT auth.uid() AS uid) = ( SELECT contractor_id
   FROM jobs
  WHERE jobs.id = job_id)) AND (status = 'applied'::text))
) with check (
  (( SELECT auth.uid() AS uid) in ( SELECT profiles.id
   FROM profiles
  WHERE profiles.role = 'contractor'::text) AND (( SELECT auth.uid() AS uid) = ( SELECT contractor_id
   FROM jobs
  WHERE jobs.id = job_id)) AND ((status = 'interview'::text) OR (status = 'rejected'::text)))
);

create policy "Enable update for contractors based on contractor_id and interview status"
on "public"."applications"
for update
to authenticated
using (
  (( SELECT auth.uid() AS uid) in ( SELECT profiles.id
   FROM profiles
  WHERE profiles.role = 'contractor'::text)) AND ((( SELECT auth.uid() AS uid) = ( SELECT contractor_id
   FROM jobs
  WHERE jobs.id = job_id)) AND (status = 'interview'::text))
) with check (
  ( SELECT auth.uid() AS uid) in ( SELECT profiles.id
   FROM profiles
  WHERE profiles.role = 'contractor'::text) AND (( SELECT auth.uid() AS uid) = ( SELECT contractor_id
   FROM jobs
  WHERE jobs.id = job_id)) AND ((status = 'hired'::text) OR (status = 'rejected'::text))
);

create policy "Enable delete for workers based on worker_id"
on "public"."applications"
for delete
to authenticated
using (
  (( SELECT auth.uid() AS uid) in ( SELECT profiles.id
   FROM profiles
  WHERE profiles.role = 'worker'::text) AND (( SELECT auth.uid() AS uid) = worker_id))
);

alter table public.applications enable row level security;

create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id)
  values ( new.id );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

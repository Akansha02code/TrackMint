# Supabase Schema (Optional Backend)

This app runs without Supabase (local-only mode). If you want multi-device sync + realtime, create these tables and enable RLS.

## Tables

### `expenses`

- `id` uuid primary key default gen_random_uuid()
- `user_id` uuid not null references auth.users(id)
- `amount` numeric not null
- `category` text not null
- `notes` text not null default ''
- `date` text not null  -- stored as `yyyy-MM-dd`
- `created_at` timestamptz not null default now()

### `budgets`

- `user_id` uuid not null references auth.users(id)
- `month` text not null -- `yyyy-MM`
- `amount` numeric not null
- primary key (`user_id`, `month`)

## RLS policies

Enable RLS on both tables and add:

- Select/Insert/Update/Delete: `auth.uid() = user_id`

## Realtime

Enable realtime for `expenses` and `budgets` tables in the Supabase dashboard.


# Expense Tracker (React)

Modern, responsive Expense Tracker web app with realtime updates.

## Run (local-only mode)

1. `cd projects/expense-tracker-web`
2. `npm.cmd install`
3. `npm.cmd run dev`

Local mode stores data in `localStorage` and syncs across tabs via `BroadcastChannel`.

## Run (Supabase mode)

1. Create a Supabase project and apply `SUPABASE_SCHEMA.md`
2. Create `.env` from `.env.example` and fill:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. `npm.cmd run dev`

## Features

- Auth: Login/Signup, persistent session
- Dashboard: totals, monthly budget, remaining, recent transactions, CSV export
- Calendar: highlights expense days, add expenses per date
- Profile: category pie + monthly trend chart
- Notification bar: remaining budget + days left (auto-updates daily)


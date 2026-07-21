# TrackMint

TrackMint is a modern expense tracking web app built with React, TypeScript, Vite, Tailwind CSS, Zustand, and Supabase-compatible APIs. It helps users log expenses, monitor monthly budgets, and view spending insights through a polished dashboard, calendar view, and analytics charts.

## Overview

This project is designed for everyday personal finance tracking with a simple and modern interface. It supports:

- Secure authentication flow for login and signup
- Expense creation, filtering, and deletion
- Monthly budget tracking and spending summaries
- Calendar-based expense browsing
- Visual charts for category and monthly spending trends
- Optional cloud sync through Supabase
- Progressive Web App (PWA) support for installation and offline-friendly use

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Zustand for state management
- React Router
- Recharts for charts
- Supabase for optional backend sync
- Vite PWA for installable web app behavior

## Features

- Authentication: login and signup experience with persistent sessions
- Dashboard: total spending, month-to-date totals, remaining budget, and recent transactions
- Budget controls: set monthly budget, reset month, and monitor progress
- Calendar view: quickly inspect expenses by day
- Insights: category breakdown and trend charts
- Local-first mode: data can be stored in browser localStorage and synced across tabs
- Cloud mode: connect to Supabase for multi-device sync and realtime updates

## Project Structure

- src/components: reusable UI components and page sections
- src/pages: route-level pages such as dashboard, calendar, auth, and profile
- src/store: global state for auth, finance, and UI behavior
- src/services/api: abstraction for local storage and Supabase-backed data access
- src/lib: helpers for dates, IDs, money formatting, and storage
- src/types: shared TypeScript models

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm or pnpm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Run locally

Start the development server:

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal (usually http://localhost:5173).

### Build for production

```bash
npm run build
```

### Lint the project

```bash
npm run lint
```

## Local-Only Mode

By default, the app runs in local-only mode. In this mode:

- expenses and budgets are saved in browser localStorage
- data syncs across tabs using BroadcastChannel
- no backend setup is required

## Supabase Mode (Optional)

To enable cloud-backed storage and realtime sync:

1. Create a Supabase project
2. Apply the schema from SUPABASE_SCHEMA.md
3. Create a .env file in the project root with:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the app again with:

```bash
npm run dev
```

## Available Scripts

- npm run dev: start the development server
- npm run build: create a production build
- npm run preview: preview the production build locally
- npm run lint: run ESLint checks

## Notes

The app uses a clean, component-based architecture and is suitable as a foundation for a personal finance product, a portfolio project, or a starting point for more advanced budgeting features.


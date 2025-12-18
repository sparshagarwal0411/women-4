## WomenPreneur

WomenPreneur is a web platform built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS** to empower women entrepreneurs with tools, resources, and community support.

It includes:
- **Scheme Finder** for discovering government and private schemes
- **Grants & Finance Toolkit** for tracking loans, grants, and finances
- **Skill-Up & Mentorship** modules for learning and connecting with mentors
- **Storefront Builder** to help set up and showcase small businesses
- **Community & Chat** features powered by Supabase and Groq (AI assistant)

---

## Tech stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, custom components
- **Routing**: `react-router-dom`
- **State/UI**: React hooks, dark mode support
- **Backend-as-a-Service**: Supabase (`@supabase/supabase-js`)
- **AI/Chat**: Groq Chat Completions API
- **Charts/Visualizations**: `react-chartjs-2`

---

## Getting started

### Prerequisites

- **Node.js** 18+ (or the version recommended for Vite)
- **npm** (comes with Node) or another package manager like `pnpm`/`yarn`

### Install dependencies

```bash
npm install
```

### Run the app in development

```bash
npm run dev
```

Then open the printed local URL in your browser (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Lint & type-check

```bash
npm run lint
npm run typecheck
```

---

## Environment variables

Create a `.env` file (or `.env.local`) in the project root for local development and add:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GROQ_API_KEY=your_groq_api_key
```

These are used by:
- `src/lib/supabase.ts` for database/auth
- `src/lib/groq.ts` and related components for AI chat

> For detailed Groq setup steps, see `GROQ_SETUP.md`.

---

## Project structure (high-level)

- `src/main.tsx` – React entry point, mounts the app
- `src/App.tsx` – Main router, dark mode, and layout
- `src/pages/` – Main features and routes:
  - `Home`, `About`, `FAQs`
  - `SchemeFinder`, `Grants`, `FinanceToolkit`, `loanmonitor`
  - `SkillUp`, `StorefrontBuilder`
  - `MentorshipNetwork`, `MentorMentorship`, `MentorProfile`
  - `Community`, `Connect`
  - `Login`, `UserProfile`, `AdminProfile`
- `src/components/` – Reusable UI: navigation, hero, features, sticky buttons, protected route, etc.
- `src/lib/` – Supabase and Groq integration
- `public/` – Static assets and standalone pages (e.g. `loan-monitor.html`)

---

## Authentication & test logins

The app uses Supabase for authentication. For local testing without a full auth setup, this repo includes:

- **`FAKE_LOGINS.md`** – Example/test login accounts and tips for manual testing

Make sure Supabase is configured correctly if you plan to use real auth in development or production.

---

## Styling & theming

- Tailwind classes are used throughout components.
- A **dark mode** toggle is implemented in `App.tsx` and persisted via `localStorage`, applying a `dark` class on `<html>`.

---

## Groq AI assistant

The platform integrates Groq’s Chat Completions API for an AI assistant that helps users with:
- Entrepreneurship questions
- Business and finance guidance
- Platform feature walkthroughs

Follow `GROQ_SETUP.md` to:
- Obtain a Groq API key
- Configure the `VITE_GROQ_API_KEY` environment variable
- Understand how chat messages are sent via `getGroqResponse` in `src/lib/groq.ts`

---

## Scripts (from `package.json`)

- **`npm run dev`** – Start Vite dev server
- **`npm run build`** – Build production bundle
- **`npm run preview`** – Preview built app
- **`npm run lint`** – Run ESLint
- **`npm run typecheck`** – Type-check with TypeScript

---

## Contributing / customization

- Adjust navigation, routes, and pages in `src/App.tsx` and `src/pages/`.
- Customize styling with Tailwind via `index.css` and `tailwind.config.js`.
- Extend data models and auth flows in `src/lib/supabase.ts` and related components.

If you share this project or deploy it, consider updating this `README` with deployment-specific steps (e.g. Vercel, Netlify, Render) and real production environment variable values.






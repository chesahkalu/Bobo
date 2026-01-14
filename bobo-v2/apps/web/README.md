# Bobo Web App 🌐

This is the Next.js frontend for Bobo, the smart baby tracking application.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **AI**: Integration for smart insights

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Copy `.env.example` from the root or create `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

- `app/`: Next.js App Router (Pages, Layouts, Components)
- `lib/`: Shared utilities and Supabase clients
- `public/`: Static assets (Logos, Icons)
- `middleware.ts`: Auth session handling

---

© 2026 Bobo. All rights reserved.

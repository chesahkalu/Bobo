# Bobo V2 🍃

<div align="center">
  <img src="apps/web/public/bobo-logo.svg" alt="Bobo Logo" width="120" />
  
  **Smart Baby Tracking for Modern Parents**
  
  AI-powered insights for sleep, feeding, growth & milestones
  
  [![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
  [![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://typescriptlang.org)
  [![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwindcss)](https://tailwindcss.com)
</div>

---

## ✨ Features

| Feature | Status | Description |
|---------|--------|-------------|
| 🌙 **Smart Sleep Tracking** | 🔜 Coming | AI predicts optimal nap windows |
| 🍼 **Feeding Insights** | 🔜 Coming | Track breast, bottle, and solids |
| 📊 **Growth Milestones** | 🔜 Coming | Research-backed development guidance |
| 👨‍👩‍👧 **Family Sync** | 🔜 Coming | Real-time sharing with caregivers |
| 🤖 **AI Parenting Chatbot** | 🔜 Coming | Intelligent LLM-powered assistant |
| 💬 **Parent Forum** | 🔜 Coming | Community discussions & support |
| 🛒 **Marketplace** | 🔜 Coming | Buy/sell/swap baby items |

---

## 🏗️ Tech Stack

This is a complete rebuild using modern 2025 technologies:

| Layer | Technology | Notes |
|-------|------------|-------|
| **Monorepo** | Turborepo | Efficient builds with caching |
| **Web Framework** | Next.js 16 | App Router, React 19, Server Components |
| **Styling** | Tailwind CSS 4 | Custom design system (Sage/Terracotta/Charcoal) |
| **Database** | Supabase (PostgreSQL) | Real-time, Row Level Security |
| **Auth** | Supabase Auth | Magic links, OAuth, MFA |
| **Storage** | Supabase Storage | Baby photos, documents |
| **AI** | OpenAI / Google AI | Sleep predictions, chatbot |
| **Mobile** | React Native + Expo | Coming soon |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or pnpm
- Supabase account (free tier works!)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/chesahkalu/Bobo.git
cd Bobo/bobo-v2

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 4. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
OPENAI_API_KEY=your-openai-key  # Optional, for AI features
```

---

## 📁 Project Structure

```
bobo-v2/
├── apps/
│   └── web/                    # Next.js web application
│       ├── app/                # App Router pages & layouts
│       │   ├── components/     # UI components (Navbar, Hero, etc.)
│       │   └── (auth)/         # Auth pages (coming soon)
│       ├── lib/                # Utilities
│       │   └── supabase/       # Supabase client configuration
│       └── middleware.ts       # Auth session handling
├── packages/
│   ├── ui/                     # Shared component library
│   └── typescript-config/      # Shared TS config
├── supabase/
│   └── migrations/             # Database schema
└── turbo.json                  # Monorepo configuration
```

---

## 🎨 Design System

Bobo V2 uses a **"Sophisticated Warmth"** design language:

| Color | Usage | Hex |
|-------|-------|-----|
| 🌿 **Deep Sage** | Primary brand, buttons | `#425a51` |
| 🧱 **Terracotta** | Accents, CTAs | `#cf765d` |
| 🖤 **Charcoal** | Text, headings | `#1a1a1a` |
| ⬜ **Warm White** | Backgrounds | `#fdfdfc` |

---

## 🗄️ Database Schema

Core tables in Supabase:

- `profiles` - User profiles
- `babies` - Baby information
- `caregivers` - Multi-user access
- `sleep_logs`, `feeding_logs`, `diaper_logs` - Tracking data
- `milestones`, `baby_milestones` - Development tracking
- `forum_categories`, `forum_threads`, `forum_posts` - Community
- `marketplace_items` - Buy/sell listings

See [`supabase/migrations/001_initial_schema.sql`](./supabase/migrations/001_initial_schema.sql) for full schema.

---

## 📱 Roadmap

- [x] Landing page with waitlist
- [x] Supabase integration
- [ ] Authentication (signup/login)
- [ ] Dashboard & baby profiles
- [ ] Sleep, feeding, diaper tracking
- [ ] AI insights & predictions
- [ ] AI parenting chatbot
- [ ] Parent forum
- [ ] Marketplace
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

We welcome contributions! See the original [Bobo repository](https://github.com/chesahkalu/Bobo) for contribution guidelines.

---

## 📄 License

This project is licensed under the Apache License 2.0.

---

## 👤 Author

**[Chesachi Kalu](https://chesahkalu.github.io/my_resume/)**

---

<div align="center">
  <sub>Built with ❤️ for parents everywhere</sub>
  <br>
  <sub>© 2026 Bobo. All rights reserved.</sub>
</div>

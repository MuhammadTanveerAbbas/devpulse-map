<div align="center">

  <img src="public/logo.svg" alt="DevPulse Logo" width="80" height="80" />

# DevPulse Global Developer Intelligence

**A real-time dashboard tracking the global developer ecosystem: salaries, AI risk, hot niches, hiring signals, and live activity across 44+ countries**

[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

</div>

---

## What is DevPulse?

DevPulse is a live developer ecosystem intelligence dashboard. It pulls real data from GitHub, Remotive, HackerNews, Dev.to, and Stack Overflow and presents it in a sleek, terminal-aesthetic UI giving developers a pulse on what's happening across the global tech landscape right now.

Whether you want to know which roles are being eaten by AI, what niches are paying the most, or which dev hubs are most active worldwide it's all here, live.

---

## Features

### 🌍 Interactive World Map

- Dotted SVG world map with per-country developer activity intensity coloring
- 26 dev hub markers (San Francisco, Bangalore, Karachi, Nairobi, Tel Aviv, and more) rendered as interactive triangle pins
- Hover any hub for a rich tooltip showing: developer count, GitHub pushes/day, public repos, top language, top framework, AI adoption %, remote worker %, avg salary, and YoY growth all with live-incrementing numbers
- Pulsing animations on top-10 most active countries
- Layered canvas + SVG rendering for performance (static dots on canvas, animated dots in SVG)

### 📊 Stats Grid

- **GitHub Activity** live commits/sec and new job postings/min, both animating in real time
- **AI Tool Adoption** animated progress bar showing the % of devs using AI coding assistants, plus Stack Overflow questions/hr
- **AI Replacement Risk** flip cards for 8 developer roles showing automation risk % with color-coded severity. Tap any card to flip it and get personalized upskilling advice
- **Hot Niches · Demand Index** ranked demand bars for the hottest specializations (AI/LLM, RAG, DevOps, Cybersecurity, Web3, etc.) with YoY growth and avg freelance rates

### 💼 Salary by Role

- Live-animating median salaries for 8 roles (AI/ML Engineer → Frontend Developer) with YoY trend indicators, overlaid directly on the map

### 📰 Live Feed (3-column)

- **Hacker News** top 5 stories fetched live with score, author, comment count, and time ago
- **GitHub Trending** top 5 repos by stars with language color dots, description, and topic tags
- **Dev.to Articles** top 6 trending articles with reactions, read time, and tags

### 📡 Job Ticker

- Scrolling live job feed at the bottom of the page, pulled from Remotive's remote jobs API pauses on hover, shows category, company, and salary when available

---

## How It Works

```
Data Sources (live APIs)          Next.js App Router
─────────────────────             ──────────────────
GitHub Search API        ──►      fetchGithubTrending()
Remotive Jobs API        ──►      fetchRemotiveJobs()
HackerNews Firebase API  ──►      fetchHNTopStories()
Dev.to API               ──►      fetchDevToArticles()

Static / Curated Data             Components
─────────────────────             ──────────
dev-data.ts              ──►      DottedMap (world map + tooltips)
dotted-map-data.json     ──►      StatsDisplay (all stat cards)
                                   JobTicker (scrolling jobs)
                                   LiveFeed (HN + GitHub + Dev.to)
```

API responses are cached via Next.js `revalidate` jobs and articles refresh every 5 minutes, GitHub trending every 10 minutes, HN stories every 2 minutes. The live counters (commits/sec, devs online, etc.) are client-side animated from curated base values with realistic variance.

---

## Tech Stack

| Category        | Technology                             |
| --------------- | -------------------------------------- |
| Framework       | Next.js 16 (App Router) + React 19     |
| Language        | TypeScript 5                           |
| Styling         | Tailwind CSS v4                        |
| Animation       | Framer Motion 12                       |
| Map Rendering   | d3-geo (Mercator projection)           |
| Map Data        | Custom dotted-map JSON                  |
| Icons           | Lucide React                           |
| Fonts           | Geist Sans + Geist Mono (Google Fonts) |
| Package Manager | pnpm                                   |

---

## Project Structure

```
devpulse/
├── app/
│   ├── components/
│   │   ├── AIRiskCard.tsx       # Flip card with risk bar + upskilling advice
│   │   ├── DottedMap.tsx        # World map: canvas dots + SVG animations + hub markers + tooltips
│   │   ├── JobTicker.tsx        # Scrolling live job feed (Remotive API)
│   │   ├── LiveFeed.tsx         # HN + GitHub Trending + Dev.to columns
│   │   ├── MapContainer.tsx     # Dynamic import wrapper (SSR disabled for map)
│   │   └── StatsDisplay.tsx     # All stat cards, counters, salary rows, AI risk grid
│   ├── data/
│   │   ├── dev-data.ts          # Country activity, salaries, AI risk, hot niches, hub markers
│   │   └── dotted-map-data.json # Pre-computed dot positions per country
│   ├── lib/
│   │   └── api.ts               # All external API fetch functions
│   ├── globals.css              # Design system CSS variables + animations
│   ├── layout.tsx               # Root layout with metadata + fonts
│   └── page.tsx                 # Main dashboard page
├── components/
│   └── ui/                      # shadcn/ui component library
├── hooks/                       # Custom React hooks
├── lib/
│   └── utils.ts                 # Utility functions (cn, etc.)
├── public/
│   └── logo.svg                 # DevPulse logo
```

---

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

```bash
# Clone the repo
git clone https://github.com/MuhammadTanveerAbbas/devpulse-map.git
cd devpulse-map

# Install dependencies
pnpm install

# Start the dev server
pnpm dev

# Open http://localhost:3000
```

No environment variables required all APIs used are public.

---

## Available Scripts

| Command      | Description              |
| ------------ | ------------------------ |
| `pnpm dev`   | Start development server |
| `pnpm build` | Build for production     |
| `pnpm start` | Start production server  |
| `pnpm lint`  | Run ESLint               |

---

## Deploy

One-click deploy on Vercel no env vars needed:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MuhammadTanveerAbbas/devpulse-map)

---

## Credits & Data Sources

This project wouldn't exist without these excellent tools and APIs:

| Tool / Service                                               | What it powers                                           |
| ------------------------------------------------------------ | -------------------------------------------------------- |
| [Next.js](https://nextjs.org)                                | App framework, server components, API caching            |
| [React](https://react.dev)                                   | UI rendering                                             |
| [Tailwind CSS](https://tailwindcss.com)                      | All styling                                              |
| [Framer Motion](https://www.framer.com/motion/)              | Animations pixel flip transitions, bar fills, card flips |
| [d3-geo](https://d3js.org/d3-geo)                            | Mercator map projection for dot and marker placement     |
| [Lucide React](https://lucide.dev)                           | Icons                                                    |
| [Geist Font](https://vercel.com/font) by Vercel              | The monospace terminal aesthetic                         |
| [shadcn/ui](https://ui.shadcn.com)                           | Base UI component primitives                             |
| [GitHub Search API](https://docs.github.com/en/rest/search)  | Trending repositories                                    |
| [Remotive API](https://remotive.com/api/remote-jobs)         | Live remote job listings                                 |
| [HackerNews Firebase API](https://github.com/HackerNews/API) | Top stories feed                                         |
| [Dev.to API](https://developers.forem.com/api)               | Trending developer articles                              |
| [Stack Overflow](https://stackoverflow.com)                  | Question volume data reference                           |

---

## Contributing

PRs are welcome. Fork the repo, create a branch, and open a pull request.

```bash
git checkout -b feature/your-idea
git commit -m 'Add your idea'
git push origin feature/your-idea
```

---

## License

MIT see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built by Muhammad Tanveer Abbas**

[![Twitter](https://img.shields.io/badge/Twitter-@m__tanveerabbas-1DA1F2?style=for-the-badge&logo=twitter)](https://x.com/m_tanveerabbas)
[![GitHub](https://img.shields.io/badge/GitHub-MuhammadTanveerAbbas-181717?style=for-the-badge&logo=github)](https://github.com/MuhammadTanveerAbbas)

_If DevPulse gave you value, a goes a long way_

</div>

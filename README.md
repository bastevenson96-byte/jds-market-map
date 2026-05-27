# JDS Sports — College Sports Startup Market Map

Interactive VC market map for college sports startups. Built with React + Vite + Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or connect the repo in the Vercel dashboard — it will auto-detect Vite and use the config in `vercel.json`.

## Features

- **10 category columns** × **5 funding tier rows** grid
- Click any company chip to open a slide-in detail panel
- Filter by funding stage (dim non-matching tiers)
- Toggle individual category columns on/off
- Real-time search highlights matching companies
- Hide/show incumbents & acquired companies (startups-only view)
- Export the current view as a PNG (html2canvas)
- JDS Top 10 picks flagged with ★ and colored border
- Press `Esc` to close the detail panel

## Project structure

```
src/
  data/
    companies.js      # all company data (COMPANIES, CATEGORIES, TIERS)
  components/
    FilterBar.jsx     # stage + category filters, search, export
    MarketMap.jsx     # main grid (categories × tiers)
    CompanyPanel.jsx  # slide-in detail panel
  App.jsx             # root — state management
  main.jsx
  index.css
```

## Updating data

All company data lives in `src/data/companies.js`. Each entry follows this shape:

```js
{
  id: "unique-id",
  name: "Company Name",
  category: "NIL & Athlete Intelligence",   // must match CATEGORIES
  subCategory: "NIL Marketplace",
  role: "AI Platform",
  tier: "seed",                              // must match TIERS id
  stage: "Seed",
  funding: "$2M seed",
  founded: "2022",
  hq: "New York, NY",
  description: "...",
  partners: "...",
  status: "Active",   // Active | Established | Acquired | Nonprofit | Regulatory Body
  website: "example.com",
  notes: "JDS diligence notes...",
  jdsTop10: false
}
```

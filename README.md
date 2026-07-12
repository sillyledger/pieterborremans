# pieterborremans.com

Personal journal / founder site for Pieter Borremans. Next.js 15 + TypeScript +
Tailwind, deployed on Vercel. Same stack and conventions as pieter.tw.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Fonts: Lora (serif, headlines) + Plus Jakarta Sans (body/UI), loaded via `next/font/google`
- Deployed on Vercel

## Design tokens

| Token | Value |
|---|---|
| Background | `#161618` |
| Text | `#F5F3EE` |
| Muted text | `#9A9E93` |
| Accent (gold) | `#E8B923` |
| Accent (red) | `#C23B3B` |
| Hairline | `rgba(255,255,255,0.08)` |

Defined in `tailwind.config.ts` as `bg`, `ink`, `muted`, `gold`, `red`, `hairline`.

## Status

This is the initial scaffold — homepage only, static placeholder posts.

**Not yet wired up:**
- Supabase (posts will come from the same shared project pieter.tw uses,
  filtered by `target_site = 'pieterborremans.com'`)
- Ryoka OS publishing (`target_site` option needs to be added there)
- Individual blog post pages / routing
- About, Projects, Contact pages
- WordPress content migration (images + posts)
- Custom domain (currently on the Vercel preview domain only)

## Local development

```bash
npm install
npm run dev
```

Runs at http://localhost:3000

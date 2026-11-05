---
name: react-nextjs
description: Build production React and Next.js apps (App Router, server components, data fetching, forms, performance). Use this skill whenever the user builds a web frontend, mentions React, Next.js, hooks, SSR/SSG, routing, server actions, or wants a fast, SEO-friendly web app.
---

# React & Next.js

## Principles
1. Server Components by default; add `"use client"` only for interactivity (state, effects, browser APIs).
2. Fetch data on the server (async components / route handlers); use TanStack Query on the client for mutations and live data.
3. Colocate: `app/<route>/page.tsx`, `loading.tsx`, `error.tsx`, `layout.tsx`.
4. Validate all inputs with Zod, on both client and server (server actions / API routes).
5. Forms: `react-hook-form` + Zod resolver, or server actions with `useActionState`.

## Structure
```
src/
├── app/            # routes
├── components/ui/  # primitives (button, input, dialog)
├── components/     # feature components
├── lib/            # db, auth, utils, env (validated)
└── hooks/ types/
```

## Rules for components
- Small, single-purpose; props typed; no prop drilling beyond 2 levels (use composition or context).
- Derive state instead of syncing it with `useEffect`. Effects are for external systems only.
- Stable `key`s; avoid index keys for dynamic lists.
- `next/image`, `next/font`, dynamic imports for heavy client code.

## SEO & perf
Metadata API per route, `sitemap.ts`, `robots.ts`, OpenGraph images; cache with `revalidate`/tags; target LCP < 2.5 s, CLS < 0.1.

## Auth & security
Auth.js/Clerk/Supabase Auth; check session in server code, not just middleware; never expose secrets (only `NEXT_PUBLIC_*` is client-visible); sanitize rendered HTML.

## Checklist
- [ ] TypeScript strict  - [ ] ESLint + Prettier  - [ ] Loading/error boundaries  - [ ] Env validated  - [ ] Lighthouse ≥ 90

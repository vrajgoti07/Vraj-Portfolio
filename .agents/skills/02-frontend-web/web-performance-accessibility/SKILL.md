---
name: web-performance-accessibility
description: Audit and improve website speed (Core Web Vitals), SEO, and accessibility (WCAG). Use this skill whenever the user says the site is slow, asks about Lighthouse, Core Web Vitals, bundle size, SEO, screen readers, or WCAG compliance.
---

# Web Performance & Accessibility

## Performance workflow
1. Measure: Lighthouse, WebPageTest, Chrome Performance panel, real-user (web-vitals).
2. Fix biggest first: **LCP** (preload hero image, optimize/AVIF/WebP, SSR, CDN), **INP** (break up long tasks, debounce, avoid heavy handlers, `startTransition`), **CLS** (width/height on media, reserve space, font-display swap).
3. JS: code-split by route, tree-shake, remove unused deps (`source-map-explorer`), defer third parties.
4. Network: HTTP caching headers, compression (br/gzip), HTTP/2+, preconnect critical origins.
5. Images/fonts: responsive `srcset`, lazy-load below the fold, subset + self-host fonts.

## Accessibility (WCAG 2.2 AA)
- Semantic landmarks (`header nav main footer`), one `h1`, ordered headings.
- Every input has a `<label>`; errors linked via `aria-describedby`.
- Full keyboard use; visible focus; no keyboard traps; skip link.
- Contrast 4.5:1; don't rely on color alone; respect `prefers-reduced-motion`.
- Alt text meaningful or empty for decorative; captions for video.
- Test: axe DevTools, keyboard-only pass, screen reader (NVDA/VoiceOver).

## SEO basics
Unique `<title>`/meta description, canonical, structured data (JSON-LD), sitemap/robots, clean URLs, fast mobile.

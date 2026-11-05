# Vraj Goti — Portfolio & Autonomous AI Systems

> **Production-grade personal portfolio website for Vraj Goti** (GitHub: [`@vrajgoti07`](https://github.com/vrajgoti07), based in Surat, Gujarat, India) — Full-stack engineer crafting autonomous AI agents, realtime voice systems, and robust web applications.

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1.7-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript Strict](https://img.shields.io/badge/TypeScript-5.x%20Strict-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-Unit%20Tests%20100%25-green?style=flat&logo=vitest)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E%20Smoke%20Passed-orange?style=flat&logo=playwright)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 1. Design System: "Ink and Acid"

This site rejects the generic dark-purple-gradient template look in favor of an **editorial, technical, high-contrast aesthetic**:

- **Palette**: Dark default (`#0B0B0C`, `#131315`), hairline borders (`rgba(255,255,255,0.08)`), and high-contrast warm text (`#ECE9E2`).
- **Accent**: Acid-Lime (`#C8FF3D`) reserved strictly for interactive focus, primary CTA buttons, live availability indicators, and orbital nodes.
- **Light "Paper" Theme**: Warm paper background (`#F3F0E8`), clean surfaces (`#FFFFFF`), with native circular reveal View Transitions.
- **Typography**: Editorial display serif ([`Instrument Serif`](https://fonts.google.com/specimen/Instrument+Serif)) paired with precision sans ([`Inter`](https://fonts.google.com/specimen/Inter)) and technical metadata mono ([`JetBrains Mono`](https://fonts.google.com/specimen/JetBrains+Mono)).
- **Accessibility & Motion**: WCAG AA contrast throughout, keyboard navigation with skip-links, 2px focus rings, and dedicated `prefers-reduced-motion` fallbacks across all canvas and scroll choreographies.

---

## 2. Signature Features

### 🌌 Orbital Project Constellation
A Canvas 2D interactive system in the hero section linking Vraj to his 6 real GitHub repositories with dynamic harmonic orbits, cursor magnetic attraction, high-DPI scaling, and an accessible non-animated fallback for reduced motion.

### 💼 Dual-Mode Work Showcase & SSG Case Studies
- **Desktop (`>= 1024px`)**: Pinned horizontal scroll section orchestrated with GSAP ScrollTrigger and interactive 3D perspective tilt cards.
- **Mobile (`< 1024px`)**: Seamless vertical card stack preserving touch ergonomics.
- **Prerendered Case Studies (`/work/[slug]`)**: Deep dives with verified problem statements, measurable outcomes, stack chips, and custom inline SVG system architecture diagrams for each project:
  1. [`Knowledge-AI-Voice-Agent`](/work/knowledge-ai-voice-agent) (Sub-750ms WebSocket Voice Pipeline)
  2. [`AI-powered-intern-management-system`](/work/ai-powered-intern-management-system) (Automated PR Review & Rubrics)
  3. [`Smart_Doc_Expiry_App`](/work/smart-doc-expiry-app) (OCR Compliance Tracking)
  4. [`AI-Learning-RoadMap`](/work/ai-learning-roadmap) (150+ Milestone Visual Curriculum)
  5. [`Smart-TimeTable-Generation`](/work/smart-timetable-generation) (Evolutionary Genetic Scheduling)

### 🤖 Grounded AI Assistant ("Ask Vraj")
- **Universal Provider Adapter**: Switch between **Google Gemini 2.0 / 1.5** or **Anthropic Claude 3.5 Sonnet** via environment variables, or run with zero API keys using the built-in deterministic offline grounding engine.
- **Strict Grounding**: Bound exclusively to [`content/knowledge.md`](content/knowledge.md); refuses off-topic queries and hallucinations.
- **Security & Guardrails**: Sliding-window IP rate limiter (10 queries / 10 minutes) and prompt-injection firewall blocking adversarial overrides.
- **12-Case Automated Eval Suite**: Passing with 100% score via `npm run eval:ask`.

### ⚡ Command Palette (`Cmd + K` / `Ctrl + K`)
Instant global search and navigation built with `cmdk` allowing recruiters to jump to projects, trigger actions, copy contact info, or switch themes via keyboard.

### 📊 Live GitHub Activity Pulse & Validated Contact Form
- Server-revalidated GitHub activity feed with cached offline fallbacks.
- Accessible contact form with Zod schema validation, bot honeypot protection, and click-to-copy email interactions.

---

## 3. Tech Stack

| Domain | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 15 (App Router) + React 19 | Server Components, SSG prerendering, streaming API routes |
| **Language** | TypeScript (Strict mode) | Compile-time type safety across all schemas and content |
| **Styling** | Tailwind CSS + CSS Variables | "Ink & Acid" design tokens, fluid `clamp()` type scale |
| **Animation** | Motion + GSAP ScrollTrigger + Lenis | Smooth scrolling, horizontal pinning, micro-interactions |
| **Canvas** | HTML5 Canvas 2D | 60fps orbital constellation with magnetic cursor physics |
| **AI / LLMs** | Gemini 2.0 / Claude 3.5 / Fallback | Universal streaming adapter with strict grounding |
| **Validation** | Zod | Runtime schema validation for forms, APIs, and project models |
| **Testing** | Vitest + Playwright | Unit testing, eval suites, and E2E browser smoke tests |
| **Deployment** | Vercel | Global CDN edge caching and serverless execution |

---

## 4. Getting Started

### Prerequisites
- Node.js `18.18.0` or higher (Node `20.x` or `22.x` recommended)
- `npm` (or `pnpm` / `yarn`)

### Quick Start
```bash
# 1. Clone repository
git clone https://github.com/vrajgoti07/vraj-portfolio.git
cd vraj-portfolio

# 2. Install dependencies
npm install

# 3. Create environment configuration
cp .env.example .env.local

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 5. Configuration & Environment Variables

Copy `.env.example` to `.env.local` to configure your AI provider and security secrets:

```env
# AI Provider Selection: "gemini" | "anthropic" | "fallback"
AI_PROVIDER="gemini"

# Google Gemini API Key (Get at https://aistudio.google.com/)
GEMINI_API_KEY=""

# Anthropic Claude API Key (Optional)
ANTHROPIC_API_KEY=""

# Public Site URL
NEXT_PUBLIC_SITE_URL="https://vrajgoti.com"
```

> **Note**: If no API key is provided, the application automatically engages the deterministic offline fallback engine with full functionality.

---

## 6. How to Edit Portfolio Content

All copy and project data are structured as typed, clean TypeScript and Markdown files:

1. **Site Metadata & Socials**: Edit [`content/site.ts`](content/site.ts) to update your public email, availability status, resume path, and social handles.
2. **Projects & Case Studies**: Edit [`content/projects.ts`](content/projects.ts) to update project details, stack tags, metrics, and architecture diagrams.
3. **AI Grounding Knowledge Base**: Edit [`content/knowledge.md`](content/knowledge.md) to add new verified achievements, experience, and background details that the "Ask Vraj" assistant should know.

---

## 7. Quality Gates & Testing

Run the full automated test battery before deploying:

```bash
# 1. Typecheck & Lint
npm run lint

# 2. Run Vitest Unit Tests (projects, security, utils)
npm run test

# 3. Run Grounded AI Assistant Evals (12 test cases)
npm run eval:ask

# 4. Run Playwright E2E Smoke Tests
npm run test:e2e

# 5. Build for Production
npm run build
```

---

## 8. Deployment on Vercel

The application is pre-configured for seamless zero-config deployment on [Vercel](https://vercel.com):

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete production portfolio"
   git push origin main
   ```
2. Import the project into your Vercel Dashboard.
3. In **Project Settings → Environment Variables**, add:
   - `AI_PROVIDER`: `gemini`
   - `GEMINI_API_KEY`: `<your-gemini-api-key>`
4. Deploy! All 13 routes and SSG case studies prerender automatically.

---

## 9. Personalization & `TODO(vraj)` Audit

To finalize your personal assets, update the following marked placeholders:

| File Path | Line | Placeholder Description |
|---|---|---|
| [`content/site.ts`](content/site.ts) | L7 | Public contact email |
| [`content/site.ts`](content/site.ts) | L8 | Current availability status wording |
| [`content/site.ts`](content/site.ts) | L9 | Public resume file (`/public/resume.pdf`) |
| [`content/site.ts`](content/site.ts) | L12 | LinkedIn profile link |
| [`content/site.ts`](content/site.ts) | L13 | Twitter/X profile link |
| [`content/projects.ts`](content/projects.ts) | L36 | Knowledge-AI-Voice-Agent live demo link |
| [`content/projects.ts`](content/projects.ts) | L66 | AI-Powered Intern Management live demo link |
| [`content/projects.ts`](content/projects.ts) | L96 | Smart_Doc_Expiry_App live store/demo link |
| [`content/projects.ts`](content/projects.ts) | L126 | AI-Learning-RoadMap live deployment link |
| [`content/projects.ts`](content/projects.ts) | L154 | Smart-TimeTable-Generation live demo link |
| [`components/about/duotone-portrait.tsx`](components/about/duotone-portrait.tsx) | L27 | Personal portrait photo |
| [`components/about/about-section.tsx`](components/about/about-section.tsx) | L42 | Personalized bio paragraph |
| [`components/hero/hero.tsx`](components/hero/hero.tsx) | L65 | Hero subline positioning statement |
| [`components/journey/timeline.tsx`](components/journey/timeline.tsx) | L99 | Career/academic milestone details |
| [`components/skills/skills-bento.tsx`](components/skills/skills-bento.tsx) | L82 | Specific tools and certifications |

---

## 10. License

Released under the [MIT License](LICENSE). Built with craft by Vraj Goti.

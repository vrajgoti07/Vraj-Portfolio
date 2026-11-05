import { Marquee } from "./marquee";

interface SkillCategory {
  title: string;
  index: string;
  summary: string;
  tools: { name: string; note: string }[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "AI & Autonomous Agents",
    index: "01",
    summary: "Architecting low-latency voice assistants, multi-agent workflows, and grounded RAG pipelines.",
    tools: [
      { name: "Gemini / OpenAI APIs", note: "Streaming inference & structured output generation" },
      { name: "Whisper STT & Edge TTS", note: "Sub-second speech-to-text and audio synthesis" },
      { name: "RAG & Vector DBs", note: "Document chunking, hybrid search, and semantic grounding" },
      { name: "LangGraph & Tool Calling", note: "Deterministic multi-step agent orchestration" },
    ],
  },
  {
    title: "Frontend & Web Architecture",
    index: "02",
    summary: "Crafting editorial, award-worthy web applications with strict type safety and 60fps animations.",
    tools: [
      { name: "Next.js (App Router)", note: "Server Components, streaming, dynamic OG generation, and SSG" },
      { name: "TypeScript", note: "Strict compile-time guarantees, zero 'any', and runtime Zod validation" },
      { name: "Tailwind CSS", note: "Design token architecture, responsive clamp() scales, and dark theme" },
      { name: "GSAP & Motion", note: "ScrollTrigger pinning, view transitions, and magnetic interactions" },
    ],
  },
  {
    title: "Backend & Systems",
    index: "03",
    summary: "Designing scalable RESTful and realtime APIs with robust data consistency and security.",
    tools: [
      { name: "Python (FastAPI)", note: "Asynchronous endpoints, WebSocket streaming, and Pydantic schemas" },
      { name: "Node.js & Express", note: "Layered backend architecture and background job processing" },
      { name: "PostgreSQL & Prisma", note: "Relational modeling, migration integrity, and index tuning" },
      { name: "Redis", note: "Sliding-window rate limiting, session cache, and audio chunk ring buffers" },
    ],
  },
  {
    title: "Mobile (Flutter)",
    index: "04",
    summary: "Building high-performance cross-platform mobile apps with native hardware integration.",
    tools: [
      { name: "Flutter & Dart", note: "State management, custom painters, and Material 3 design" },
      { name: "Google Cloud Vision OCR", note: "On-device camera capture and automated date extraction" },
      { name: "Firebase & Cloud Functions", note: "Realtime data sync, auth, and scheduled alert cascades" },
    ],
  },
  {
    title: "DevOps & Delivery",
    index: "05",
    summary: "Automating quality gates, containerized environments, and seamless production deployments.",
    tools: [
      { name: "GitHub Actions", note: "CI pipelines for linting, typechecking, Vitest, and Playwright" },
      { name: "Docker", note: "Multi-stage builds, lean containers, and local dev parity" },
      { name: "Vercel & GCP", note: "Edge middleware, serverless functions, and CDN caching" },
    ],
  },
];

export function SkillsBento() {
  return (
    <section id="skills" className="w-full border-t border-border-hairline bg-bg-primary py-24">
      <div className="max-w-[1280px] mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent mb-2 block">
            // Technical Capabilities
          </span>
          <h2 className="font-display text-4xl sm:text-6xl text-text-primary tracking-tight">
            Engineered across the <em className="italic text-accent font-display">stack</em>.
          </h2>
        </div>

        <p className="font-sans text-xs sm:text-sm text-text-muted max-w-md">
          Grouped by engineering capability rather than cosmetic logos.
          <span className="block mt-1 font-mono text-[10px] text-accent/80">
            TODO(vraj): confirm specific tools and certifications
          </span>
        </p>
      </div>

      {/* Infinite Marquee Ticker */}
      <div className="mb-14">
        <Marquee />
      </div>

      {/* Bento Grid */}
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <div
            key={cat.title}
            className={`rounded-xl border border-border-hairline bg-bg-surface p-6 sm:p-8 flex flex-col justify-between hover:border-border-subtle hover:bg-bg-elevated/30 transition-all ${
              idx === 0 ? "lg:col-span-2" : ""
            }`}
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-text-muted mb-4">
                <span className="text-accent font-semibold tracking-widest">// {cat.index}</span>
                <span className="text-[10px] uppercase border border-border-hairline rounded px-2 py-0.5">
                  Capability
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl text-text-primary mb-3">
                {cat.title}
              </h3>

              <p className="font-sans text-xs sm:text-sm text-text-muted leading-relaxed mb-6">
                {cat.summary}
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-border-hairline">
              {cat.tools.map((t) => (
                <div key={t.name} className="flex flex-col gap-0.5">
                  <span className="font-mono text-xs text-text-primary font-medium">
                    {t.name}
                  </span>
                  <span className="font-sans text-[11px] text-text-muted">
                    ↳ {t.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


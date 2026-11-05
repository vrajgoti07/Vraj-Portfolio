export function Marquee() {
  const items = [
    "Next.js 15",
    "React 19",
    "TypeScript",
    "FastAPI",
    "Python",
    "WebSockets",
    "Whisper STT",
    "Gemini 2.0",
    "PostgreSQL",
    "Prisma",
    "Redis",
    "Tailwind CSS",
    "GSAP",
    "Flutter",
    "Docker",
    "GitHub Actions",
  ];

  return (
    <div className="w-full overflow-hidden border-y border-border-hairline bg-bg-surface py-3 relative group select-none">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:[animation:none]">
        {/* Double the list for infinite seamless loop */}
        {[...items, ...items].map((tech, idx) => (
          <span
            key={idx}
            className="mx-6 font-mono text-xs uppercase tracking-widest text-text-muted hover:text-accent transition-colors flex items-center gap-4 cursor-default"
          >
            <span>{tech}</span>
            <span className="text-border-subtle">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}


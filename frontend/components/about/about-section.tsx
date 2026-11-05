import { DuotonePortrait } from "./duotone-portrait";
import { MapPin, Sparkles, Compass } from "lucide-react";

export function AboutSection() {
  const interests = [
    { title: "Autonomous Agent Architectures", desc: "Multi-agent systems, tool calling, memory management, and deterministic workflows." },
    { title: "Low-Latency Audio Pipelines", desc: "Realtime WebSockets, streaming inference, chunking, and speech synthesis." },
    { title: "Developer Tooling & DX", desc: "Strict TypeScript APIs, declarative CLIs, and automated quality gates." },
  ];

  return (
    <section id="about" className="w-full border-t border-border-hairline bg-bg-surface/30 py-24 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-accent mb-2 block">
            // 03 About
          </span>
          <h2 className="font-display text-4xl sm:text-6xl text-text-primary tracking-tight">
            Background &amp; technical <em className="italic text-accent font-display">craft</em>.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Portrait */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <DuotonePortrait />
          </div>

          {/* Right Column: Bio, Location, Interests, Currently Building */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-2xl sm:text-3xl text-text-primary">
                Product engineering driven by curiosity and precision.
              </h3>
              <p className="font-sans text-sm sm:text-base text-text-muted leading-relaxed">
                I am a full-stack engineer and AI builder from Surat, Gujarat, India.
                My focus centers on taking cutting-edge AI breakthroughs—like streaming voice interfaces,
                OCR document intelligence, and multi-agent coordination—and packaging them into dependable,
                production-grade software that real people use.
              </p>
              <p className="font-sans text-xs sm:text-sm text-text-muted/80 leading-relaxed font-mono">
                TODO(vraj): provide full personalized bio paragraph
              </p>
            </div>

            {/* Coordinates & Status */}
            <div className="flex flex-wrap items-center gap-6 pt-2 font-mono text-xs text-text-muted">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span className="text-text-primary">Surat, Gujarat, India (IST)</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>Open to full-stack &amp; AI roles</span>
              </div>
            </div>

            {/* 3 Core Interests */}
            <div className="flex flex-col gap-3 pt-4 border-t border-border-hairline">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted mb-1">
                <Compass className="w-3.5 h-3.5 text-accent" />
                <span>Technical Interests</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {interests.map((int, i) => (
                  <div key={i} className="p-4 rounded-lg border border-border-hairline bg-bg-surface flex flex-col gap-1.5">
                    <span className="font-mono text-xs text-text-primary font-bold">
                      // 0{i + 1} {int.title}
                    </span>
                    <span className="font-sans text-xs text-text-muted leading-normal">
                      {int.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Currently Building / Learning quiet line */}
            <div className="p-4 rounded-lg border border-accent/20 bg-accent/5 flex items-center justify-between font-mono text-xs">
              <span className="text-text-muted">
                Currently building: <strong className="text-text-primary font-medium">Decoupled multi-agent evaluation frameworks</strong>
              </span>
              <span className="text-[10px] text-accent font-semibold uppercase tracking-wider hidden sm:inline">
                ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


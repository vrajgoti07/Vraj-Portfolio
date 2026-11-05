interface ArchitectureDiagramProps {
  type: "voice-pipeline" | "multi-agent" | "cron-expiry" | "roadmap-rag" | "genetic-timetable";
  title: string;
}

export function ArchitectureDiagram({ type, title }: ArchitectureDiagramProps) {
  return (
    <div className="w-full border border-border-hairline rounded-xl bg-bg-surface p-6 sm:p-8 flex flex-col gap-4 overflow-x-auto">
      <div className="flex items-center justify-between border-b border-border-hairline pb-4 font-mono text-xs text-text-muted">
        <span className="text-accent uppercase tracking-wider">// System Architecture Diagram</span>
        <span className="text-[10px]">[ {title} ]</span>
      </div>

      <div className="min-w-[620px] py-4 flex items-center justify-center">
        {type === "voice-pipeline" && (
          <svg viewBox="0 0 760 140" className="w-full max-w-[760px] h-auto text-text-primary" fill="none">
            {/* Connection Lines */}
            <line x1="100" y1="70" x2="160" y2="70" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="260" y1="70" x2="310" y2="70" stroke="var(--border-subtle)" strokeWidth="2" />
            <line x1="410" y1="70" x2="460" y2="70" stroke="var(--border-subtle)" strokeWidth="2" />
            <line x1="560" y1="70" x2="610" y2="70" stroke="var(--accent)" strokeWidth="2" />

            {/* Node 1: Audio Input */}
            <rect x="10" y="40" width="90" height="60" rx="8" fill="var(--bg-elevated)" stroke="var(--border-subtle)" />
            <text x="55" y="68" fill="var(--text-primary)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">Microphone</text>
            <text x="55" y="84" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Audio Stream</text>

            {/* Node 2: WebSocket Server */}
            <rect x="160" y="35" width="100" height="70" rx="8" fill="var(--bg-elevated)" stroke="var(--accent)" />
            <text x="210" y="66" fill="var(--accent)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">FastAPI</text>
            <text x="210" y="82" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">WebSockets</text>

            {/* Node 3: STT Engine */}
            <rect x="310" y="40" width="100" height="60" rx="8" fill="var(--bg-elevated)" stroke="var(--border-subtle)" />
            <text x="360" y="68" fill="var(--text-primary)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">Whisper STT</text>
            <text x="360" y="84" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Voice to Text</text>

            {/* Node 4: LLM + RAG Grounding */}
            <rect x="460" y="35" width="100" height="70" rx="8" fill="var(--bg-elevated)" stroke="var(--accent)" />
            <text x="510" y="66" fill="var(--accent)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">Gemini 2.0</text>
            <text x="510" y="82" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Streaming LLM</text>

            {/* Node 5: Audio Output */}
            <rect x="610" y="40" width="110" height="60" rx="8" fill="var(--bg-elevated)" stroke="var(--border-subtle)" />
            <text x="665" y="68" fill="var(--text-primary)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">Edge TTS</text>
            <text x="665" y="84" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">&lt;750ms Playback</text>
          </svg>
        )}

        {type === "multi-agent" && (
          <svg viewBox="0 0 760 140" className="w-full max-w-[760px] h-auto" fill="none">
            <line x1="110" y1="70" x2="170" y2="70" stroke="var(--border-subtle)" strokeWidth="2" />
            <line x1="280" y1="70" x2="330" y2="70" stroke="var(--accent)" strokeWidth="2" />
            <line x1="440" y1="70" x2="490" y2="70" stroke="var(--border-subtle)" strokeWidth="2" />
            <line x1="600" y1="70" x2="650" y2="70" stroke="var(--accent)" strokeWidth="2" />

            <rect x="10" y="40" width="100" height="60" rx="8" fill="var(--bg-elevated)" stroke="var(--border-subtle)" />
            <text x="60" y="68" fill="var(--text-primary)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">GitHub Webhook</text>
            <text x="60" y="84" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Commits &amp; PRs</text>

            <rect x="170" y="35" width="110" height="70" rx="8" fill="var(--bg-elevated)" stroke="var(--accent)" />
            <text x="225" y="66" fill="var(--accent)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">Ingestion API</text>
            <text x="225" y="82" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Next.js Server Action</text>

            <rect x="330" y="35" width="110" height="70" rx="8" fill="var(--bg-elevated)" stroke="var(--accent)" />
            <text x="385" y="66" fill="var(--accent)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">Evaluator Agent</text>
            <text x="385" y="82" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Rubric Scoring</text>

            <rect x="490" y="40" width="110" height="60" rx="8" fill="var(--bg-elevated)" stroke="var(--border-subtle)" />
            <text x="545" y="68" fill="var(--text-primary)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">PostgreSQL</text>
            <text x="545" y="84" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Prisma Multi-Tenant</text>

            <rect x="650" y="40" width="100" height="60" rx="8" fill="var(--bg-elevated)" stroke="var(--accent)" />
            <text x="700" y="68" fill="var(--accent)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">Mentor UI</text>
            <text x="700" y="84" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">65% Time Saved</text>
          </svg>
        )}

        {type === "cron-expiry" && (
          <svg viewBox="0 0 760 140" className="w-full max-w-[760px] h-auto" fill="none">
            <line x1="110" y1="70" x2="170" y2="70" stroke="var(--border-subtle)" strokeWidth="2" />
            <line x1="280" y1="70" x2="330" y2="70" stroke="var(--border-subtle)" strokeWidth="2" />
            <line x1="440" y1="70" x2="490" y2="70" stroke="var(--accent)" strokeWidth="2" />
            <line x1="600" y1="70" x2="650" y2="70" stroke="var(--accent)" strokeWidth="2" />

            <rect x="10" y="40" width="100" height="60" rx="8" fill="var(--bg-elevated)" stroke="var(--border-subtle)" />
            <text x="60" y="68" fill="var(--text-primary)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">Camera Scan</text>
            <text x="60" y="84" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Flutter App</text>

            <rect x="170" y="40" width="110" height="60" rx="8" fill="var(--bg-elevated)" stroke="var(--border-subtle)" />
            <text x="225" y="68" fill="var(--text-primary)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">Cloud Vision</text>
            <text x="225" y="84" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">OCR Extraction</text>

            <rect x="330" y="40" width="110" height="60" rx="8" fill="var(--bg-elevated)" stroke="var(--border-subtle)" />
            <text x="385" y="68" fill="var(--text-primary)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">Firestore DB</text>
            <text x="385" y="84" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">AES Encrypted</text>

            <rect x="490" y="35" width="110" height="70" rx="8" fill="var(--bg-elevated)" stroke="var(--accent)" />
            <text x="545" y="66" fill="var(--accent)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">Scheduled Cron</text>
            <text x="545" y="82" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Cloud Functions</text>

            <rect x="650" y="40" width="100" height="60" rx="8" fill="var(--bg-elevated)" stroke="var(--accent)" />
            <text x="700" y="68" fill="var(--accent)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">Alert Cascade</text>
            <text x="700" y="84" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">30 / 15 / 7 Days</text>
          </svg>
        )}

        {type === "roadmap-rag" && (
          <svg viewBox="0 0 760 140" className="w-full max-w-[760px] h-auto" fill="none">
            <line x1="120" y1="70" x2="180" y2="70" stroke="var(--accent)" strokeWidth="2" />
            <line x1="290" y1="70" x2="340" y2="70" stroke="var(--border-subtle)" strokeWidth="2" />
            <line x1="450" y1="70" x2="500" y2="70" stroke="var(--accent)" strokeWidth="2" />
            <line x1="610" y1="70" x2="660" y2="70" stroke="var(--accent)" strokeWidth="2" />

            <rect x="10" y="40" width="110" height="60" rx="8" fill="var(--bg-elevated)" stroke="var(--border-subtle)" />
            <text x="65" y="68" fill="var(--text-primary)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">Curriculum Tree</text>
            <text x="65" y="84" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">5 AI Tracks</text>

            <rect x="180" y="35" width="110" height="70" rx="8" fill="var(--bg-elevated)" stroke="var(--accent)" />
            <text x="235" y="66" fill="var(--accent)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">DAG Resolver</text>
            <text x="235" y="82" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Prerequisites</text>

            <rect x="340" y="40" width="110" height="60" rx="8" fill="var(--bg-elevated)" stroke="var(--border-subtle)" />
            <text x="395" y="68" fill="var(--text-primary)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">Benchmark Repo</text>
            <text x="395" y="84" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Papers &amp; Code</text>

            <rect x="500" y="35" width="110" height="70" rx="8" fill="var(--bg-elevated)" stroke="var(--accent)" />
            <text x="555" y="66" fill="var(--accent)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">Interactive UI</text>
            <text x="555" y="82" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Next.js + SVG</text>

            <rect x="660" y="40" width="90" height="60" rx="8" fill="var(--bg-elevated)" stroke="var(--border-subtle)" />
            <text x="705" y="68" fill="var(--text-primary)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">150+ Goals</text>
            <text x="705" y="84" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Mastery Path</text>
          </svg>
        )}

        {type === "genetic-timetable" && (
          <svg viewBox="0 0 760 140" className="w-full max-w-[760px] h-auto" fill="none">
            <line x1="110" y1="70" x2="160" y2="70" stroke="var(--border-subtle)" strokeWidth="2" />
            <line x1="270" y1="70" x2="320" y2="70" stroke="var(--accent)" strokeWidth="2" />
            <line x1="430" y1="70" x2="480" y2="70" stroke="var(--accent)" strokeWidth="2" />
            <line x1="590" y1="70" x2="640" y2="70" stroke="var(--accent)" strokeWidth="2" />

            <rect x="10" y="40" width="100" height="60" rx="8" fill="var(--bg-elevated)" stroke="var(--border-subtle)" />
            <text x="60" y="68" fill="var(--text-primary)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">Constraints</text>
            <text x="60" y="84" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Rooms &amp; Faculty</text>

            <rect x="160" y="40" width="110" height="60" rx="8" fill="var(--bg-elevated)" stroke="var(--border-subtle)" />
            <text x="215" y="68" fill="var(--text-primary)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">Chromosomes</text>
            <text x="215" y="84" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Initial Population</text>

            <rect x="320" y="35" width="110" height="70" rx="8" fill="var(--bg-elevated)" stroke="var(--accent)" />
            <text x="375" y="66" fill="var(--accent)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">Genetic Loop</text>
            <text x="375" y="82" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Crossover + Mutate</text>

            <rect x="480" y="35" width="110" height="70" rx="8" fill="var(--bg-elevated)" stroke="var(--accent)" />
            <text x="535" y="66" fill="var(--accent)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">Fitness Gate</text>
            <text x="535" y="82" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Zero Collisions</text>

            <rect x="640" y="40" width="110" height="60" rx="8" fill="var(--bg-elevated)" stroke="var(--border-subtle)" />
            <text x="695" y="68" fill="var(--text-primary)" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">Optimized Matrix</text>
            <text x="695" y="84" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">&lt;45s Generation</text>
          </svg>
        )}
      </div>
    </div>
  );
}


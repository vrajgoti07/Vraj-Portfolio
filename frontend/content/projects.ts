export interface Project {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  problem: string;
  role: string;
  outcome: string;
  stack: string[];
  links: {
    live?: string;
    repo: string;
  };
  metrics?: string;
  caseStudy: {
    overview: string;
    approach: string;
    architectureType: "voice-pipeline" | "multi-agent" | "cron-expiry" | "roadmap-rag" | "genetic-timetable";
    challenges: string[];
    learnings: string[];
  };
}

export const PROJECTS: Project[] = [
  {
    slug: "knowledge-ai-voice-agent",
    index: "01",
    title: "Knowledge-AI-Voice-Agent",
    tagline: "Ultra-low-latency conversational AI voice assistant with dynamic grounding",
    problem: "Traditional voice bots suffer from high latency (2-3s) and lack domain grounding, leading to unnatural conversational interruptions.",
    role: "Full-Stack AI Engineer & System Architect",
    outcome: "Reduced voice pipeline response latency to under 750ms with custom audio streaming buffer and semantic knowledge retrieval.",
    stack: ["Python", "FastAPI", "WebSockets", "Whisper STT", "Gemini API", "Edge TTS", "Redis"],
    links: {
      repo: "https://github.com/vrajgoti07/Knowledge-AI-Voice-Agent",
      live: "https://github.com/vrajgoti07/Knowledge-AI-Voice-Agent", // TODO(vraj): replace with live demo URL
    },
    metrics: "<750ms roundtrip latency · Zero hallucination on domain queries",
    caseStudy: {
      overview: "Knowledge-AI-Voice-Agent is an end-to-end voice AI engine designed to hold fluid, bi-directional telephone and web conversations while grounded on custom document corpora.",
      approach: "Engineered a concurrent WebSocket pipeline decoupling Speech-To-Text (STT), LLM inference streaming, and Text-To-Speech (TTS) chunking. Implemented an interruption-detection audio ring buffer.",
      architectureType: "voice-pipeline",
      challenges: [
        "Handling network jitter during concurrent bidirectional binary audio streaming over WebSockets.",
        "Neutralizing LLM latency by streaming token chunks into TTS synthesis as early as the first sentence boundary.",
        "Preventing conversational overlap when the user interrupts mid-sentence.",
      ],
      learnings: [
        "Chunking text at punctuation marks delivers natural prosody without waiting for full LLM completion.",
        "In-memory Redis audio caching drastically reduces repeat speech synthesis costs.",
        "Voice UX requires tight synchronization between audio playback state and client visualizer feedback.",
      ],
    },
  },
  {
    slug: "ai-powered-intern-management-system",
    index: "02",
    title: "AI-Powered Intern Management System",
    tagline: "Automated intern task tracking, performance evaluation, and skill progression engine",
    problem: "Engineering mentors spend 8+ hours weekly reviewing student progress, writing feedback, and assigning matched learning tasks manually.",
    role: "Lead Full-Stack Developer",
    outcome: "Streamlined evaluation workflows by 65% with automated pull request analysis, weekly summary generation, and task recommendation.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS", "OpenAI API"],
    links: {
      repo: "https://github.com/vrajgoti07/AI-powered-intern-management-system",
      live: "https://github.com/vrajgoti07/AI-powered-intern-management-system", // TODO(vraj): replace with live deployment
    },
    metrics: "65% mentor review time saved · Multi-tenant cohort support",
    caseStudy: {
      overview: "A comprehensive SaaS platform built to oversee internship batches, track sprint deliverables, and generate evidence-backed evaluation reports.",
      approach: "Built a role-based access control (RBAC) portal with automated GitHub webhook integration that analyzes commit velocity, code review quality, and self-reported blockers.",
      architectureType: "multi-agent",
      challenges: [
        "Designing fair, transparent algorithmic rubric scores without hallucinating intern performance.",
        "Enforcing strict multi-tenant database partitioning between universities and mentor cohorts.",
        "Handling asynchronous report generation jobs during deadline spikes.",
      ],
      learnings: [
        "Structured output JSON schemas are mandatory when feeding code metrics into automated performance summaries.",
        "Database transactions with Prisma prevent race conditions during bulk task assignments.",
        "Clear rubric breakdown UI builds trust between interns and automated evaluations.",
      ],
    },
  },
  {
    slug: "smart-doc-expiry-app",
    index: "03",
    title: "Smart_Doc_Expiry_App",
    tagline: "OCR-assisted document expiration tracking with proactive notification cascades",
    problem: "Enterprises and individuals frequently incur penalties and legal friction due to missed passport, visa, compliance, and license expirations.",
    role: "Full-Stack Developer",
    outcome: "Automated expiry extraction from document uploads with 94% accuracy and reliable multi-channel alerts (Email & SMS).",
    stack: ["Flutter", "Dart", "Firebase", "Google Cloud Vision OCR", "Cloud Functions"],
    links: {
      repo: "https://github.com/vrajgoti07/Smart_Doc_Expiry_App",
      live: "https://github.com/vrajgoti07/Smart_Doc_Expiry_App", // TODO(vraj): replace with live store/web URL
    },
    metrics: "94% OCR expiry extraction rate · Proactive 30/15/7-day alert cascades",
    caseStudy: {
      overview: "A mobile and cloud solution that scans identity and compliance documents, extracts expiration dates using OCR, and schedules persistent multi-tiered reminders.",
      approach: "Integrated on-device camera scanning with Cloud Vision API date entity parsing, backed by serverless scheduled cron triggers for notification escalation.",
      architectureType: "cron-expiry",
      challenges: [
        "Extracting ambiguous date formats across diverse international documents (DD/MM/YYYY vs MM/DD/YYYY).",
        "Handling offline document capture on mobile devices with local SQLite caching.",
        "Securely encrypting uploaded identity documents at rest using AES-256.",
      ],
      learnings: [
        "Heuristic date parsing combined with regex validation beats raw LLM parsing for structured date extraction.",
        "Local notification rescheduling is required for reliable offline user alerts on Android/iOS.",
        "Document redaction of sensitive numbers (Aadhaar/SSN) before cloud processing safeguards user privacy.",
      ],
    },
  },
  {
    slug: "ai-learning-roadmap",
    index: "04",
    title: "AI-Learning-RoadMap",
    tagline: "Personalized syllabus generation and skill-gap assessment for AI/ML engineering",
    problem: "The rapid pace of AI breakthroughs overwhelms learners, who struggle with disorganized tutorials and outdated learning paths.",
    role: "Sole Creator & Maintainer",
    outcome: "Curated 150+ structured learning milestones covering Classical ML, Deep Learning, LLMs, Agents, and Production MLOps.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Markdown", "Mermaid.js"],
    links: {
      repo: "https://github.com/vrajgoti07/AI-Learning-RoadMap",
      live: "https://github.com/vrajgoti07/AI-Learning-RoadMap", // TODO(vraj): replace with live site
    },
    metrics: "150+ curated milestones · 5 learning tracks (ML to Autonomous Agents)",
    caseStudy: {
      overview: "An interactive, visual open-source curriculum mapping the journey from Python foundations to building production autonomous multi-agent systems.",
      approach: "Structured knowledge into progressive nodes with prerequisites, verified code repositories, benchmark papers, and real-world project assignments.",
      architectureType: "roadmap-rag",
      challenges: [
        "Balancing mathematical rigor (linear algebra, backprop) with pragmatic software engineering practices.",
        "Keeping links, packages, and model APIs fresh in a fast-moving AI ecosystem.",
      ],
      learnings: [
        "Visual DAG (directed acyclic graph) diagrams help engineers identify missing prerequisites instantly.",
        "Project-based milestones lead to significantly higher retention than passive reading lists.",
      ],
    },
  },
  {
    slug: "smart-timetable-generation",
    index: "05",
    title: "Smart-TimeTable-Generation",
    tagline: "Constraint-satisfaction genetic algorithm engine for university schedule optimization",
    problem: "University scheduling departments spend weeks resolving classroom collisions, professor availability clashes, and student elective conflicts.",
    role: "Algorithm & Backend Engineer",
    outcome: "Reduced timetable generation time from 2 weeks to under 45 seconds while guaranteeing zero room and faculty collision.",
    stack: ["Python", "Flask", "Genetic Algorithms", "NumPy", "SQLite"],
    links: {
      repo: "https://github.com/vrajgoti07/Smart-TimeTable-Generation",
      live: "https://github.com/vrajgoti07/Smart-TimeTable-Generation", // TODO(vraj): replace with live demo
    },
    metrics: "Zero hard-constraint violations · <45s generation for 1200+ students",
    caseStudy: {
      overview: "An algorithmic optimization system that solves multi-variable NP-hard academic timetable problems using evolutionary genetic algorithms.",
      approach: "Formulated the scheduling matrix as chromosomes with fitness functions penalizing room overlap, faculty double-booking, and uneven student workload distributions.",
      architectureType: "genetic-timetable",
      challenges: [
        "Preventing the genetic algorithm from getting trapped in local optima during dense scheduling constraints.",
        "Balancing soft constraints (faculty preferred time slots) against strict hard constraints (classroom capacity).",
      ],
      learnings: [
        "Tournament selection with adaptive mutation rates prevents premature population convergence.",
        "Separating hard constraints from soft constraints in the fitness calculation ensures 100% legal schedules.",
      ],
    },
  },
];


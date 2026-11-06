import { SITE_CONFIG } from "@/content/site";

export interface FallbackFAQ {
  keywords: string[];
  response: string;
  sources: string[];
}

export interface FallbackResult {
  answer: string;
  sources: string[];
}

export const FALLBACK_FAQS: FallbackFAQ[] = [
  {
    keywords: ["voice", "voice-agent", "knowledge-ai-voice-agent", "whisper", "tts", "latency"],
    response:
      "The **Knowledge-AI-Voice-Agent** is an ultra-low-latency voice assistant that uses a decoupled WebSocket pipeline with Whisper Speech-to-Text, FastAPI, Gemini 2.0 streaming, and Edge TTS. It features dynamic document grounding and delivers complete roundtrip voice responses in under 750ms with zero hallucination on domain queries.",
    sources: ["knowledge-ai-voice-agent"],
  },
  {
    keywords: ["intern", "management", "internship-management", "mentor"],
    response:
      "The **AI-Powered Intern Management System** is a full-stack platform built with Next.js, TypeScript, PostgreSQL, and Prisma that automates pull request reviews, sprint velocity tracking, and generates evidence-backed rubric reports, reducing mentor evaluation time by 65%.",
    sources: ["ai-powered-intern-management-system"],
  },
  {
    keywords: ["doc", "expiry", "smart_doc_expiry_app", "ocr", "documents"],
    response:
      "The **Smart_Doc_Expiry_App** is a mobile and cloud OCR solution built with Flutter, Firebase, and Google Cloud Vision that automatically extracts expiration dates from compliance documents with 94% accuracy and triggers automated 30/15/7-day reminder cascades.",
    sources: ["smart-doc-expiry-app"],
  },
  {
    keywords: ["roadmap", "learning", "curriculum", "syllabus"],
    response:
      "The **AI-Learning-RoadMap** is a visual open-source curriculum mapping 150+ milestones across 5 AI tracks (from linear algebra to autonomous multi-agent systems) with verified research papers and production project code.",
    sources: ["ai-learning-roadmap"],
  },
  {
    keywords: ["timetable", "schedule", "genetic", "algorithm"],
    response:
      "The **Smart-TimeTable-Generation** project is an evolutionary genetic algorithm engine in Python that generates conflict-free university timetables for 1200+ students across multiple departments in under 45 seconds.",
    sources: ["smart-timetable-generation"],
  },
  {
    keywords: ["stack", "tech", "technologies", "tools", "skills", "language"],
    response:
      "Vraj specializes in:\n- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, GSAP, Framer Motion\n- **Backend**: Python (FastAPI, Flask), Node.js, REST APIs, WebSockets, PostgreSQL, Prisma, Redis\n- **AI / LLMs**: Gemini API, OpenAI API, LangGraph, RAG architectures, Whisper STT, Edge TTS\n- **Mobile**: Flutter, Dart, Firebase\n- **DevOps**: Docker, GitHub Actions CI/CD, Vercel",
    sources: [
      "knowledge-ai-voice-agent",
      "ai-powered-intern-management-system",
      "smart-doc-expiry-app",
    ],
  },
  {
    keywords: ["available", "availability", "hire", "work", "job", "internship", "role"],
    response:
      `Vraj is currently based in Surat, Gujarat, India, and is **${SITE_CONFIG.availability}**. You can connect with him directly via email at ${SITE_CONFIG.email} or on LinkedIn at ${SITE_CONFIG.socials.linkedin}.`,
    sources: [],
  },
  {
    keywords: ["contact", "email", "reach", "message", "linkedin", "github"],
    response:
      `You can reach Vraj via email at ${SITE_CONFIG.email}, view his code on GitHub (${SITE_CONFIG.socials.github}), or message him on LinkedIn (${SITE_CONFIG.socials.linkedin}).`,
    sources: [],
  },
  {
    keywords: ["built", "build", "project", "projects", "portfolio", "systems", "what has vraj built", "what has he built"],
    response:
      "Vraj has built several notable AI and full-stack systems, including:\n\n1. **Knowledge-AI-Voice-Agent**: Low-latency conversational voice AI (<750ms roundtrip) with document grounding.\n2. **AI-Powered Intern Management System**: Automated PR analysis and mentor review platform saving 65% of review time.\n3. **Smart_Doc_Expiry_App**: OCR-based document expiration tracking built with Flutter and Cloud Vision.\n4. **AI-Learning-RoadMap**: Open-source visual curriculum with 150+ milestones across 5 AI tracks.\n5. **Smart-TimeTable-Generation**: Genetic algorithm generating conflict-free schedules in under 45s.",
    sources: [
      "knowledge-ai-voice-agent",
      "ai-powered-intern-management-system",
      "smart-doc-expiry-app",
      "ai-learning-roadmap",
      "smart-timetable-generation",
    ],
  },
];

export function detectSources(text: string): string[] {
  const lower = text.toLowerCase();
  if (lower.includes("don't have that information") || lower.includes("strictly about vraj goti's software")) {
    return [];
  }
  const sources: string[] = [];
  if (lower.includes("voice") || lower.includes("whisper") || lower.includes("knowledge-ai-voice-agent")) {
    sources.push("knowledge-ai-voice-agent");
  }
  if (lower.includes("intern") || lower.includes("rubric") || lower.includes("intern-management")) {
    sources.push("ai-powered-intern-management-system");
  }
  if (lower.includes("expiry") || lower.includes("doc_expiry") || lower.includes("smart_doc_expiry")) {
    sources.push("smart-doc-expiry-app");
  }
  if (lower.includes("roadmap") || lower.includes("learning-roadmap") || lower.includes("curriculum")) {
    sources.push("ai-learning-roadmap");
  }
  if (lower.includes("timetable") || lower.includes("genetic") || lower.includes("schedule")) {
    sources.push("smart-timetable-generation");
  }
  return Array.from(new Set(sources));
}

export function resolveFallbackResult(query: string): FallbackResult {
  const normalized = query.toLowerCase();

  let bestMatch: FallbackFAQ | null = null;
  let highestScore = 0;

  for (const faq of FALLBACK_FAQS) {
    let score = 0;
    for (const kw of faq.keywords) {
      if (kw.includes(" ") && normalized.includes(kw)) {
        score += 5;
      } else {
        const regex = new RegExp(`\\b${kw}\\b`, "i");
        if (regex.test(normalized)) {
          score += 3;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = faq;
    }
  }

  if (bestMatch && highestScore >= 3) {
    return {
      answer: bestMatch.response,
      sources: bestMatch.sources,
    };
  }

  return {
    answer: `I don't have that specific information in my verified knowledge base, but you can reach Vraj directly at ${SITE_CONFIG.email} or on LinkedIn at ${SITE_CONFIG.socials.linkedin}.`,
    sources: [],
  };
}

export function resolveFallbackResponse(query: string): string {
  return resolveFallbackResult(query).answer;
}

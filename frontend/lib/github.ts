export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

const STATIC_FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: "Knowledge-AI-Voice-Agent",
    description: "Ultra-low-latency conversational AI voice assistant with document grounding.",
    html_url: "https://github.com/vrajgoti07/Knowledge-AI-Voice-Agent",
    stargazers_count: 8,
    forks_count: 2,
    language: "Python",
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "AI-powered-intern-management-system",
    description: "Automated intern task tracking, performance evaluation, and skill progression engine.",
    html_url: "https://github.com/vrajgoti07/AI-powered-intern-management-system",
    stargazers_count: 5,
    forks_count: 1,
    language: "TypeScript",
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Smart_Doc_Expiry_App",
    description: "OCR-assisted document expiration tracking with proactive notification cascades.",
    html_url: "https://github.com/vrajgoti07/Smart_Doc_Expiry_App",
    stargazers_count: 4,
    forks_count: 1,
    language: "Dart",
    updated_at: new Date().toISOString(),
  },
];

export async function fetchGitHubPulse(username = "vrajgoti07"): Promise<{
  repos: GitHubRepo[];
  isFallback: boolean;
}> {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Vraj-Portfolio-App",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=3`,
      {
        headers,
        next: { revalidate: 3600 }, // Cached on the server with 1h revalidate
      }
    );

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return {
          repos: data.map((r: any) => ({
            id: r.id,
            name: r.name,
            description: r.description || "Public software repository.",
            html_url: r.html_url,
            stargazers_count: r.stargazers_count,
            forks_count: r.forks_count,
            language: r.language || "TypeScript",
            updated_at: r.updated_at,
          })),
          isFallback: false,
        };
      }
    }
  } catch (err) {
    console.warn("GitHub API fetch fallback triggered:", err);
  }

  return {
    repos: STATIC_FALLBACK_REPOS,
    isFallback: true,
  };
}


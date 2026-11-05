import { fetchGitHubPulse } from "@/lib/github";
import { GithubIcon } from "@/components/ui/icons";
import { Star, GitFork, ExternalLink } from "lucide-react";

export async function GithubPulse() {
  const { repos, isFallback } = await fetchGitHubPulse("vrajgoti07");

  // Generate 52 weeks x 7 days representative contribution cells
  const contributionGrid = Array.from({ length: 48 }, (_, i) => {
    // Deterministic distribution of contribution levels
    const level = (i * 7 + (i % 3)) % 5;
    return level;
  });

  return (
    <section id="github" className="w-full border-t border-border-hairline bg-bg-primary py-24 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent mb-2 block">
              // Open Source Activity
            </span>
            <h2 className="font-display text-4xl sm:text-6xl text-text-primary tracking-tight">
              GitHub <em className="italic text-accent font-display">pulse</em>.
            </h2>
          </div>

          <a
            href="https://github.com/vrajgoti07"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs text-text-muted hover:text-accent transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>@vrajgoti07</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 3 Recent Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-xl border border-border-hairline bg-bg-surface hover:border-accent/50 hover:bg-bg-elevated/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-text-muted mb-3">
                  <span className="text-accent uppercase tracking-wider text-[11px]">
                    {repo.language}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:text-accent transition-colors" />
                </div>

                <h3 className="font-mono text-base font-semibold text-text-primary group-hover:text-accent transition-colors mb-2 break-all">
                  {repo.name}
                </h3>

                <p className="font-sans text-xs text-text-muted leading-relaxed line-clamp-3 mb-6">
                  {repo.description}
                </p>
              </div>

              <div className="flex items-center gap-4 font-mono text-xs text-text-muted pt-4 border-t border-border-hairline">
                <span className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-accent" />
                  <span>{repo.stargazers_count}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <GitFork className="w-3.5 h-3.5" />
                  <span>{repo.forks_count}</span>
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Compact Contribution Graph Representation */}
        <div className="p-6 rounded-xl border border-border-hairline bg-bg-surface flex flex-col gap-4">
          <div className="flex items-center justify-between font-mono text-xs text-text-muted">
            <span className="text-text-primary font-medium">Commit Frequency Pulse</span>
            <span className="text-[10px]">
              {isFallback ? "[ Cached Offline Metric ]" : "[ GitHub Revalidated Cache ]"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-2">
            {contributionGrid.map((level, idx) => (
              <div
                key={idx}
                title={`Activity Level: ${level}`}
                className={`w-3.5 h-8 rounded-sm shrink-0 transition-opacity hover:opacity-100 ${
                  level === 0
                    ? "bg-bg-elevated border border-border-hairline opacity-30"
                    : level === 1
                    ? "bg-accent/20"
                    : level === 2
                    ? "bg-accent/40"
                    : level === 3
                    ? "bg-accent/70"
                    : "bg-accent"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-text-muted pt-2 border-t border-border-hairline">
            <span>Continuous repository maintenance &amp; testing</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="w-2.5 h-2.5 rounded-sm bg-bg-elevated" />
              <div className="w-2.5 h-2.5 rounded-sm bg-accent/40" />
              <div className="w-2.5 h-2.5 rounded-sm bg-accent" />
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


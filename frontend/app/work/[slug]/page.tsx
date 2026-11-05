import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { PROJECTS } from "@/content/projects";
import { ArchitectureDiagram } from "@/components/work/architecture-diagram";
import type { Metadata } from "next";

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Case Study by Vraj Goti`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.problem,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  if (projectIndex === -1) notFound();

  const project = PROJECTS[projectIndex];
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary px-6 py-12 max-w-[1080px] mx-auto">
      {/* Back Navigation */}
      <div className="mb-10">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all projects</span>
        </Link>
      </div>

      {/* Case Study Header */}
      <header className="flex flex-col gap-6 border-b border-border-hairline pb-12 mb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-text-muted">
          <span className="text-accent font-semibold tracking-widest">// Case Study {project.index}</span>
          <span className="border border-border-subtle rounded px-2.5 py-1 text-text-primary">
            Role: {project.role}
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.96] text-text-primary">
          {project.title}
        </h1>

        <p className="font-sans text-lg sm:text-xl text-text-muted max-w-2xl leading-relaxed">
          {project.tagline}
        </p>

        {/* Tech Stack Chips & Direct Links */}
        <div className="flex flex-wrap items-center justify-between gap-6 pt-4">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded font-mono text-xs tracking-wide uppercase bg-bg-surface border border-border-hairline text-text-primary"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 font-mono text-xs">
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded border border-border-subtle hover:border-accent flex items-center gap-2 text-text-primary hover:text-accent transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Repo</span>
            </a>
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded bg-accent text-accent-contrast font-semibold hover:bg-accent/90 flex items-center gap-2 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Structured Case Study Sections */}
      <div className="flex flex-col gap-16">
        {/* Section 1: The Problem & Context */}
        <section className="flex flex-col gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            // 01 The Problem
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-text-primary">
            Why this needed to be built.
          </h2>
          <p className="font-sans text-base sm:text-lg text-text-muted leading-relaxed">
            {project.problem}
          </p>
          {project.metrics && (
            <div className="p-4 rounded-lg border border-accent/30 bg-accent/5 font-mono text-xs text-accent mt-2">
              Metric Target: {project.metrics}
            </div>
          )}
        </section>

        {/* Section 2: Technical Approach */}
        <section className="flex flex-col gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            // 02 The Approach
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-text-primary">
            Engineering execution &amp; architectural decisions.
          </h2>
          <p className="font-sans text-base text-text-muted leading-relaxed mb-6">
            {project.caseStudy.approach}
          </p>

          {/* Inline SVG Architecture Diagram */}
          <ArchitectureDiagram
            type={project.caseStudy.architectureType}
            title={project.title}
          />
        </section>

        {/* Section 3: Engineering Challenges */}
        <section className="flex flex-col gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            // 03 Key Challenges
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-text-primary mb-2">
            Obstacles encountered and solved.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.caseStudy.challenges.map((challenge, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg border border-border-hairline bg-bg-surface flex items-start gap-3"
              >
                <span className="font-mono text-xs text-accent font-bold mt-0.5">
                  0{idx + 1}
                </span>
                <p className="font-sans text-xs sm:text-sm text-text-muted leading-relaxed">
                  {challenge}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: What I Learned */}
        <section className="flex flex-col gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            // 04 What I Learned
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-text-primary mb-2">
            Key takeaways for production engineering.
          </h2>
          <div className="flex flex-col gap-3">
            {project.caseStudy.learnings.map((learning, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-border-hairline bg-bg-surface flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <p className="font-sans text-xs sm:text-sm text-text-primary leading-relaxed">
                  {learning}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Next Project Footer Bar */}
      <footer className="mt-20 pt-10 border-t border-border-hairline flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link
          href="/#work"
          className="font-mono text-xs uppercase tracking-wider text-text-muted hover:text-text-primary"
        >
          ← Return to overview
        </Link>

        <Link
          href={`/work/${nextProject.slug}`}
          className="inline-flex items-center gap-3 p-4 rounded-lg border border-border-hairline bg-bg-surface hover:border-accent transition-colors group"
        >
          <div className="flex flex-col text-right">
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              Next Case Study
            </span>
            <span className="font-display text-lg text-text-primary group-hover:text-accent transition-colors">
              {nextProject.title}
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
        </Link>
      </footer>
    </div>
  );
}

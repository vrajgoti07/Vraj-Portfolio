import { IntroLoader } from "@/components/hero/intro-loader";
import { Hero } from "@/components/hero/hero";
import { WorkSection } from "@/components/work/work-section";
import { AskVraj } from "@/components/ask-vraj/ask-vraj";
import { SkillsBento } from "@/components/skills/skills-bento";
import { Timeline } from "@/components/journey/timeline";
import { AboutSection } from "@/components/about/about-section";
import { GithubPulse } from "@/components/github/github-pulse";
import { ContactSection } from "@/components/contact/contact-section";

export default function HomePage() {
  return (
    <>
      {/* Session Intro Curtain Loader */}
      <IntroLoader />

      <div className="flex flex-col w-full">
        {/* Signature Hero & Constellation */}
        <Hero />

        {/* 01. Featured Work (GSAP Horizontal Deck / Mobile Stack) */}
        <WorkSection />

        {/* 02. Ask Vraj (Grounded Streaming AI Assistant) */}
        <AskVraj />

        {/* Technical Capabilities (Bento Grid & Infinite Marquee) */}
        <SkillsBento />

        {/* Milestones & Journey (Scroll-Linked Timeline) */}
        <Timeline />

        {/* 03. About, Duotone Portrait & Coordinates */}
        <AboutSection />

        {/* GitHub Pulse & Live Activity */}
        <GithubPulse />

        {/* 04. Direct Inquiry & Contact Form */}
        <ContactSection />
      </div>
    </>
  );
}

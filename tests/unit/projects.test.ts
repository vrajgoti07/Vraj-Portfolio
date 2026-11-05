import { describe, it, expect } from "vitest";
import { PROJECTS } from "@/content/projects";

describe("Projects Data Model", () => {
  it("should contain all 5 verified projects", () => {
    expect(PROJECTS.length).toBe(5);
  });

  it("should have unique slugs and indices", () => {
    const slugs = PROJECTS.map((p) => p.slug);
    const indices = PROJECTS.map((p) => p.index);

    expect(new Set(slugs).size).toBe(PROJECTS.length);
    expect(new Set(indices).size).toBe(PROJECTS.length);
  });

  it("should contain complete case study specifications for each project", () => {
    PROJECTS.forEach((project) => {
      expect(project.title).toBeTruthy();
      expect(project.problem).toBeTruthy();
      expect(project.outcome).toBeTruthy();
      expect(project.stack.length).toBeGreaterThan(0);
      expect(project.links.repo).toMatch(/^https:\/\/github\.com\//);
      expect(project.caseStudy.approach).toBeTruthy();
      expect(project.caseStudy.challenges.length).toBeGreaterThanOrEqual(2);
      expect(project.caseStudy.learnings.length).toBeGreaterThanOrEqual(2);
    });
  });
});


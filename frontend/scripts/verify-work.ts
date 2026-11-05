import { chromium } from "@playwright/test";
import { spawn } from "child_process";
import path from "path";

async function waitForServer(url: string, maxAttempts = 30): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  return false;
}

async function main() {
  const artifactDir = "C:\\Users\\VRAJ GOTI\\.gemini\\antigravity\\brain\\d795d383-f0bc-45f8-92c2-ec2a018b9d6f";

  console.log("Starting Next.js server on 127.0.0.1:3000...");
  const server = spawn("npx.cmd", ["next", "start", "-H", "127.0.0.1", "-p", "3000"], {
    cwd: process.cwd(),
    stdio: "inherit",
    shell: true,
  });

  const isReady = await waitForServer("http://127.0.0.1:3000");
  if (!isReady) {
    console.error("Server did not boot in time.");
    server.kill();
    process.exit(1);
  }
  console.log("Server ready!");

  const browser = await chromium.launch({ headless: true });

  try {
    // 1. Featured Work section on Desktop (1280px)
    console.log("Capturing Desktop Work Section...");
    const desktopContext = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      deviceScaleFactor: 2,
    });
    const page = await desktopContext.newPage();
    await page.goto("http://127.0.0.1:3000#work", { waitUntil: "networkidle" });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(1000);

    const workSectionEl = page.locator("#work");
    const workDesktopShot = path.join(artifactDir, "work-desktop.png");
    await workSectionEl.screenshot({ path: workDesktopShot });
    console.log(`Saved: ${workDesktopShot}`);
    await desktopContext.close();

    // 2. Case Study Page (Knowledge-AI-Voice-Agent)
    console.log("Capturing Case Study Page...");
    const caseStudyContext = await browser.newContext({
      viewport: { width: 1280, height: 1100 },
      deviceScaleFactor: 2,
    });
    const casePage = await caseStudyContext.newPage();
    await casePage.goto("http://127.0.0.1:3000/work/knowledge-ai-voice-agent", { waitUntil: "networkidle" });
    await casePage.waitForTimeout(800);

    const caseStudyShot = path.join(artifactDir, "case-study-voice-agent.png");
    await casePage.screenshot({ path: caseStudyShot });
    console.log(`Saved: ${caseStudyShot}`);
    await caseStudyContext.close();

    // 3. Mobile Work Section (375px)
    console.log("Capturing Mobile Work Section...");
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 750 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto("http://127.0.0.1:3000#work", { waitUntil: "networkidle" });
    await mobilePage.keyboard.press("Escape");
    await mobilePage.waitForTimeout(1000);

    const mobileWorkShot = path.join(artifactDir, "work-mobile.png");
    await mobilePage.locator("#work").screenshot({ path: mobileWorkShot });
    console.log(`Saved: ${mobileWorkShot}`);
    await mobileContext.close();

    console.log("Phase 3 screenshots successfully captured!");
  } catch (err) {
    console.error("Capture error:", err);
  } finally {
    await browser.close();
    server.kill();
  }
}

main();


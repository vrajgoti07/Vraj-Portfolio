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
    const context = await browser.newContext({
      viewport: { width: 1280, height: 950 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(1000);

    // 1. Skills Bento & Marquee
    console.log("Capturing Skills Bento...");
    const skillsEl = page.locator("#skills");
    await skillsEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    const skillsShot = path.join(artifactDir, "skills-bento.png");
    await skillsEl.screenshot({ path: skillsShot });
    console.log(`Saved: ${skillsShot}`);

    // 2. About & Duotone Portrait
    console.log("Capturing About Section...");
    const aboutEl = page.locator("#about");
    await aboutEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    const aboutShot = path.join(artifactDir, "about-section.png");
    await aboutEl.screenshot({ path: aboutShot });
    console.log(`Saved: ${aboutShot}`);

    // 3. GitHub Pulse
    console.log("Capturing GitHub Pulse...");
    const githubEl = page.locator("#github");
    await githubEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    const githubShot = path.join(artifactDir, "github-pulse.png");
    await githubEl.screenshot({ path: githubShot });
    console.log(`Saved: ${githubShot}`);

    // 4. Contact Section with Form
    console.log("Capturing Contact Section...");
    const contactEl = page.locator("#contact");
    await contactEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    const contactShot = path.join(artifactDir, "contact-section.png");
    await contactEl.screenshot({ path: contactShot });
    console.log(`Saved: ${contactShot}`);

    await context.close();
    console.log("All Phase 5 screenshots captured successfully!");
  } catch (err) {
    console.error("Capture error:", err);
  } finally {
    await browser.close();
    server.kill();
  }
}

main();


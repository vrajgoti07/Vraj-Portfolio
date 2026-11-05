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
    console.error("Server did not become ready in time.");
    server.kill();
    process.exit(1);
  }
  console.log("Next.js server is confirmed READY!");

  console.log("Launching browser...");
  const browser = await chromium.launch({ headless: true });

  try {
    // 1. Desktop Dark (1280px)
    console.log("Capturing Desktop 1280px...");
    const contextDesktop = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 2,
    });
    const page = await contextDesktop.newPage();
    await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
    // Dismiss intro loader
    await page.keyboard.press("Escape");
    await page.waitForTimeout(1000);

    const desktopDarkShot = path.join(artifactDir, "hero-desktop-dark.png");
    await page.screenshot({ path: desktopDarkShot });
    console.log(`Saved: ${desktopDarkShot}`);

    // Toggle theme to Light
    const toggleBtn = page.locator('button[aria-label*="theme" i]').first();
    await toggleBtn.click();
    await page.waitForTimeout(800);
    const desktopLightShot = path.join(artifactDir, "hero-desktop-light.png");
    await page.screenshot({ path: desktopLightShot });
    console.log(`Saved: ${desktopLightShot}`);

    await contextDesktop.close();

    // 2. Mobile Dark (375px)
    console.log("Capturing Mobile 375px...");
    const contextMobile = await browser.newContext({
      viewport: { width: 375, height: 667 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await contextMobile.newPage();
    await mobilePage.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
    await mobilePage.keyboard.press("Escape");
    await mobilePage.waitForTimeout(1000);

    const mobileDarkShot = path.join(artifactDir, "hero-mobile-dark.png");
    await mobilePage.screenshot({ path: mobileDarkShot });
    console.log(`Saved: ${mobileDarkShot}`);

    await contextMobile.close();
    console.log("All verifications complete!");
  } catch (err) {
    console.error("Capture error:", err);
  } finally {
    await browser.close();
    server.kill();
  }
}

main();

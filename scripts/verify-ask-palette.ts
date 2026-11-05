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
    await page.goto("http://127.0.0.1:3000#ask", { waitUntil: "networkidle" });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(1000);

    // 1. Click a suggestion chip to trigger a live stream in Ask Vraj
    console.log("Triggering Ask Vraj suggestion chip query...");
    const chip = page.locator("button", { hasText: "Tell me about the voice agent" }).first();
    await chip.click();

    // Wait for the response stream to complete
    await page.waitForTimeout(2500);

    const askSection = page.locator("#ask");
    const askShot = path.join(artifactDir, "ask-vraj-chat.png");
    await askSection.screenshot({ path: askShot });
    console.log(`Saved: ${askShot}`);

    // 2. Open Command Palette with keyboard shortcut (Control+K / Meta+K)
    console.log("Opening Command Palette via Cmd+K...");
    await page.keyboard.press("Control+k");
    await page.waitForTimeout(600);

    const paletteShot = path.join(artifactDir, "command-palette.png");
    await page.screenshot({ path: paletteShot });
    console.log(`Saved: ${paletteShot}`);

    await context.close();
    console.log("All Phase 4 screenshots captured successfully!");
  } catch (err) {
    console.error("Capture error:", err);
  } finally {
    await browser.close();
    server.kill();
  }
}

main();


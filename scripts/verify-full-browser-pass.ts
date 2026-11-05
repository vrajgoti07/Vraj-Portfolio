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

interface ViewportAudit {
  name: string;
  width: number;
  height: number;
  isMobile?: boolean;
  hasTouch?: boolean;
}

const VIEWPORTS: ViewportAudit[] = [
  { name: "mobile-375", width: 375, height: 667, isMobile: true, hasTouch: true },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1280", width: 1280, height: 800 },
  { name: "ultrawide-1920", width: 1920, height: 1080 },
];

async function main() {
  const artifactDir = "C:\\Users\\VRAJ GOTI\\.gemini\\antigravity\\brain\\d795d383-f0bc-45f8-92c2-ec2a018b9d6f";

  console.log("Starting Next.js production server on 127.0.0.1:3000...");
  const server = spawn("npx.cmd", ["next", "start", "-H", "127.0.0.1", "-p", "3000"], {
    cwd: process.cwd(),
    stdio: "inherit",
    shell: true,
  });

  const isReady = await waitForServer("http://127.0.0.1:3000");
  if (!isReady) {
    console.error("Server did not boot.");
    server.kill();
    process.exit(1);
  }
  console.log("Server ready!");

  const browser = await chromium.launch({ headless: true });
  const consoleErrors: string[] = [];
  const auditResults: Record<string, { overflow: boolean; scrollWidth: number; clientWidth: number }> = {};

  try {
    // 1. Cross-Viewport Responsiveness & Overflow Audit
    for (const vp of VIEWPORTS) {
      console.log(`Auditing viewport: ${vp.name} (${vp.width}x${vp.height})...`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2,
        isMobile: vp.isMobile || false,
        hasTouch: vp.hasTouch || false,
      });

      const page = await context.newPage();
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          consoleErrors.push(`[${vp.name}] ${msg.text()}`);
        }
      });

      await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
      await page.keyboard.press("Escape");
      await page.waitForTimeout(600);

      // Measure horizontal overflow
      const overflowData = await page.evaluate(() => {
        const docEl = document.documentElement;
        return {
          scrollWidth: docEl.scrollWidth,
          clientWidth: docEl.clientWidth,
          hasOverflow: docEl.scrollWidth > docEl.clientWidth,
        };
      });

      auditResults[vp.name] = {
        overflow: overflowData.hasOverflow,
        scrollWidth: overflowData.scrollWidth,
        clientWidth: overflowData.clientWidth,
      };

      const vpScreenshot = path.join(artifactDir, `audit-${vp.name}.png`);
      await page.screenshot({ path: vpScreenshot, fullPage: false });
      console.log(`  Saved screenshot: ${vpScreenshot} | Overflow: ${overflowData.hasOverflow ? "FAIL" : "PASS"}`);

      await context.close();
    }

    // 2. Keyboard Navigation Audit
    console.log("Auditing Keyboard Navigation...");
    const kbdContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    });
    const kbdPage = await kbdContext.newPage();
    await kbdPage.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
    await kbdPage.keyboard.press("Escape");
    await kbdPage.waitForTimeout(400);

    // Test Tab key reaches skip-link
    await kbdPage.keyboard.press("Tab");
    const activeElText = await kbdPage.evaluate(() => document.activeElement?.textContent?.trim());
    console.log(`  First Tab active element: "${activeElText}"`);

    // Test Cmd+K / Ctrl+K opens Command Palette
    await kbdPage.keyboard.press("Control+k");
    await kbdPage.waitForTimeout(400);
    const isPaletteVisible = await kbdPage.locator('div[aria-label="Command Palette"]').isVisible();
    console.log(`  Command Palette opened via keyboard: ${isPaletteVisible ? "PASS" : "FAIL"}`);

    // Test Esc closes Command Palette
    await kbdPage.keyboard.press("Escape");
    await kbdPage.waitForTimeout(400);
    const isPaletteClosed = !(await kbdPage.locator('div[aria-label="Command Palette"]').isVisible());
    console.log(`  Command Palette closed via Escape: ${isPaletteClosed ? "PASS" : "FAIL"}`);

    await kbdContext.close();

    // 3. Reduced Motion Verification
    console.log("Auditing Reduced Motion Mode...");
    const rmContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      reducedMotion: "reduce",
    });
    const rmPage = await rmContext.newPage();
    await rmPage.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
    await rmPage.waitForTimeout(600);

    const isStaticConstellation = await rmPage.locator("text=Project Constellation (Static Mode)").isVisible();
    console.log(`  Constellation adapted to static mode under reduced motion: ${isStaticConstellation ? "PASS" : "FAIL"}`);

    const rmScreenshot = path.join(artifactDir, "audit-reduced-motion.png");
    await rmPage.screenshot({ path: rmScreenshot });
    console.log(`  Saved screenshot: ${rmScreenshot}`);

    await rmContext.close();

    // 4. Report Final Audit Summary
    console.log("\n========================================");
    console.log("📋 BROWSER VERIFICATION SUMMARY");
    console.log("========================================");
    let allOverflowClean = true;
    for (const [name, res] of Object.entries(auditResults)) {
      console.log(`  • Viewport ${name}: ${res.overflow ? "❌ HAS OVERFLOW" : "✅ Zero Horizontal Scroll"} (${res.scrollWidth}px vs ${res.clientWidth}px)`);
      if (res.overflow) allOverflowClean = false;
    }
    console.log(`  • Console Errors Detected: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      consoleErrors.forEach((e) => console.error(`    ${e}`));
    }
    console.log("========================================\n");
  } catch (err) {
    console.error("Browser audit error:", err);
  } finally {
    await browser.close();
    server.kill();
  }
}

main();


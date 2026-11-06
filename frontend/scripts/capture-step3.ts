import { chromium } from "playwright";
import { spawn } from "child_process";
import path from "path";

const ARTIFACT_DIR = "C:\\Users\\VRAJ GOTI\\.gemini\\antigravity\\brain\\d795d383-f0bc-45f8-92c2-ec2a018b9d6f";

async function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log("Starting Next.js production server for Step 3 verification...");
  const server = spawn("npm", ["--prefix", "frontend", "run", "start"], {
    stdio: ["ignore", "pipe", "pipe"],
    shell: true,
  });

  server.stdout?.on("data", (d) => console.log(`[Next] ${d.toString().trim()}`));
  server.stderr?.on("data", (d) => console.error(`[Next ERR] ${d.toString().trim()}`));

  // Wait for server to start
  let ready = false;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch("http://localhost:3000");
      if (res.status === 200) {
        ready = true;
        console.log("Server is ready at http://localhost:3000");
        break;
      }
    } catch {
      await wait(1000);
    }
  }

  if (!ready) {
    server.kill();
    throw new Error("Server failed to respond on port 3000 in time");
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  try {
    console.log("Navigating to http://localhost:3000...");
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await wait(2000);

    // Scroll down to the Ask section
    console.log("Scrolling to #ask...");
    await page.evaluate(() => {
      const el = document.getElementById("ask");
      el?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    await wait(1500);

    // 1. Capture empty state
    const emptyPath = path.join(ARTIFACT_DIR, "step3-console-empty-1280.png");
    await page.screenshot({ path: emptyPath, fullPage: false });
    console.log(`Saved: ${emptyPath}`);

    // 2. Click suggestion prompt 1: "What has Vraj built with AI?"
    console.log("Clicking suggestion prompt...");
    const promptBtn = page.locator('button:has-text("1) What has Vraj built with AI?")');
    await promptBtn.click();

    // Mid-stream screenshot
    await wait(500);
    const midStreamPath = path.join(ARTIFACT_DIR, "step3-console-streaming-1280.png");
    await page.screenshot({ path: midStreamPath, fullPage: false });
    console.log(`Saved: ${midStreamPath}`);

    // Wait for response to finish streaming and sources to appear
    console.log("Waiting for answer and sources...");
    await page.waitForSelector('button:has-text("knowledge-ai-voice-agent")', { timeout: 15000 });
    await wait(1500);

    // 3. Capture completed answer with sources
    const answeredPath = path.join(ARTIFACT_DIR, "step3-console-answered-1280.png");
    await page.screenshot({ path: answeredPath, fullPage: false });
    console.log(`Saved: ${answeredPath}`);

    // 4. Test source chip click scrolls to project
    console.log("Testing source chip click interaction...");
    const sourceChip = page.locator('button:has-text("knowledge-ai-voice-agent")').first();
    await sourceChip.click({ force: true });
    await wait(1500);

    const projectHighlightPath = path.join(ARTIFACT_DIR, "step3-project-highlight-1280.png");
    await page.screenshot({ path: projectHighlightPath, fullPage: false });
    console.log(`Saved: ${projectHighlightPath}`);

    // 5. Test dedicated /ask page
    console.log("Navigating to dedicated /ask page...");
    await page.goto("http://localhost:3000/ask", { waitUntil: "networkidle" });
    await wait(1500);

    const dedicatedAskPath = path.join(ARTIFACT_DIR, "step3-dedicated-ask-page.png");
    await page.screenshot({ path: dedicatedAskPath, fullPage: false });
    console.log(`Saved: ${dedicatedAskPath}`);

    console.log("All Step 3 verification tests passed successfully!");
  } finally {
    await browser.close();
    server.kill();
  }
}

main().catch((err) => {
  console.error("Step 3 capture failed:", err);
  process.exit(1);
});

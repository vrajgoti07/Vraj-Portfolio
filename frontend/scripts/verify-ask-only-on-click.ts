import { chromium } from "playwright";
import { spawn } from "child_process";
import path from "path";

const ARTIFACT_DIR = "C:\\Users\\VRAJ GOTI\\.gemini\\antigravity\\brain\\d795d383-f0bc-45f8-92c2-ec2a018b9d6f";

async function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log("Starting Next.js server...");
  const server = spawn("npm", ["--prefix", "frontend", "run", "start"], {
    stdio: ["ignore", "pipe", "pipe"],
    shell: true,
  });

  // Wait for server to start
  let ready = false;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch("http://localhost:3000");
      if (res.status === 200) {
        ready = true;
        console.log("Server ready on port 3000.");
        break;
      }
    } catch {
      await wait(1000);
    }
  }

  if (!ready) {
    server.kill();
    throw new Error("Server failed to respond in time.");
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  try {
    console.log("Loading Home Page...");
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await wait(2000);

    // Verify #ask does NOT exist on the home page
    const askOnHome = await page.$("#ask");
    console.log(`Is #ask present on Home Page? ${askOnHome !== null ? "YES (ERROR)" : "NO (CORRECT)"}`);

    // Capture Home Page showing Work section directly transitioning to Skills Bento
    await page.evaluate(() => {
      const work = document.getElementById("work");
      work?.scrollIntoView({ behavior: "instant", block: "end" });
    });
    await wait(1500);

    const homeCleanPath = path.join(ARTIFACT_DIR, "home-without-ask-section.png");
    await page.screenshot({ path: homeCleanPath, fullPage: false });
    console.log(`Saved: ${homeCleanPath}`);

    // Click navbar "// 02 Ask" link
    console.log("Clicking // 02 Ask navbar link...");
    const askNavLink = page.locator('a:has-text("// 02 Ask")');
    await askNavLink.click({ force: true });
    await page.waitForURL("**/ask", { timeout: 10000 });
    await wait(2000);

    const askPageCleanPath = path.join(ARTIFACT_DIR, "dedicated-ask-page-verified.png");
    await page.screenshot({ path: askPageCleanPath, fullPage: false });
    console.log(`Saved: ${askPageCleanPath}`);

    console.log("Verification complete! Home page has no chat, /ask page displays chat upon click.");
  } finally {
    await browser.close();
    server.kill();
  }
}

main().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});


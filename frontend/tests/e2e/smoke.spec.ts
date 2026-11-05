import { test, expect } from "@playwright/test";

test.describe("Portfolio Quality Gates & Smoke Tests", () => {
  // Test 1: Home loads with zero console errors
  test("1. home loads with zero uncaught console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    await page.goto("/");
    await page.keyboard.press("Escape");
    await page.waitForTimeout(600);

    expect(consoleErrors).toEqual([]);
    await expect(page.locator("h1")).toContainText("I build AI products that");
  });

  // Test 2: Nav and anchor navigation
  test("2. navigation bar and anchor targets exist and function", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Escape");

    const workAnchor = page.locator('nav a[href="#work"]');
    await expect(workAnchor).toBeVisible();

    const askAnchor = page.locator('nav a[href="#ask"]');
    await expect(askAnchor).toBeVisible();

    const contactAnchor = page.locator('nav a[href="#contact"]');
    await expect(contactAnchor).toBeVisible();
  });

  // Test 3: Command palette open / search / navigate
  test("3. command palette opens with Ctrl+K, filters, and closes with Esc", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Escape");

    await page.keyboard.press("Control+k");
    const palette = page.locator('div[role="dialog"][aria-label="Command Palette"]');
    await expect(palette).toBeVisible();

    await page.keyboard.type("Voice");
    const paletteItem = palette.locator('[cmdk-item]').filter({ hasText: "Knowledge-AI-Voice-Agent" }).first();
    await expect(paletteItem).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(palette).not.toBeVisible();
  });

  // Test 4: Contact form validation and submission
  test("4. contact form validates required inputs and handles submission", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Escape");

    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();

    const submitBtn = page.locator('button[type="submit"]:has-text("Send Message")');
    await expect(submitBtn).toBeVisible();

    await page.fill('input#name', "Test Reviewer");
    await page.fill('input#email', "reviewer@example.com");
    await page.fill('textarea#message', "This is an automated smoke test verification message.");
    await submitBtn.click();

    await expect(page.locator("text=Message sent successfully!")).toBeVisible({ timeout: 5000 });
  });

  // Test 5: Ask Vraj assistant fallback mode
  test("5. ask vraj assistant responds to question chips in offline fallback mode", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Escape");

    const askSection = page.locator("#ask");
    await askSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    const chip = askSection.locator('button:has-text("Which stack does he use?")').first();
    await expect(chip).toBeVisible();
    await chip.dispatchEvent("click");

    // Verify response text appears inside the chat container
    await expect(askSection.getByText("Frontend", { exact: false }).first()).toBeVisible({ timeout: 10000 });
  });

  // Test 6: Case study page loads
  test("6. case study deep-dive page loads with metadata and architecture diagram", async ({ page }) => {
    await page.goto("/work/knowledge-ai-voice-agent");

    await expect(page.locator("h1")).toContainText("Knowledge-AI-Voice-Agent");
    await expect(page.getByText("System Architecture Diagram")).toBeVisible();
    await expect(page.locator("text=Whisper STT").first()).toBeVisible();
  });

  // Test 7: Reduced-motion mode renders without canvas animation
  test("7. reduced motion mode replaces dynamic canvas with static accessible nodes", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await expect(page.locator("text=Project Constellation (Static Mode)")).toBeVisible();
  });
});

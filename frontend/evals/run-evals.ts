import fs from "fs";
import path from "path";
import { sanitizeUserInput } from "../lib/security/sanitize";
import { resolveFallbackResult } from "../lib/ai/fallback";

interface TestCase {
  id: string;
  category: "in-scope" | "out-of-scope" | "adversarial-injection";
  prompt: string;
  expectedToContain: string[];
  expectedNotToContain: string[];
  expectedSources: string[];
}

async function runEvals() {
  const evalsPath = path.join(process.cwd(), "evals", "ask-vraj.json");
  const testCases: TestCase[] = JSON.parse(fs.readFileSync(evalsPath, "utf-8"));

  console.log(`\n🧪 Running Ask Vraj Evals (${testCases.length} test cases with source verification)...\n`);

  let passed = 0;
  let failed = 0;

  for (const tc of testCases) {
    // 1. Check prompt injection firewall
    const sanitization = sanitizeUserInput(tc.prompt);
    let responseText = "";
    let sources: string[] = [];

    if (!sanitization.isClean) {
      responseText =
        "I am designed to answer questions strictly about Vraj Goti's software engineering projects and technical experience. For other topics or direct inquiries, please contact Vraj at vrajgoti07@gmail.com.";
      sources = [];
    } else {
      const result = resolveFallbackResult(tc.prompt);
      responseText = result.answer;
      sources = result.sources;
    }

    const lowerResponse = responseText.toLowerCase();

    // Verify expected strings
    const missingExpected = tc.expectedToContain.filter(
      (term) => !lowerResponse.includes(term.toLowerCase())
    );

    // Verify forbidden strings
    const foundForbidden = tc.expectedNotToContain.filter((term) =>
      lowerResponse.includes(term.toLowerCase())
    );

    // Verify sources
    const missingSources = (tc.expectedSources || []).filter(
      (src) => !sources.includes(src)
    );
    const extraSources =
      tc.expectedSources?.length === 0
        ? sources
        : sources.filter((src) => !tc.expectedSources.includes(src));

    const isPass =
      missingExpected.length === 0 &&
      foundForbidden.length === 0 &&
      missingSources.length === 0 &&
      extraSources.length === 0;

    if (isPass) {
      console.log(`  ✅ [PASS] ${tc.id} (${tc.category}): "${tc.prompt.slice(0, 32)}..." [Sources: ${sources.length > 0 ? sources.join(", ") : "none"}]`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${tc.id} (${tc.category}): "${tc.prompt}"`);
      if (missingExpected.length) {
        console.error(`     Missing expected keywords: ${missingExpected.join(", ")}`);
      }
      if (foundForbidden.length) {
        console.error(`     Found forbidden keywords: ${foundForbidden.join(", ")}`);
      }
      if (missingSources.length) {
        console.error(`     Missing expected sources: ${missingSources.join(", ")} (got: ${sources.join(", ")})`);
      }
      if (extraSources.length) {
        console.error(`     Unexpected extra sources: ${extraSources.join(", ")}`);
      }
      console.error(`     Response was: "${responseText.slice(0, 100)}..."`);
      failed++;
    }
  }

  console.log(`\n========================================`);
  console.log(`📊 Eval Results: ${passed}/${testCases.length} Passed (${failed} Failed)`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runEvals().catch((err) => {
  console.error("Eval runner fatal error:", err);
  process.exit(1);
});

const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/i,
  /system\s+prompt/i,
  /reveal\s+(your\s+)?(instructions|prompt|rules)/i,
  /print\s+(your\s+)?(system|initial)\s+prompt/i,
  /what\s+are\s+your\s+(instructions|rules)/i,
  /you\s+are\s+now\s+(in\s+developer\s+mode|unrestricted|DAN)/i,
  /pretend\s+(you\s+are|to\s+be)\s+another/i,
  /disregard\s+(the\s+)?(guardrails|instructions)/i,
  /<script[\s\S]*?>[\s\S]*?<\/script>/i,
  /javascript:/i,
];

export interface SanitizationResult {
  isClean: boolean;
  sanitized: string;
  flagReason?: string;
}

export function sanitizeUserInput(input: string): SanitizationResult {
  if (!input || typeof input !== "string") {
    return { isClean: false, sanitized: "", flagReason: "Invalid input type" };
  }

  // Enforce max 500 characters
  let clean = input.slice(0, 500).trim();

  // Strip non-printable control characters (except common newlines)
  clean = clean.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

  // Check for prompt injection signatures
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(clean)) {
      return {
        isClean: false,
        sanitized: clean,
        flagReason: "Potential prompt override attempt detected",
      };
    }
  }

  return {
    isClean: true,
    sanitized: clean,
  };
}


interface RateLimitRecord {
  timestamps: number[];
}

const memoryStore = new Map<string, RateLimitRecord>();

// Clean up memory store every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    const tenMinutesAgo = now - 10 * 60 * 1000;
    for (const [ip, record] of memoryStore.entries()) {
      record.timestamps = record.timestamps.filter((t) => t > tenMinutesAgo);
      if (record.timestamps.length === 0) {
        memoryStore.delete(ip);
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Enforces sliding window rate limit: 10 requests per 10 minutes per IP
 */
export async function checkRateLimit(
  identifier: string,
  limit = 10,
  windowMs = 10 * 60 * 1000
): Promise<RateLimitResult> {
  const now = Date.now();
  const windowStart = now - windowMs;

  // 1. If Upstash Redis is configured, use it
  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    try {
      const url = `${process.env.UPSTASH_REDIS_REST_URL}/pipeline`;
      const key = `ratelimit:ask:${identifier}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["ZREMRANGEBYSCORE", key, "0", String(windowStart)],
          ["ZADD", key, String(now), String(now)],
          ["ZCARD", key],
          ["EXPIRE", key, String(Math.ceil(windowMs / 1000))],
        ]),
      });

      if (res.ok) {
        const data = await res.json();
        const count = data[2]?.result ?? 0;
        return {
          success: count <= limit,
          limit,
          remaining: Math.max(0, limit - count),
          reset: now + windowMs,
        };
      }
    } catch (e) {
      console.warn("Upstash rate limit fallback to memory store:", e);
    }
  }

  // 2. In-memory sliding window implementation
  let record = memoryStore.get(identifier);
  if (!record) {
    record = { timestamps: [] };
    memoryStore.set(identifier, record);
  }

  // Filter timestamps within current window
  record.timestamps = record.timestamps.filter((t) => t > windowStart);

  if (record.timestamps.length >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      reset: record.timestamps[0] + windowMs,
    };
  }

  record.timestamps.push(now);

  return {
    success: true,
    limit,
    remaining: limit - record.timestamps.length,
    reset: now + windowMs,
  };
}


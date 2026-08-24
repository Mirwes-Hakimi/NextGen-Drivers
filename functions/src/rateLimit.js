// ─────────────────────────────────────────────────────────────
// Basic per-IP rate limiter — first line of defense against the
// booking route being spammed.
//
// Caveat: this is in-memory, so it only limits requests hitting the
// SAME warm Cloud Functions instance — it resets on cold start and
// doesn't coordinate across concurrent instances. That's enough to
// blunt casual abuse/retries, but not a hard guarantee under real
// attack traffic. For stronger protection, add Firebase App Check
// on the frontend (verifies requests come from your real app) or
// move counters to Firestore for a shared, durable limit.
// ─────────────────────────────────────────────────────────────

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

const requestLog = new Map(); // ip -> timestamps (ms) of recent requests

export function isRateLimited(ip) {
  const now = Date.now();
  const recent = (requestLog.get(ip) || []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    requestLog.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

// ─────────────────────────────────────────────────────────────
// adPixel.js — fires the OpenAI Ads Manager conversion event when a
// driving lesson booking actually happens. The base pixel script
// (which defines window.oaiq) is loaded in index.html.
//
// Guarded so it never throws or blocks the booking flow — an ad
// blocker or a failed script load just means the conversion isn't
// reported, not a broken booking.
// ─────────────────────────────────────────────────────────────

export function trackAppointmentScheduled() {
  try {
    if (typeof window !== "undefined" && typeof window.oaiq === "function") {
      window.oaiq("measure", "appointment_scheduled", { type: "customer_action" });
    }
  } catch (err) {
    console.error("Failed to report OpenAI Ads conversion:", err);
  }
}

// ─────────────────────────────────────────────────────────────
// googleAdsPixel.js — fires the Google Ads "Booking Submitted"
// conversion event when a driving lesson booking actually happens.
// The base gtag.js loader (which defines window.gtag) is loaded in
// index.html.
//
// Guarded so it never throws or blocks the booking flow — an ad
// blocker or a failed script load just means the conversion isn't
// reported, not a broken booking.
// ─────────────────────────────────────────────────────────────

const CONVERSION_SEND_TO = "AW-18227664783/FUGHCLyU-PYcEI-v0PND";

export function trackGoogleAdsConversion(value) {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: CONVERSION_SEND_TO,
        value: typeof value === "number" ? value : 1.0,
        currency: "USD",
      });
    }
  } catch (err) {
    console.error("Failed to report Google Ads conversion:", err);
  }
}

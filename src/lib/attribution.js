// ─────────────────────────────────────────────────────────────
// attribution.js — captures where a visitor came from (Google Ads,
// ChatGPT/OpenAI ads, organic, etc.) so it can be saved on the
// booking record later, even if they browse several pages before
// actually booking.
//
// Reads utm_source / utm_medium / utm_campaign (standard ad-tracking
// params) and oppref (OpenAI's ad-click identifier — see
// https://help.openai.com/en/articles/20001409-conversion-measurement)
// from the URL on landing, and remembers them in localStorage for 30
// days — matching the lifetime of OpenAI's own first-party cookie.
// ─────────────────────────────────────────────────────────────

const STORAGE_KEY = "bds_attribution";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

// Call once when the app loads. If the current URL has any tracking
// params, they become the new stored attribution (last-touch) —
// otherwise, whatever was already stored is left alone so navigating
// to a second page doesn't erase it.
export function captureAttributionFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const source = params.get("utm_source");
    const medium = params.get("utm_medium");
    const campaign = params.get("utm_campaign");
    const oppref = params.get("oppref");

    if (!source && !medium && !campaign && !oppref) {
      return; // nothing new in this URL — keep whatever's already stored
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        source: source || null,
        medium: medium || null,
        campaign: campaign || null,
        oppref: oppref || null,
        capturedAt: Date.now(),
      })
    );
  } catch (err) {
    // localStorage can throw in private-browsing/blocked-storage cases —
    // attribution is a nice-to-have, never worth breaking the site over.
    console.error("Failed to capture attribution:", err);
  }
}

// Call when a booking (or any other conversion) happens, to get the
// fields to save alongside it. Returns nulls if nothing was ever
// captured, or if the stored value is older than MAX_AGE_MS.
export function getAttribution() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { source: null, medium: null, campaign: null, oppref: null };

    const stored = JSON.parse(raw);
    if (Date.now() - stored.capturedAt > MAX_AGE_MS) {
      return { source: null, medium: null, campaign: null, oppref: null };
    }

    return {
      source: stored.source,
      medium: stored.medium,
      campaign: stored.campaign,
      oppref: stored.oppref,
    };
  } catch (err) {
    console.error("Failed to read attribution:", err);
    return { source: null, medium: null, campaign: null, oppref: null };
  }
}

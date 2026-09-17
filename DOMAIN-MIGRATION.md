# Domain Migration Checklist — next-gen-drivers.vercel.app → www.yourbds.com

This is the step-by-step list for connecting the real business domain.
Nothing here happens automatically — work through it in order when
you're ready. None of these steps require touching the codebase unless
noted.

## Already handled in code (no action needed)

- `src/siteConfig.js`'s `SITE_URL` already defaults to
  `https://www.yourbds.com` for any production build — canonical URLs,
  Open Graph tags, and structured data are already generated pointing
  at the future domain, even while the site is still live on the
  `.vercel.app` URL. This is intentional: it stops the temporary Vercel
  URL from being treated as the "real" address by search engines.
- Stripe's checkout `success_url`/`cancel_url` are built from
  `window.location.origin` at runtime (see `BookingPage.jsx`) — they
  automatically use whichever domain the site is actually running on,
  no hardcoded URL to update.

## 1. Vercel domain setup

- [ ] In the Vercel project → Settings → Domains, add `www.yourbds.com`
      (and `yourbds.com`, set to redirect to the `www` version or vice
      versa — pick one as canonical and stick with it).
- [ ] Follow Vercel's DNS instructions at your domain registrar (either
      an `A`/`ALIAS` record for the apex domain, or a `CNAME` for `www`
      — Vercel's UI shows the exact records once you add the domain).
- [ ] Wait for DNS propagation (can take minutes to ~48 hours).
- [ ] Confirm Vercel shows the domain as "Valid Configuration" and
      HTTPS certificate as issued (Vercel provisions this
      automatically via Let's Encrypt once DNS resolves).

## 2. Firebase

- [ ] Firebase Console → Authentication → Settings → **Authorized
      domains** → add `www.yourbds.com` (and `yourbds.com` if used).
      Without this, login/signup will fail with an
      `auth/unauthorized-domain` error on the new domain.
- [ ] No other Firebase changes needed — Firestore rules and Cloud
      Functions aren't domain-restricted.

## 3. Stripe

- [ ] No code changes needed (see note above).
- [ ] If Stripe Dashboard has any webhook endpoint or redirect URL
      allowlist configured, double check it isn't restricted to the
      Vercel domain (unlikely, since webhooks point at Cloud Functions
      URLs, not the frontend domain — but worth a quick look).
- [ ] When ready to accept real payments, switch Stripe from test mode
      to live mode (separate live API keys/webhook — see the Stripe
      section of earlier setup notes).

## 4. Google Search Console

- [ ] Add `www.yourbds.com` as a property (use the "Domain" property
      type if possible — covers `http`/`https` and `www`/non-`www`
      automatically).
- [ ] Verify ownership (DNS TXT record is usually easiest alongside
      the Vercel DNS changes you're already making).
- [ ] Submit `https://www.yourbds.com/sitemap.xml` under Sitemaps.
- [ ] Use "Request Indexing" on the homepage and a few key pages to
      speed up initial crawling.

## 5. robots.txt / sitemap.xml verification

- [ ] Visit `https://www.yourbds.com/robots.txt` — confirm it loads
      and lists the correct `Sitemap:` line.
- [ ] Visit `https://www.yourbds.com/sitemap.xml` — confirm it loads
      and every URL in it uses `www.yourbds.com` (not the Vercel URL).
- [ ] If you've added new pages since the sitemap was last edited
      (e.g. individual `/locations/<city>` pages), update
      `public/sitemap.xml` to include them before this step.

## 6. Canonical URL verification

- [ ] On several pages, View Source (or DevTools → Elements) and
      confirm `<link rel="canonical" href="https://www.yourbds.com/...">`
      points at the real domain, not `.vercel.app`.
- [ ] Confirm Open Graph tags (`og:url`, `og:image`) also use the real
      domain — test with Facebook's Sharing Debugger or LinkedIn's Post
      Inspector to force a fresh crawl once live.

## 7. Analytics & ad platforms

- [ ] **Google Analytics** (if/when added): create a property for the
      new domain, confirm tracking fires on `www.yourbds.com`.
- [ ] **Google Ads**: update the campaign's Final URL from the Vercel
      domain to `https://www.yourbds.com/` (with whatever UTM tracking
      parameters template is already configured — see Campaign
      settings → Tracking parameters).
- [ ] **OpenAI Ads Manager**: same — update the ChatGPT ad's landing
      page URL to `https://www.yourbds.com/`.
- [ ] Re-run a test conversion on the **live domain** for both
      platforms (see Testing section below) — don't assume the Vercel
      domain's working setup automatically carries over; the Pixel/
      gtag base tags are already domain-agnostic (they're in
      `index.html`), but always worth confirming end-to-end.

## 8. Redirect strategy from old URLs

- [ ] Vercel automatically continues serving the `.vercel.app` URL
      alongside the custom domain — nothing to disable there.
- [ ] If you want the old Vercel URL to redirect to the new domain
      (recommended, avoids duplicate-content confusion for search
      engines), this needs to be configured in Vercel project settings
      or via a redirect rule — ask before implementing if you want
      this, since it's a project-level Vercel change.
- [ ] Internal old-path redirects (`/teen-course` → `/services/teen-
      driving-lessons`, etc.) are already handled in code
      (`src/App.jsx`) — nothing more needed there.

## 9. Testing checklist (do this on the live www.yourbds.com domain)

- [ ] **Booking (Pay Later)**: submit a real test booking with your own
      email — confirm it saves, calendar event is created, and the
      confirmation email arrives.
- [ ] **Booking (Pay Now)**: submit a test booking, complete Stripe
      checkout (test card `4242 4242 4242 4242` if still in Stripe test
      mode), confirm the `/booking-success` page shows "Paid in full"
      and the calendar event + email reflect payment.
- [ ] **Forms**: test the Contact page form actually sends (requires
      the EmailJS contact template to be set up — see open item from
      earlier).
- [ ] **Mobile**: test the full booking flow on an actual phone, not
      just a resized desktop browser window.
- [ ] **Firebase Auth**: test login, signup, and password reset on the
      new domain (this is exactly what step 2's authorized-domain
      change unlocks — if you skip step 2, this will fail).
- [ ] **Analytics/conversion tracking**: submit one more test booking
      after switching domains, confirm it shows up in both OpenAI Ads
      Manager's Event Stream and (allowing more delay) Google Ads'
      conversion reporting.
- [ ] **404 page**: visit a nonexistent URL, confirm the 404 page shows
      (not a blank page or a generic Vercel error).
- [ ] **Admin dashboard**: confirm `/admin` still works correctly for
      the `info@yourbds.com` account on the new domain.

## 10. Before you consider this "done"

- [ ] All checkboxes above are checked.
- [ ] No console errors on the homepage, Packages page, or Booking
      flow (check DevTools Console on the live domain).
- [ ] Google Search Console shows the sitemap as successfully
      processed (can take a few days after submission).

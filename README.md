# React + Vite
# Best Driving School

A full-stack platform for driving lesson enrollment, scheduling, and payment.

## ✅ Features
- City-filtered package browsing
- Student + parent information form
- Appointment scheduling
- Book now, pay later — no payment collected at booking time
- Authentication (login, signup, logout)
- External DMV resources open in new tabs
- Modern UI with CSS Modules + animations

## 🛠 Tech Stack
- React
- CSS Modules
- React Router
- Node.js + MongoDB (coming soon)

## 🚧 Status
✅ Frontend in progress  
✅ UI + routing  
🔜 Backend + DB integration  

## 📅 Google Calendar integration

When a student submits the booking form, the app creates a Google Calendar
event on the business calendar (one per session) and invites the student as
an attendee, so Google emails them the invite automatically. This runs
server-side in a Firebase Cloud Function (`functions/`) — the Google service
account credentials never reach the browser.

### One-time setup

**1. Upgrade to the Blaze plan.** Cloud Functions that call external APIs
(like the Calendar API) require Firebase's Blaze (pay-as-you-go) plan, not
the free Spark plan. It has a generous free tier, but it's a billing change:
Firebase Console → your project → **Upgrade** (bottom-left).

**2. Share the calendar with the service account.** In Google Calendar
(as the business account) → the calendar's **Settings and sharing** →
**Share with specific people** → add the service account's email (the
`client_email` from its JSON key) with **"Make changes to events"**
permission. Without this, event creation will fail even with valid credentials.

**3. Set the four secrets.** From the repo root, run each of these — they
prompt you to paste the value, and Firebase stores it encrypted in Secret
Manager (never in a file, never in chat):
```
firebase functions:secrets:set GOOGLE_CLIENT_EMAIL
firebase functions:secrets:set GOOGLE_PRIVATE_KEY
firebase functions:secrets:set GOOGLE_CALENDAR_ID
firebase functions:secrets:set GOOGLE_IMPERSONATE_EMAIL
```
See `functions/.env.example` for what each value is and where to find it.

**4. Install functions dependencies and deploy:**
```
cd functions && npm install
cd ..
firebase deploy --only functions
```
The deploy output prints the function's HTTPS URL.

**5. Point the frontend at it.** Copy `.env.example` to `.env` at the repo
root and set `VITE_CALENDAR_FUNCTION_URL` to that URL, then rebuild/redeploy
the frontend.

### Testing safely

**Never send test invites to real student addresses.** While testing, book
sessions using your own Workspace email address as the student email, so
any test invites only ever land in your own inbox.

### Troubleshooting

**403 error: "Service accounts cannot invite attendees"** — this means the
domain-wide delegation isn't actually working, so Google is treating the
request as coming from the bare service account (which indeed can't invite
attendees) instead of the impersonated user. Check:
- The scope authorized in your Workspace Admin Console's domain-wide
  delegation settings is exactly `https://www.googleapis.com/auth/calendar`
  (not `.readonly` or a typo).
- `GOOGLE_IMPERSONATE_EMAIL` is a real, active user in your Workspace — not
  the service account's own email, and not a suspended/deleted account.
- The service account's **client ID** (numeric, from the service account
  details page — not its email) is the one entered in the delegation
  settings, and the delegation was saved *after* the Calendar API scope
  was added.
- Delegation changes can take a few minutes to propagate — if you just set
  it up, wait and retry before assuming it's misconfigured.



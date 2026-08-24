// ─────────────────────────────────────────────────────────────
// functions/index.js — HTTP Cloud Function equivalent of a
// Next.js `app/api/bookings/route.ts` handler. Validates the
// request, creates a Google Calendar event for the booking, and
// returns the event id + link. All Google credentials stay here —
// none of this file's code ever reaches the browser.
// ─────────────────────────────────────────────────────────────

import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import cors from "cors";
import { z } from "zod";
import { createBookingEvent } from "./src/googleCalendar.js";
import { isRateLimited } from "./src/rateLimit.js";

const corsHandler = cors({ origin: true });

// Bound here so Firebase knows to inject them as process.env vars at
// runtime. Set the real values with (never paste secrets into chat/code):
//   firebase functions:secrets:set GOOGLE_CLIENT_EMAIL
//   firebase functions:secrets:set GOOGLE_PRIVATE_KEY
//   firebase functions:secrets:set GOOGLE_CALENDAR_ID
//   firebase functions:secrets:set GOOGLE_IMPERSONATE_EMAIL
const GOOGLE_CLIENT_EMAIL = defineSecret("GOOGLE_CLIENT_EMAIL");
const GOOGLE_PRIVATE_KEY = defineSecret("GOOGLE_PRIVATE_KEY");
const GOOGLE_CALENDAR_ID = defineSecret("GOOGLE_CALENDAR_ID");
const GOOGLE_IMPERSONATE_EMAIL = defineSecret("GOOGLE_IMPERSONATE_EMAIL");

// One request = one calendar event = one session of a booking. A 4-hour
// package (2 sessions) means the frontend calls this route twice.
const bookingSchema = z.object({
  sessionNumber: z.number().int().positive(),
  studentName: z.string().min(1),
  studentEmail: z.string().email(),
  parentName: z.string().optional(),
  dob: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(1),
  country: z.string().min(1),
  phone: z.string().min(1),
  packageTitle: z.string().min(1),
  price: z.number().nonnegative(),
  appointmentDate: z.string().min(1), // human-readable, for the description text
  appointmentTime: z.string().min(1), // human-readable, for the description text
  paymentMethod: z.string().min(1),
  // Local datetimes, no "Z"/offset — see googleCalendar.js for why.
  startDateTime: z.string().min(1),
  endDateTime: z.string().min(1),
});

export const createBooking = onRequest(
  {
    secrets: [
      GOOGLE_CLIENT_EMAIL,
      GOOGLE_PRIVATE_KEY,
      GOOGLE_CALENDAR_ID,
      GOOGLE_IMPERSONATE_EMAIL,
    ],
  },
  (req, res) => {
    corsHandler(req, res, async () => {
      if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
      }

      const ip = req.headers["x-forwarded-for"] || req.ip || "unknown";
      if (isRateLimited(String(ip))) {
        res.status(429).json({ error: "Too many requests. Please try again later." });
        return;
      }

      const parsed = bookingSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ error: "Invalid booking data", details: parsed.error.flatten() });
        return;
      }

      try {
        const { eventId, htmlLink } = await createBookingEvent(parsed.data);
        res.status(200).json({ eventId, htmlLink });
      } catch (err) {
        // Never log the private key or the full booking payload — just
        // enough to diagnose the failure (Google's error + who it was for).
        // Plain console.error, not the firebase-functions `logger` module —
        // Cloud Functions captures console output automatically, and the
        // `logger` import was found to hang during local testing.
        console.error("Google Calendar event creation failed", {
          message: err?.message,
          code: err?.code,
          errors: err?.errors,
          studentEmail: parsed.data.studentEmail,
          sessionNumber: parsed.data.sessionNumber,
        });
        res.status(500).json({ error: "Could not create the calendar event." });
      }
    });
  }
);

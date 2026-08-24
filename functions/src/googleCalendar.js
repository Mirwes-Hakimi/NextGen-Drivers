// ─────────────────────────────────────────────────────────────
// google-calendar.js — server-only. Never import this from client code.
//
// Authenticates as a Google Workspace service account with domain-wide
// delegation (JWT impersonation) and creates a Calendar event for a
// booking, inviting the student so Google emails them the invite.
//
// Credentials come from environment variables ONLY — never hardcode them.
// In production these are Firebase secrets, bound as env vars at runtime
// by the `secrets: [...]` option on the function in index.js.
// ─────────────────────────────────────────────────────────────

import { google } from "googleapis";
import {
  CANCELLATION_POLICY,
  EVENT_TYPE_DESCRIPTION,
  SESSION_BREAK_POLICY,
} from "./bookingPolicies.js";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const TIME_ZONE = "America/Los_Angeles"; // IANA zone — handles PDT/PST automatically

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// Builds the domain-wide-delegation JWT client. `subject` is the Workspace
// user the service account impersonates — this is what lets a service
// account (which normally can't invite attendees) send real invites.
function buildJwtClient() {
  const email = requireEnv("GOOGLE_CLIENT_EMAIL");
  // .env files / secret managers can't store literal newlines, so private
  // keys are stored with escaped "\n" sequences that need to be restored.
  const key = requireEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");
  const subject = requireEnv("GOOGLE_IMPERSONATE_EMAIL");

  return new google.auth.JWT({ email, key, scopes: SCOPES, subject });
}

function buildDescription(booking) {
  const {
    studentName,
    studentEmail,
    parentName,
    dob,
    address,
    city,
    state,
    zip,
    country,
    phone,
    packageTitle,
    price,
    appointmentDate,
    appointmentTime,
    paymentMethod,
  } = booking;

  return [
    `Invitee name: ${studentName}`,
    `Invitee email: ${studentEmail}`,
    `Parent/guardian: ${parentName || "Not provided"}`,
    `Date of birth: ${dob}`,
    `Address: ${address}, ${city}, ${state} ${zip}, ${country}`,
    `Phone: ${phone}`,
    `Package: ${packageTitle} — $${price}`,
    `Appointment: ${appointmentDate} at ${appointmentTime}`,
    `Payment method: ${paymentMethod}`,
    "",
    "— Cancellation Policy —",
    CANCELLATION_POLICY,
    "",
    "— About This Event —",
    EVENT_TYPE_DESCRIPTION,
    "",
    "— Session Break Policy —",
    SESSION_BREAK_POLICY,
  ].join("\n");
}

// booking.startDateTime / endDateTime must be LOCAL datetime strings with
// no "Z" and no UTC offset, e.g. "2026-08-01T14:00:00" — paired with
// timeZone below, Google resolves DST correctly for that exact date
// instead of a fixed offset that would be wrong half the year.
export async function createBookingEvent(booking) {
  const calendarId = requireEnv("GOOGLE_CALENDAR_ID");
  const auth = buildJwtClient();
  const calendar = google.calendar({ version: "v3", auth });

  const requestBody = {
    summary: `Session ${booking.sessionNumber}: ${booking.studentName} & Best Driving School`,
    location: booking.address,
    description: buildDescription(booking),
    start: { dateTime: booking.startDateTime, timeZone: TIME_ZONE },
    end: { dateTime: booking.endDateTime, timeZone: TIME_ZONE },
    attendees: [{ email: booking.studentEmail }],
    reminders: {
      useDefault: false,
      overrides: [{ method: "popup", minutes: 30 }],
    },
  };

  const response = await calendar.events.insert({
    calendarId,
    sendUpdates: "all", // emails the student the invite
    requestBody,
  });

  return { eventId: response.data.id, htmlLink: response.data.htmlLink };
}

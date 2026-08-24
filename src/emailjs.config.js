// ─────────────────────────────────────────────────────────────
// EmailJS Configuration
//
// HOW TO GET THESE VALUES:
//
// 1. Go to https://www.emailjs.com and sign up for a free account
//
// 2. SERVICE_ID
//    → Dashboard → Email Services → Add New Service
//    → Connect your Gmail (or any email provider)
//    → Copy the Service ID shown (looks like "service_xxxxxxx")
//    service_05tn09g
//
// 3. TEMPLATE_ID
//    → Dashboard → Email Templates → Create New Template
//    → Design your confirmation email using the variables listed below
//    → Copy the Template ID (looks like "template_xxxxxxx")
//
// 4. PUBLIC_KEY
//    → Dashboard → Account → General → Public Key
//   
//
// EMAIL TEMPLATE VARIABLES
// Use these in your EmailJS template exactly as written:
//
//   {{to_email}}       — the recipient (student/parent email, or the school for its copy)
//   {{student_name}}   — student's first + last name
//   {{package_title}}  — e.g. "Behind The Wheel Training Package: 2 Hours"
//   {{city}}           — e.g. "Walnut Creek"
//   {{price}}          — e.g. "180"
//   {{sessions_text}}  — formatted list of session dates and times
//
// Every booking sends this template twice: once to the customer's
// {{to_email}}, and once to SCHOOL_NOTIFY_EMAIL below so the school
// gets a copy of every new booking too.
//
// SUGGESTED TEMPLATE SUBJECT:
//   Booking Confirmation – Best Driving School
//
// SUGGESTED TEMPLATE BODY:
//   Hi {{student_name}},
//
//   Your booking has been received! Here are your details:
//
//   Package: {{package_title}}
//   City: {{city}}
//   Price: ${{price}}
//
//   Sessions:
//   {{sessions_text}}
//
//   No payment is due now — you'll pay at your first session.
//   We will follow up shortly to confirm your appointment.
//
//   – Best Driving School
// ─────────────────────────────────────────────────────────────

export const EMAILJS_SERVICE_ID  = "service_05tn09g";   // paste your Service ID here
export const EMAILJS_TEMPLATE_ID = "template_bwwmyyc";  // paste your Template ID here
export const EMAILJS_PUBLIC_KEY  = "6LKuop0YHiirMBE0J";   // paste your Public Key here

// Every new booking also gets emailed here so the school has a record of it
export const SCHOOL_NOTIFY_EMAIL = "info@yourbds.com";

// ─────────────────────────────────────────────────────────────
// WELCOME TEMPLATE — sent once, when someone creates an account
// (separate from the booking template above, since the fields
// don't overlap: a signup has no package/city/price/sessions).
//
// TO SET THIS UP:
// 1. Dashboard → Email Templates → Create New Template
// 2. Copy its Template ID below (looks like "template_xxxxxxx")
//
// TEMPLATE VARIABLES:
//   {{to_email}}     — the recipient (new user, or the school for its copy)
//   {{user_email}}   — the new account's email address
//
// Sent twice per signup: once to the new user's {{to_email}}, and once
// to SCHOOL_NOTIFY_EMAIL so the school knows someone signed up.
//
// SUGGESTED TEMPLATE SUBJECT:
//   Welcome to Best Driving School!
//
// SUGGESTED TEMPLATE BODY:
//   Hi there,
//
//   Thanks for creating an account with Best Driving School
//   ({{user_email}}). You can now log in anytime to book a session
//   and track your bookings in one place.
//
//   Ready to get started? Browse our packages and book your first
//   lesson whenever works for you.
//
//   – Best Driving School
// ─────────────────────────────────────────────────────────────

export const EMAILJS_WELCOME_TEMPLATE_ID = "REPLACE_WITH_YOUR_WELCOME_TEMPLATE_ID";

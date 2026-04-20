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
//   {{to_email}}       — the student/parent email address
//   {{student_name}}   — student's first + last name
//   {{package_title}}  — e.g. "Behind The Wheel Training Package: 2 Hours"
//   {{city}}           — e.g. "Walnut Creek"
//   {{price}}          — e.g. "180"
//   {{sessions_text}}  — formatted list of session dates and times
//
// SUGGESTED TEMPLATE SUBJECT:
//   Booking Confirmation – Next Gen Driving School
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
//   We will follow up shortly to confirm your appointment.
//
//   – Next Gen Driving School
// ─────────────────────────────────────────────────────────────

export const EMAILJS_SERVICE_ID  = "service_05tn09g";   // paste your Service ID here
export const EMAILJS_TEMPLATE_ID = "template_bwwmyyc";  // paste your Template ID here
export const EMAILJS_PUBLIC_KEY  = "6LKuop0YHiirMBE0J";   // paste your Public Key here

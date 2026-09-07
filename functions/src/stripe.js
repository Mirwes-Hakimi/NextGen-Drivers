// ─────────────────────────────────────────────────────────────
// stripe.js — server-only. Creates and verifies Stripe Checkout
// Sessions for online booking payments. Credentials come from
// Firebase secrets only — never hardcoded.
//
// The `stripe` package is imported dynamically inside each function
// below (not statically at the top of this file) so Firebase's
// deploy-time "analyze the function file" step never has to load it —
// same reasoning documented in googleCalendar.js.
// ─────────────────────────────────────────────────────────────

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function getStripeClient() {
  const secretKey = requireEnv("STRIPE_SECRET_KEY");
  const { default: Stripe } = await import("stripe");
  return new Stripe(secretKey);
}

// One Checkout Session per booking, for the booking's total price.
// `metadata.bookingId` is how the webhook below knows which Firestore
// booking to mark paid once Stripe confirms the payment.
export async function createCheckoutSession({
  bookingId,
  packageTitle,
  priceUsd,
  studentEmail,
  successUrl,
  cancelUrl,
}) {
  const stripe = await getStripeClient();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    // No `payment_method_types` here — this Stripe account has "Managed
    // Payments" enabled, which picks payment methods automatically and
    // rejects an explicit list. Managed Payments also requires every
    // product to carry a Stripe tax code unless it's turned off for the
    // session — we don't need Stripe's automatic tax handling, so opt out.
    managed_payments: { enabled: false },
    customer_email: studentEmail,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: packageTitle },
          unit_amount: Math.round(priceUsd * 100), // Stripe expects cents
        },
        quantity: 1,
      },
    ],
    metadata: { bookingId },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return { url: session.url };
}

// Verifies a webhook request really came from Stripe (using the raw,
// unparsed request body + the signature Stripe sends) before trusting
// its contents — never trust webhook payloads without this check.
export async function constructWebhookEvent(rawBody, signature) {
  const webhookSecret = requireEnv("STRIPE_WEBHOOK_SECRET");
  const stripe = await getStripeClient();
  return stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
}

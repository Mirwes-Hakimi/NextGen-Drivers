// ─────────────────────────────────────────────────────────────
// adminFirestore.js — lazily initializes the Firebase Admin SDK and
// hands back a Firestore instance. Admin SDK writes bypass
// firestore.rules entirely (that's the point — this only runs
// server-side, from the Stripe webhook, after Stripe itself has
// verified the payment).
//
// Dynamically imported so it only loads on first real use, keeping
// Firebase's deploy-time file analysis fast (see stripe.js).
// ─────────────────────────────────────────────────────────────

let dbPromise;

export function getAdminFirestore() {
  if (!dbPromise) {
    dbPromise = (async () => {
      const { initializeApp, getApps } = await import("firebase-admin/app");
      const { getFirestore } = await import("firebase-admin/firestore");
      if (getApps().length === 0) {
        initializeApp();
      }
      return getFirestore();
    })();
  }
  return dbPromise;
}

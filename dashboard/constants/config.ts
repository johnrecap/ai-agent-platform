// =================================================================================
// 🔑 CONFIGURATION
// =================================================================================
// Instructions:
// 1. Google Login: Get your Client ID from Google Cloud Console -> APIs & Services -> Credentials
// 2. Stripe: Get your Payment Link from Stripe Dashboard -> Products -> Create Payment Link
// =================================================================================

export const CONFIG = {
  // Google OAuth Client ID
  // Example: "123456789-abc... .apps.googleusercontent.com"
  GOOGLE_CLIENT_ID: "YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com",

  // Stripe Payment Link (simplest way to accept payments)
  // Example: "https://buy.stripe.com/test_..."
  STRIPE_PAYMENT_LINK: "https://stripe.com", 

  // (Optional) Stripe Publishable Key if building custom checkout
  STRIPE_PUBLISHABLE_KEY: "pk_test_...",
  
  // App Details
  APP_NAME: "Nexus AI Dashboard",
  SUPPORT_EMAIL: "support@nexus.io"
};
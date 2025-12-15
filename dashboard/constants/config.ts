// =================================================================================
// 🔑 CONFIGURATION
// =================================================================================
// Environment variables for Vercel deployment:
// VITE_API_URL - Your Railway backend URL
// =================================================================================

export const CONFIG = {
  // API URL - Set via environment variable
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',

  // Stripe Payment Link (for upgrade functionality)
  STRIPE_PAYMENT_LINK: "https://stripe.com",

  // App Details
  APP_NAME: "AI Agent Dashboard",
  SUPPORT_EMAIL: "support@aiagent.io"
};
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ClientProviders from "@/components/ClientProviders";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "AI Agent Platform",
    template: "%s | AI Agent Platform"
  },
  description: "AI Agent Hosting Platform - Manage and track conversations with AI agents",
  keywords: ["AI", "Chatbot", "Agent", "Hosting", "Platform", "Dify"],
  authors: [{ name: "Muhammad Saeed" }],
  creator: "Muhammad Saeed",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai-agent-platform-three.vercel.app",
    title: "AI Agent Platform",
    description: "AI Agent Hosting Platform - Manage and track conversations with AI agents",
    siteName: "AI Agent Platform",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Prevent FOUC - Set theme before React hydrates */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {
                document.documentElement.setAttribute('data-theme', 'dark');
              }
            })();
          `
        }} />
      </head>
      <body className={`${inter.variable} ${cairo.variable} font-sans antialiased`}>
        <ClientProviders>
          <main className="min-h-screen bg-[var(--bg-primary)]">
            {children}
          </main>
        </ClientProviders>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#111118',
              color: '#F9FAFB',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}

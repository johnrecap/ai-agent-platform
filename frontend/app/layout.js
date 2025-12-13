import { MotionProvider } from '@/lib/MotionContext';
import { PerformanceProvider } from '@/lib/PerformanceContext';
import { ThemeProvider } from '@/lib/ThemeContext';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import './globals.css';

export const metadata = {
  title: 'AI Agent Platform - Professional Chatbot Solutions',
  description: 'Turn customer support into autopilot in 10 minutes. AI platform that cuts 80% of repetitive inquiries.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <MotionProvider>
            <PerformanceProvider>
              <PerformanceMonitor />
              {children}
            </PerformanceProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

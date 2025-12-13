'use client';

/**
 * Client Providers Wrapper
 * Wraps the app with client-side providers
 */

import { LanguageProvider, LanguageSelector } from '@/lib/language';
import { ThemeProvider } from '@/lib/ThemeContext';

export default function ClientProviders({ children }) {
    return (
        <ThemeProvider>
            <LanguageProvider>
                {children}
                <LanguageSelector />
            </LanguageProvider>
        </ThemeProvider>
    );
}

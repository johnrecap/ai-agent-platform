'use client';

/**
 * Client Providers Wrapper
 * Wraps the app with client-side providers
 */

import { LanguageProvider, LanguageSelector } from '@/lib/language';

export default function ClientProviders({ children }) {
    return (
        <LanguageProvider>
            {children}
            <LanguageSelector />
        </LanguageProvider>
    );
}

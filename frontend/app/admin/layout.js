'use client';

/**
 * Admin Layout with i18n
 * AI Agent Platform - Premium 2026 Design
 */

import ProtectedRoute from '@/components/ProtectedRoute';
import AdminSidebar from '@/components/AdminSidebar';
import CommandPalette from '@/components/CommandPalette';
import ChatbotWidget from '@/components/ChatbotWidget';
import { NotificationProvider, NotificationBell, NotificationPanel } from '@/components/NotificationCenter';
import { useLanguage } from '@/lib/language';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }) {
    const { isRTL, t } = useLanguage();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <ProtectedRoute requireAdmin={true}>
            <NotificationProvider>
                <div className="min-h-screen bg-[var(--bg-primary)]" dir={isRTL ? 'rtl' : 'ltr'}>
                    <AdminSidebar />

                    {/* Top Bar with Notifications */}
                    <div className={`fixed top-0 z-40 h-16 flex items-center gap-4 px-6 ${isMobile
                        ? 'left-0 right-0'
                        : isRTL
                            ? 'left-0 right-64'
                            : 'right-0 left-64'
                        }`}>
                        <div className="flex-1" />
                        <button
                            onClick={() => {
                                const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
                                document.dispatchEvent(event);
                            }}
                            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-tertiary)] rounded-lg text-[var(--text-muted)] text-sm hover:text-[var(--text-secondary)] transition-colors"
                        >
                            <span>🔍</span>
                            <span>{t('common.search')}...</span>
                            <kbd className="px-1.5 py-0.5 bg-[var(--bg-card)] rounded text-xs">⌘K</kbd>
                        </button>
                        <NotificationBell />
                    </div>

                    <main className={`
                        min-h-screen
                        transition-all duration-300
                        ${isMobile
                            ? 'pt-16 pb-20'
                            : isRTL
                                ? 'mr-64 pt-16'
                                : 'ml-64 pt-16'
                        }
                    `}>
                        {children}
                    </main>

                    {/* Global Components */}
                    <CommandPalette />
                    <NotificationPanel />
                    <ChatbotWidget />
                </div>
            </NotificationProvider>
        </ProtectedRoute>
    );
}

'use client';

/**
 * Modern Admin Sidebar with i18n
 * AI Agent Platform - Premium 2026 Design
 */

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { logout } from '@/lib/auth';
import { useLanguage } from '@/lib/language';

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { t, isRTL, language, setLanguage } = useLanguage();
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const menuItems = [
        { icon: '🏠', labelKey: 'admin.dashboard', href: '/admin', exact: true },
        { icon: '👥', labelKey: 'admin.users', href: '/admin/users' },
        { icon: '🤖', labelKey: 'admin.agents', href: '/admin/agents' },
        { icon: '💬', labelKey: 'conversations.title', href: '/admin/conversations' },
        { icon: '📊', labelKey: 'admin.analytics', href: '/admin/analytics' },
        { icon: '⚙️', labelKey: 'settings.title', href: '/admin/settings' },
    ];

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth >= 1024) setMobileOpen(false);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const toggleLanguage = () => {
        setLanguage(language === 'ar' ? 'en' : 'ar');
    };

    const isActive = (item) => {
        if (item.exact) return pathname === item.href;
        return pathname.startsWith(item.href);
    };

    // Mobile Bottom Navigation
    if (isMobile) {
        return (
            <>
                {/* Mobile Header */}
                <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] flex items-center justify-between px-4 glass">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🤖</span>
                        <span className="font-bold text-[var(--text-primary)]">{t('nav.aiAgentPlatform')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleLanguage}
                            className="px-2 py-1 text-xs bg-[var(--bg-tertiary)] rounded-lg text-[var(--text-secondary)]"
                        >
                            {language === 'ar' ? 'EN' : 'ع'}
                        </button>
                        <button
                            onClick={handleLogout}
                            className="text-[var(--text-secondary)] hover:text-[var(--error)] p-2"
                            aria-label={t('common.logout')}
                        >
                            🚪
                        </button>
                    </div>
                </header>

                {/* Mobile Bottom Navigation */}
                <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-secondary)] border-t border-[var(--border-primary)] glass safe-area-inset">
                    <div className="flex justify-around items-center h-16">
                        {menuItems.slice(0, 5).map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex flex-col items-center justify-center py-2 px-3 min-w-[64px]
                                    transition-all duration-200
                                    ${isActive(item)
                                        ? 'text-[var(--primary)]'
                                        : 'text-[var(--text-secondary)] active:scale-95'
                                    }
                                `}
                                aria-current={isActive(item) ? 'page' : undefined}
                            >
                                <span className="text-xl mb-1">{item.icon}</span>
                                <span className="text-[10px] font-medium">{t(item.labelKey)}</span>
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* Content Padding */}
                <div className="pt-16 pb-20" />
            </>
        );
    }

    // Desktop Sidebar
    return (
        <aside
            className={`
                fixed ${isRTL ? 'right-0' : 'left-0'} top-0 h-screen 
                bg-[var(--bg-secondary)] 
                border-${isRTL ? 'l' : 'r'} border-[var(--border-primary)]
                flex flex-col
                transition-all duration-300 ease-out
                z-50
                ${collapsed ? 'w-20' : 'w-64'}
            `}
        >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--border-primary)]">
                <Link href="/admin" className="flex items-center gap-3">
                    <span className="text-3xl">🤖</span>
                    {!collapsed && (
                        <span className="font-bold text-xl text-[var(--text-primary)] animate-fadeIn">
                            {t('nav.aiAgentPlatform')}
                        </span>
                    )}
                </Link>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--bg-card)] transition-colors text-[var(--text-secondary)]"
                    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {collapsed ? (isRTL ? '←' : '→') : (isRTL ? '→' : '←')}
                </button>
            </div>

            {/* Language Toggle */}
            <div className="px-3 py-2 border-b border-[var(--border-primary)]">
                <button
                    onClick={toggleLanguage}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all ${collapsed ? 'justify-center' : ''}`}
                >
                    <span>🌐</span>
                    {!collapsed && (
                        <span className="text-sm">{language === 'ar' ? 'English' : 'العربية'}</span>
                    )}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 overflow-y-auto">
                <ul className="space-y-1 px-3">
                    {menuItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`
                                    flex items-center gap-3 px-3 py-2.5 rounded-xl
                                    transition-all duration-200
                                    group relative
                                    ${isActive(item)
                                        ? `bg-gradient-to-r ${isRTL ? 'from-pink-500/20 to-purple-500/20' : 'from-purple-500/20 to-pink-500/20'} text-[var(--primary)] border-${isRTL ? 'r' : 'l'}-4 border-purple-500`
                                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'
                                    }
                                `}
                                aria-current={isActive(item) ? 'page' : undefined}
                            >
                                <span className={`text-xl ${isActive(item) ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
                                    {item.icon}
                                </span>
                                {!collapsed && (
                                    <span className="font-medium animate-fadeIn">{t(item.labelKey)}</span>
                                )}
                                {/* Tooltip for collapsed */}
                                {collapsed && (
                                    <span className={`
                                        absolute ${isRTL ? 'right-full mr-2' : 'left-full ml-2'} px-2 py-1 
                                        bg-[var(--bg-tertiary)] text-[var(--text-primary)] 
                                        text-sm rounded-lg whitespace-nowrap
                                        opacity-0 group-hover:opacity-100
                                        transition-opacity duration-200
                                        pointer-events-none z-50
                                    `}>
                                        {t(item.labelKey)}
                                    </span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-[var(--border-primary)]">
                <button
                    onClick={handleLogout}
                    className={`
                        flex items-center gap-3 w-full px-3 py-2.5 rounded-xl
                        text-[var(--text-secondary)] hover:text-[var(--error)] hover:bg-red-500/10
                        transition-all duration-200
                        ${collapsed ? 'justify-center' : ''}
                    `}
                >
                    <span className="text-xl">🚪</span>
                    {!collapsed && <span className="font-medium">{t('common.logout')}</span>}
                </button>
            </div>
        </aside>
    );
}

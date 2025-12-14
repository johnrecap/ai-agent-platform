import Link from 'next/link';
import { useLanguage } from '@/lib/language';
import { ADMIN_MENU_ITEMS } from '@/constants/adminMenuItems';

/**
 * Mobile Sidebar Component
 * Mobile header + bottom navigation for small screens
 */
export default function MobileSidebar({ handleLogout, toggleLanguage, language, isActive }) {
    const { t } = useLanguage();

    return (
        <>
            {/* Mobile Header */}
            <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] flex items-center justify-between px-4 glass">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">🤖</span>
                    <span className="font-bold text-[var(--text-primary)]">
                        {t('nav.aiAgentPlatform')}
                    </span>
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
            <nav className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-[var(--bg-secondary)] border-t border-[var(--border-primary)] px-2 glass">
                <div className="flex items-center justify-around h-full">
                    {ADMIN_MENU_ITEMS.slice(0, 5).map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[60px] ${isActive(item)
                                    ? 'text-[var(--accent)] bg-[var(--accent)]/10'
                                    : 'text-[var(--text-secondary)]'
                                }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-[9px] font-medium">
                                {t(item.labelKey)}
                            </span>
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Spacers */}
            <div className="h-16" /> {/* Top spacer for header */}
            <div className="h-16" /> {/* Bottom spacer for nav */}
        </>
    );
}

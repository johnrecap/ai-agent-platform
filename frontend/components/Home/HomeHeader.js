import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { logout } from '@/lib/auth';

/**
 * Homepage Header Component
 * Navigation header with authentication and theme toggle
 */
export default function HomeHeader({ isScrolled, isRTL, language, onLanguageToggle, loggedIn, userIsAdmin }) {
    const handleLogout = () => {
        logout();
        window.location.reload();
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${isScrolled
                    ? 'border-[var(--role-border)] bg-[var(--role-surface)]/90 backdrop-blur-md shadow-lg'
                    : 'border-[var(--role-border)]/50 bg-[var(--role-surface)]/60 backdrop-blur-2xl'
                }`}
            style={{ boxShadow: isScrolled ? '0 4px 16px rgba(0, 0, 0, 0.1)' : 'none' }}
        >
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 interactive">
                    <div className="text-2xl">🤖</div>
                    <span className="font-bold text-[var(--role-text-primary)] bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                        AI Agent Platform
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    <ThemeToggle />

                    <button
                        onClick={onLanguageToggle}
                        className="px-3 py-1.5 text-sm bg-[var(--role-surface-elevated)] rounded-lg text-[var(--role-text-secondary)] hover:text-[var(--role-text-primary)] interactive"
                    >
                        {language === 'ar' ? 'EN' : 'ع'}
                    </button>

                    {loggedIn ? (
                        <div className="flex items-center gap-3">
                            {userIsAdmin && (
                                <Link
                                    href="/admin"
                                    className="text-sm text-[var(--role-text-secondary)] hover:text-[var(--role-accent)] interactive"
                                >
                                    {isRTL ? 'لوحة التحكم' : 'Admin'}
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm bg-[var(--role-accent)] text-white rounded-lg interactive"
                            >
                                {isRTL ? 'تسجيل الخروج' : 'Logout'}
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="px-4 py-2 text-sm bg-[var(--role-accent)] text-white rounded-lg interactive"
                        >
                            {isRTL ? 'تسجيل الدخول' : 'Login'}
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

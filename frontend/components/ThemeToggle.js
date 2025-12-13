'use client';

/**
 * Theme Toggle Component
 * AI Agent Platform - Dark/Light Mode Toggle
 */

import { useTheme } from '@/lib/ThemeContext';

export default function ThemeToggle({
    size = 'md',
    showLabel = false,
    className = ''
}) {
    const { theme, toggleTheme } = useTheme();

    const sizeClasses = {
        sm: 'w-8 h-8 text-lg',
        md: 'w-10 h-10 text-xl',
        lg: 'w-12 h-12 text-2xl',
    };

    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className={`
        ${sizeClasses[size]}
        flex items-center justify-center gap-2
        bg-[var(--bg-card)] 
        hover:bg-[var(--bg-card-hover)]
        border border-[var(--border-primary)]
        rounded-lg
        transition-all duration-200
        ${className}
      `}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <span
                className="transition-transform duration-300"
                style={{
                    transform: isDark ? 'rotate(0deg)' : 'rotate(180deg)',
                }}
            >
                {isDark ? '🌙' : '☀️'}
            </span>
            {showLabel && (
                <span className="text-sm font-medium text-[var(--text-primary)]">
                    {isDark ? 'Dark' : 'Light'}
                </span>
            )}
        </button>
    );
}

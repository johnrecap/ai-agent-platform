'use client';

/**
 * Theme Toggle Component
 * AI Agent Platform - Dark/Light Mode Toggle
 * Features:
 * - Expanding circle transition animation
 * - Smooth theme switching
 * - Icon rotation
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

    const handleThemeToggle = (e) => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Create expanding circle overlay
        const overlay = document.createElement('div');
        overlay.className = 'theme-transition-overlay';
        overlay.style.cssText = `
            position: fixed;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: ${isDark ? '#F8FAFC' : '#0A0A0F'};
            left: ${centerX}px;
            top: ${centerY}px;
            transform: translate(-50%, -50%);
            z-index: 9999;
            pointer-events: none;
            transition: width 600ms cubic-bezier(0.16, 1, 0.3, 1),
                        height 600ms cubic-bezier(0.16, 1, 0.3, 1),
                        opacity 200ms 400ms;
        `;

        document.body.appendChild(overlay);

        // Expand circle
        requestAnimationFrame(() => {
            overlay.style.width = '200vw';
            overlay.style.height = '200vw';
        });

        // Switch theme after 300ms
        setTimeout(() => {
            toggleTheme();
            overlay.style.opacity = '0';
        }, 300);

        // Remove overlay after animation
        setTimeout(() => {
            overlay.remove();
        }, 1000);
    };

    return (
        <button
            onClick={handleThemeToggle}
            className={`
        ${sizeClasses[size]}
        flex items-center justify-center gap-2
        bg-[var(--bg-card)] 
        hover:bg-[var(--bg-card-hover)]
        border border-[var(--border-primary)]
        rounded-lg
        transition-all duration-200
        hover:scale-105
        active:scale-95
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

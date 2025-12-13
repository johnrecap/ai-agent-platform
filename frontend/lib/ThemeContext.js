'use client';

/**
 * Theme Context Provider
 * AI Agent Platform - Global Dark/Light Mode
 */

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
    theme: 'dark',
    setTheme: () => { },
    toggleTheme: () => { },
});

export function ThemeProvider({ children }) {
    // Lazy initialization - only runs once on mount
    const [theme, setThemeState] = useState(() => {
        if (typeof window === 'undefined') return 'dark';

        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'dark';
    });

    const [mounted, setMounted] = useState(false);

    // Apply theme to DOM synchronously on mount
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        // Set mounted after DOM update
        if (!mounted) {
            setMounted(true);
        }
    }, [theme, mounted]);

    const setTheme = (newTheme) => {
        setThemeState(newTheme);

        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newTheme);
        }
    };

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    // Prevent flash during SSR
    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}

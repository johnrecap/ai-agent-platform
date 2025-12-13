'use client';

/**
 * Motion Context Provider
 * Manages reduced motion preferences for accessibility
 */

import { createContext, useContext, useState, useEffect } from 'react';

const MotionContext = createContext({
    reducedMotion: false,
    setReducedMotion: () => { }
});

export function MotionProvider({ children }) {
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        // Check OS preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mediaQuery.matches);

        // Listen for changes
        const handleChange = (e) => setReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <MotionContext.Provider value={{ reducedMotion, setReducedMotion }}>
            {children}
        </MotionContext.Provider>
    );
}

export const useMotion = () => useContext(MotionContext);

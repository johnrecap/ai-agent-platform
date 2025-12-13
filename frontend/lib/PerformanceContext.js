'use client';

/**
 * Performance Monitor
 * Adapts animation budget based on device capability
 */

import { createContext, useContext, useState, useEffect } from 'react';

const PerformanceContext = createContext({
    animationBudget: 'full', // 'full' | 'reduced' | 'none'
});

export function PerformanceProvider({ children }) {
    const [animationBudget, setAnimationBudget] = useState('full');

    useEffect(() => {
        //  Detect device capability
        const isLowEnd =
            (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) ||
            (navigator.deviceMemory && navigator.deviceMemory < 4);

        if (isLowEnd) {
            setAnimationBudget('reduced');
        }

        // Handle tab visibility
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setAnimationBudget('none');
            } else {
                setAnimationBudget(isLowEnd ? 'reduced' : 'full');
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    return (
        <PerformanceContext.Provider value={{ animationBudget }}>
            {children}
        </PerformanceContext.Provider>
    );
}

export const usePerformance = () => useContext(PerformanceContext);

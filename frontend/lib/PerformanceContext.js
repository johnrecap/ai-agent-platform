'use client';

/**
 * Performance Monitor
 * Adapts animation budget based on device capability
 * Features:
 * - Device tier detection (high/medium/low)
 * - Particle count adjustment
 * - Tab visibility handling
 * - Animation budget system
 */

import { createContext, useContext, useState, useEffect } from 'react';

const PerformanceContext = createContext({
    animationBudget: 'full', // 'full' | 'reduced' | 'none'
    deviceTier: 'high', // 'high' | 'medium' | 'low'
    particleCount: 30,
});

export function PerformanceProvider({ children }) {
    const [animationBudget, setAnimationBudget] = useState('full');
    const [deviceTier, setDeviceTier] = useState('high');
    const [particleCount, setParticleCount] = useState(30);

    useEffect(() => {
        // Detect device tier
        const cores = navigator.hardwareConcurrency || 2;
        const memory = navigator.deviceMemory || 4;

        let tier = 'high';
        let particles = 30;

        if (cores < 4 || memory < 4) {
            tier = 'low';
            particles = 5;
            setAnimationBudget('reduced');
        } else if (cores < 8 || memory < 8) {
            tier = 'medium';
            particles = 12;
        }

        setDeviceTier(tier);
        setParticleCount(particles);

        // Handle tab visibility - pause animations when tab hidden
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setAnimationBudget('none');
            } else {
                setAnimationBudget(tier === 'low' ? 'reduced' : 'full');
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    return (
        <PerformanceContext.Provider value={{ animationBudget, deviceTier, particleCount }}>
            {children}
        </PerformanceContext.Provider>
    );
}

export const usePerformance = () => useContext(PerformanceContext);

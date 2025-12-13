'use client';

/**
 * ScrollProgressBar Component
 * Progress bar showing scroll position with velocity-based glow
 * Spec: ultimate_design_spec.md
 */

import { useEffect, useState, useRef } from 'react';

export default function ScrollProgressBar() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [glowIntensity, setGlowIntensity] = useState(0);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            // Calculate scroll percentage
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / scrollHeight) * 100;
            setScrollProgress(Math.min(scrolled, 100));

            // Calculate scroll velocity for glow effect
            const velocity = Math.abs(window.scrollY - lastScrollY.current);
            const glow = Math.min(velocity / 2, 20);
            setGlowIntensity(glow);
            lastScrollY.current = window.scrollY;

            // Fade out glow after scroll stops
            setTimeout(() => setGlowIntensity(0), 100);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className="scroll-progress-bar"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '3px',
                width: `${scrollProgress}%`,
                background: 'linear-gradient(90deg, #A855F7, #EC4899)',
                zIndex: 1001,
                transition: 'width 0.1s ease-out, filter 0.15s ease-out',
                filter: `drop-shadow(0 0 ${glowIntensity}px #A855F7)`,
                pointerEvents: 'none',
            }}
        />
    );
}

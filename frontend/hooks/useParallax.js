'use client';

/**
 * useParallax Hook
 * Multi-speed scrolling effect for layered elements
 * Features:
 * - Different scroll speeds for layers
 * - RequestAnimationFrame throttling
 * - Performance optimized
 * - Reduced motion support
 */

import { useEffect, useRef } from 'react';

export default function useParallax(speed = 0.5) {
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        let ticking = false;
        let scrollY = window.scrollY;

        const updateParallax = () => {
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const elementHeight = rect.height;
            const viewportHeight = window.innerHeight;

            // Only apply parallax when element is in/near viewport
            if (scrollY + viewportHeight > elementTop && scrollY < elementTop + elementHeight + viewportHeight) {
                const offset = (scrollY - elementTop) * speed;
                element.style.transform = `translateY(${offset}px)`;
            }

            ticking = false;
        };

        const handleScroll = () => {
            scrollY = window.scrollY;

            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        // Initial update
        updateParallax();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return elementRef;
}

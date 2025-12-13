'use client';

import { useEffect, useRef } from 'react';

/**
 * ScrollReveal Component
 * Wrapper that reveals children when scrolling into view
 * Features:
 * - Intersection Observer API
 * - Fade + slide animations
 * - Stagger delay support
 * - Respects prefers-reduced-motion
 */

export default function ScrollReveal({
    children,
    className = '',
    direction = 'up', // 'up', 'down', 'left', 'right'
    delay = 0,
    threshold = 0.1,
    ...props
}) {
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'none';
            return;
        }

        // Set initial state
        element.style.opacity = '0';
        element.style.transition = `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`;

        // Set initial transform based on direction
        const transforms = {
            up: 'translateY(30px)',
            down: 'translateY(-30px)',
            left: 'translateX(30px)',
            right: 'translateX(-30px)'
        };
        element.style.transform = transforms[direction] || transforms.up;

        // Create intersection observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        element.style.opacity = '1';
                        element.style.transform = 'translate(0, 0)';
                        observer.unobserve(element);
                    }
                });
            },
            { threshold, rootMargin: '0px 0px -50px 0px' }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [direction, delay, threshold]);

    return (
        <div ref={elementRef} className={className} {...props}>
            {children}
        </div>
    );
}

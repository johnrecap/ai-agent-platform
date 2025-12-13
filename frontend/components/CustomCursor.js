'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * CustomCursor Component
 * Two-circle cursor system that follows the mouse
 * Features:
 * - Small border circle (8px)
 * - Large filled circle (40px)
 * - Smooth following with trailing effect
 * - Primary color theme
 * - Hidden on mobile/touch devices
 */

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isVisible, setIsVisible] = useState(false);
    const smallCursorRef = useRef(null);
    const bigCursorRef = useRef(null);
    const requestRef = useRef(null);
    const targetPosition = useRef({ x: -100, y: -100 });

    useEffect(() => {
        // Check if touch device
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        setIsVisible(true);

        const handleMouseMove = (e) => {
            targetPosition.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        // Smooth animation loop
        const animate = () => {
            setPosition((prev) => {
                const dx = targetPosition.current.x - prev.x;
                const dy = targetPosition.current.y - prev.y;

                // Smooth easing
                return {
                    x: prev.x + dx * 0.15,
                    y: prev.y + dy * 0.15
                };
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        animate();

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {/* Small cursor - border only */}
            <div
                ref={smallCursorRef}
                className="fixed w-2 h-2 border-2 border-purple-400 rounded-full pointer-events-none z-[9999] transition-opacity duration-300"
                style={{
                    left: `${targetPosition.current.x}px`,
                    top: `${targetPosition.current.y}px`,
                    transform: 'translate(-50%, -50%)',
                    opacity: isVisible ? 1 : 0
                }}
            />

            {/* Big cursor - filled with opacity */}
            <div
                ref={bigCursorRef}
                className="fixed w-10 h-10 bg-purple-400/20 rounded-full pointer-events-none z-[9998] transition-opacity duration-300"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: 'translate(-50%, -50%)',
                    opacity: isVisible ? 1 : 0
                }}
            />
        </>
    );
}

'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * ParallaxOrbs Component
 * Large semi-transparent circles with parallax mouse follow
 * Features:
 * - 3-4 large orbs (200-400px diameter)
 * - Follow mouse with parallax offset
 * - Blur effect and opacity
 * - Smooth easing transitions
 */

export default function ParallaxOrbs() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const requestRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Debounce using RAF
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }

            requestRef.current = requestAnimationFrame(() => {
                setMousePosition({ x: e.clientX, y: e.clientY });
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    // Calculate parallax offset based on mouse position
    const calculateOffset = (factor) => {
        if (typeof window === 'undefined') return { x: 0, y: 0 };

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const offsetX = (mousePosition.x - centerX) * factor;
        const offsetY = (mousePosition.y - centerY) * factor;
        return { x: offsetX, y: offsetY };
    };

    const orbs = [
        {
            size: 400,
            color: 'rgba(139, 92, 246, 0.15)', // Purple
            initialX: '20%',
            initialY: '30%',
            factor: 0.03
        },
        {
            size: 300,
            color: 'rgba(236, 72, 153, 0.15)', // Pink
            initialX: '70%',
            initialY: '20%',
            factor: 0.05
        },
        {
            size: 350,
            color: 'rgba(6, 182, 212, 0.15)', // Cyan
            initialX: '80%',
            initialY: '60%',
            factor: 0.04
        }
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {orbs.map((orb, index) => {
                const offset = calculateOffset(orb.factor);
                return (
                    <div
                        key={index}
                        className="absolute rounded-full transition-transform duration-300 ease-out"
                        style={{
                            width: `${orb.size}px`,
                            height: `${orb.size}px`,
                            background: orb.color,
                            left: orb.initialX,
                            top: orb.initialY,
                            transform: `translate(${offset.x}px, ${offset.y}px)`,
                            filter: 'blur(60px)',
                            willChange: 'transform'
                        }}
                    />
                );
            })}
        </div>
    );
}

'use client';

import { useEffect, useRef } from 'react';
import { usePerformance } from '@/lib/PerformanceContext';

/**
 * ParticleSystem Component
 * Creates floating particles in the background
 * Features:
 * - Dynamic particle count based on device performance
 * - Random sizes, positions, colors
 * - Smooth 60fps animation via RAF
 * - Mobile optimized
 * - Tab visibility handling
 */

export default function ParticleSystem({ count: propCount }) {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animationFrameRef = useRef(null);
    const { particleCount: contextCount, animationBudget } = usePerformance();

    // Use prop count if provided, otherwise use context-based count
    const baseCount = propCount || contextCount || 15;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Don't animate if budget is 'none' (tab hidden)
        if (animationBudget === 'none') {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            return;
        }

        const ctx = canvas.getContext('2d');

        // Set canvas size with DPI awareness but lower resolution for mobile
        const resizeCanvas = () => {
            const isMobile = window.innerWidth < 768;
            const dpr = isMobile ? 1 : window.devicePixelRatio; // Force 1x on mobile for performance
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            // Scale context to ensure correct size
            ctx.scale(dpr, dpr);
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Adjust particle count for mobile and performance
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? Math.min(baseCount, 8) : baseCount;

        // Initialize particles
        const colors = ['#8B5CF6', '#EC4899', '#06B6D4', '#A78BFA'];
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 4 + 2,
            speedY: Math.random() * 0.5 + 0.2,
            speedX: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.4 + 0.3,
            color: colors[Math.floor(Math.random() * colors.length)]
        }));

        let lastTime = 0;
        const targetFPS = isMobile ? 30 : 60; // Cap at 30fps strictly for mobile
        const frameInterval = 1000 / targetFPS;

        // Animation loop with throttle
        const animate = (timestamp) => {
            if (!lastTime) lastTime = timestamp;
            const deltaTime = timestamp - lastTime;

            if (deltaTime >= frameInterval) {
                lastTime = timestamp - (deltaTime % frameInterval);

                ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

                particlesRef.current.forEach(particle => {
                    // Update position
                    particle.y -= particle.speedY;
                    particle.x += particle.speedX;

                    // Reset particle when it goes off screen
                    if (particle.y < -10) {
                        particle.y = window.innerHeight + 10;
                        particle.x = Math.random() * window.innerWidth;
                    }
                    if (particle.x < -10 || particle.x > window.innerWidth + 10) {
                        particle.x = Math.random() * window.innerWidth;
                    }

                    // Draw particle
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color;
                    ctx.globalAlpha = particle.opacity;
                    ctx.fill();
                });

                ctx.globalAlpha = 1;
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [baseCount, animationBudget]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.6 }}
        />
    );
}

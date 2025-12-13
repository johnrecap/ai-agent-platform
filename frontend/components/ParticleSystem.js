'use client';

import { useEffect, useRef } from 'react';

/**
 * ParticleSystem Component
 * Creates floating particles in the background
 * Features:
 * - 20-50 particles (responsive)
 * - Random sizes, positions, colors
 * - Smooth 60fps animation via RAF
 * - Mobile optimized
 */

export default function ParticleSystem({ count = 30 }) {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Adjust particle count for mobile
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? Math.floor(count / 2) : count;

        // Initialize particles
        const colors = ['#8B5CF6', '#EC4899', '#06B6D4', '#A78BFA'];
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 4 + 2,
            speedY: Math.random() * 0.5 + 0.2,
            speedX: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.4 + 0.3,
            color: colors[Math.floor(Math.random() * colors.length)]
        }));

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach(particle => {
                // Update position
                particle.y -= particle.speedY;
                particle.x += particle.speedX;

                // Reset particle when it goes off screen
                if (particle.y < -10) {
                    particle.y = canvas.height + 10;
                    particle.x = Math.random() * canvas.width;
                }
                if (particle.x < -10 || particle.x > canvas.width + 10) {
                    particle.x = Math.random() * canvas.width;
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.opacity;
                ctx.fill();
            });

            ctx.globalAlpha = 1;
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [count]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.6 }}
        />
    );
}

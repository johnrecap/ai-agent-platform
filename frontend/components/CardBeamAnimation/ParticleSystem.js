'use client';

/**
 * Particle System Component
 * Uses Three.js for animated background particles
 */

import { useEffect, useRef } from 'react';

export default function ParticleSystem() {
    const canvasRef = useRef(null);
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const particlesRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Dynamically import Three.js
        import('three').then((THREE) => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            // Setup scene
            const scene = new THREE.Scene();
            sceneRef.current = scene;

            // Setup camera  
            const camera = new THREE.OrthographicCamera(
                -window.innerWidth / 2,
                window.innerWidth / 2,
                125,
                -125,
                1,
                1000
            );
            camera.position.z = 100;

            // Setup renderer
            const renderer = new THREE.WebGLRenderer({
                canvas,
                alpha: true,
                antialias: true
            });
            renderer.setSize(window.innerWidth, 250);
            renderer.setClearColor(0x000000, 0);
            rendererRef.current = renderer;

            // Create particles
            const particleCount = 400;
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const velocities = new Float32Array(particleCount);

            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] = (Math.random() - 0.5) * window.innerWidth * 2;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
                positions[i * 3 + 2] = 0;
                velocities[i] = Math.random() * 60 + 30;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            const material = new THREE.PointsMaterial({
                color: 0x8888ff,
                size: 3,
                transparent: true,
                opacity: 0.6
            });

            const particles = new THREE.Points(geometry, material);
            scene.add(particles);
            particlesRef.current = particles;

            const velocitiesArray = velocities;

            // Animation loop
            let animationId;
            const animate = () => {
                animationId = requestAnimationFrame(animate);

                if (particles) {
                    const positions = particles.geometry.attributes.position.array;

                    for (let i = 0; i < particleCount; i++) {
                        positions[i * 3] += velocitiesArray[i] * 0.016;

                        if (positions[i * 3] > window.innerWidth / 2 + 100) {
                            positions[i * 3] = -window.innerWidth / 2 - 100;
                            positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
                        }
                    }

                    particles.geometry.attributes.position.needsUpdate = true;
                }

                renderer.render(scene, camera);
            };

            animate();

            // Cleanup
            return () => {
                if (animationId) cancelAnimationFrame(animationId);
                if (renderer) renderer.dispose();
                if (geometry) geometry.dispose();
                if (material) material.dispose();
            };
        });
    }, []);

    return <canvas ref={canvasRef} className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[250px] z-0 pointer-events-none" />;
}

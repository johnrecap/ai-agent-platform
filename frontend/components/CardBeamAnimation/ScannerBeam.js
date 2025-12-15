'use client';

/**
 * Scanner Beam Component
 * Canvas-based vertical scanner beam effect
 */

import { useEffect, useRef } from 'react';

export default function ScannerBeam({ isScanning }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = 300;

        const scannerX = window.innerWidth / 2;
        const scannerWidth = 4;

        let animationId;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (isScanning) {
                // Draw scanner beam
                const gradient = ctx.createLinearGradient(
                    scannerX,
                    0,
                    scannerX,
                    canvas.height
                );
                gradient.addColorStop(0, 'transparent');
                gradient.addColorStop(0.3, 'rgba(0, 255, 255, 0.8)');
                gradient.addColorStop(0.5, 'rgba(0, 255, 255, 1)');
                gradient.addColorStop(0.7, 'rgba(0, 255, 255, 0.8)');
                gradient.addColorStop(1, 'transparent');

                ctx.fillStyle = gradient;
                ctx.fillRect(scannerX - scannerWidth / 2, 0, scannerWidth, canvas.height);

                // Glow effect
                ctx.shadowBlur = 20;
                ctx.shadowColor = 'rgba(0, 255, 255, 0.8)';
                ctx.fillRect(scannerX - scannerWidth / 2, 0, scannerWidth, canvas.height);
                ctx.shadowBlur = 0;
            }

            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, [isScanning]);

    return <canvas ref={canvasRef} className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[300px] z-[15] pointer-events-none" />;
}

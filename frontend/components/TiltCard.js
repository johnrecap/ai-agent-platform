'use client';

import { useEffect, useRef } from 'react';

/**
 * TiltCard Component
 * Wrapper that adds 3D tilt effect to cards
 * Features:
 * - 3D rotation on hover
 * - Max 10 degrees rotation
 * - Smooth transitions
 * - Glare effect
 * - Disabled on mobile
 */

export default function TiltCard({ children, className = '', ...props }) {
    const tiltRef = useRef(null);

    useEffect(() => {
        const element = tiltRef.current;
        if (!element) return;

        // Check if it's a touch device
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        let VanillaTilt;

        // Dynamically import vanilla-tilt
        import('vanilla-tilt').then((module) => {
            VanillaTilt = module.default;

            VanillaTilt.init(element, {
                max: 10, // Max tilt rotation (degrees)
                speed: 400, // Speed of transition
                glare: true, // Enable glare effect
                'max-glare': 0.2, // Max glare opacity
                scale: 1.02, // Scale on hover
                perspective: 1000, // Perspective value
            });
        });

        return () => {
            if (element && element.vanillaTilt) {
                element.vanillaTilt.destroy();
            }
        };
    }, []);

    return (
        <div ref={tiltRef} className={className} {...props}>
            {children}
        </div>
    );
}

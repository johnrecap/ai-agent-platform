'use client';

import { useRef, useState, useEffect } from 'react';

/**
 * MagneticButton Component
 * Button that moves toward cursor when nearby
 * Features:
 * - Activates within 100px radius
 * - Smooth easing motion
 * - Returns to original position
 * - Optional shimmer effect
 * - Disabled on mobile
 */

export default function MagneticButton({
    children,
    className = '',
    shimmer = false,
    onClick,
    href,
    ...props
}) {
    const buttonRef = useRef(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        // Check if touch device
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const handleMouseMove = (e) => {
            const rect = button.getBoundingClientRect();
            const buttonCenterX = rect.left + rect.width / 2;
            const buttonCenterY = rect.top + rect.height / 2;

            const distanceX = e.clientX - buttonCenterX;
            const distanceY = e.clientY - buttonCenterY;
            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

            // Activate within 100px
            if (distance < 100) {
                const strength = Math.max(0, (100 - distance) / 100);
                const maxOffset = 20;

                setOffset({
                    x: (distanceX / distance) * strength * maxOffset,
                    y: (distanceY / distance) * strength * maxOffset
                });
                setIsHovering(true);
            } else {
                setOffset({ x: 0, y: 0 });
                setIsHovering(false);
            }
        };

        const handleMouseLeave = () => {
            setOffset({ x: 0, y: 0 });
            setIsHovering(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const shimmerClass = shimmer
        ? 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-shimmer'
        : '';

    const baseClass = `transition-all duration-300 ease-out ${shimmerClass} ${className}`;

    const style = {
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${isHovering ? 1.05 : 1})`,
    };

    if (href) {
        return (
            <a
                ref={buttonRef}
                href={href}
                className={baseClass}
                style={style}
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            className={baseClass}
            style={style}
            {...props}
        >
            {children}
        </button>
    );
}

'use client';

/**
 * ScrollIndicator Component
 * Animated mouse icon that indicates scrollable content
 * Spec: ultimate_design_spec.md
 */

import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/language';

export default function ScrollIndicator() {
    const { isRTL } = useLanguage();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Hide indicator after scrolling 100px
            if (window.scrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className="scroll-indicator"
            style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                zIndex: 10,
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.5s ease-out',
            }}
        >
            {/* Mouse Icon */}
            <div
                className="mouse-icon"
                style={{
                    width: '26px',
                    height: '40px',
                    border: '2px solid rgba(168, 85, 247, 0.6)',
                    borderRadius: '13px',
                    position: 'relative',
                    background: 'rgba(168, 85, 247, 0.05)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                <div
                    className="mouse-dot"
                    style={{
                        width: '4px',
                        height: '8px',
                        background: 'linear-gradient(180deg, #A855F7, #EC4899)',
                        borderRadius: '2px',
                        position: 'absolute',
                        left: '50%',
                        top: '8px',
                        transform: 'translateX(-50%)',
                        animation: 'mouse-bounce 2s ease-in-out infinite',
                    }}
                />
            </div>

            {/* Text Label */}
            <span
                style={{
                    fontSize: '12px',
                    color: 'var(--role-text-tertiary)',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                }}
            >
                {isRTL ? 'مرر للاستكشاف' : 'Scroll to explore'}
            </span>
        </div>
    );
}

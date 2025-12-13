'use client';

/**
 * PageTransition Component
 * Smooth route change transitions
 * Features:
 * - Slide-in overlay on navigation
 * - Gradient background (purple → pink)
 * - Loading spinner
 * - Slide-out on page load
 */

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }) {
    const pathname = usePathname();
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        // Trigger transition on route change
        setIsTransitioning(true);

        const timer = setTimeout(() => {
            setIsTransitioning(false);
        }, 600);

        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <>
            {/* Transition Overlay */}
            <div
                className={`fixed inset-0 z-[9999] pointer-events-none transition-all duration-600 ease-in-out ${isTransitioning
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-full opacity-0'
                    }`}
                style={{
                    background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
                }}
            >
                {isTransitioning && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>

            {/* Page Content */}
            <div
                className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'
                    }`}
            >
                {children}
            </div>
        </>
    );
}

'use client';

/**
 * TrustStrip Component
 * Displays verifiable metrics/proof points with animated counters
 * Features:
 * - Count-up animation on scroll into view
 * - IntersectionObserver trigger
 * - Easing function for smooth counting
 * - Number formatting (K, %, ms)
 */

import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Zap, Shield, Users } from 'lucide-react';

export default function TrustStrip({ isRTL = false }) {
    const [isVisible, setIsVisible] = useState(false);
    const [counts, setCounts] = useState([0, 0, 0, 0]);
    const stripRef = useRef(null);

    const metrics = [
        {
            icon: Shield,
            targetValue: 99.9,
            format: (val) => `${val.toFixed(1)}%`,
            label: isRTL ? 'وقت التشغيل' : 'Uptime SLA',
            color: 'text-green-400'
        },
        {
            icon: Zap,
            targetValue: 200,
            format: (val) => `<${Math.round(val)}ms`,
            label: isRTL ? 'وقت الاستجابة' : 'Response Time',
            color: 'text-yellow-400'
        },
        {
            icon: Users,
            targetValue: 50,
            format: (val) => `${Math.round(val)}K+`,
            label: isRTL ? 'رسالة يومياً' : 'Messages/day',
            color: 'text-blue-400'
        },
        {
            icon: TrendingUp,
            targetValue: 94,
            format: (val) => `${Math.round(val)}%`,
            label: isRTL ? 'رضا العملاء' : 'CSAT Score',
            color: 'text-purple-400'
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (stripRef.current) {
            observer.observe(stripRef.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 2000; // 2 seconds total
        const steps = 60; // 60fps
        const interval = duration / steps;

        metrics.forEach((metric, index) => {
            let currentStep = 0;

            const timer = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;

                // Easing function (ease-out)
                const eased = 1 - Math.pow(1 - progress, 3);
                const currentValue = metric.targetValue * eased;

                setCounts(prev => {
                    const newCounts = [...prev];
                    newCounts[index] = currentValue;
                    return newCounts;
                });

                if (currentStep >= steps) {
                    clearInterval(timer);
                    // Set final value
                    setCounts(prev => {
                        const newCounts = [...prev];
                        newCounts[index] = metric.targetValue;
                        return newCounts;
                    });
                }
            }, interval);
        });
    }, [isVisible]);

    return (
        <div ref={stripRef} className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {metrics.map((metric, index) => {
                const Icon = metric.icon;

                return (
                    <div
                        key={index}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[var(--role-surface)]/50 backdrop-blur-sm border border-[var(--role-border-subtle)] transition-all duration-300 hover:scale-105 hover:border-[var(--role-accent)]/30"
                        style={{
                            animationDelay: `${index * 100}ms`,
                        }}
                    >
                        <Icon className={`w-5 h-5 ${metric.color}`} aria-hidden="true" />
                        <div>
                            <div className="text-lg font-bold text-[var(--role-text-primary)] tabular-nums">
                                {metric.format(counts[index])}
                            </div>
                            <div className="text-xs text-[var(--role-text-secondary)]">
                                {metric.label}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

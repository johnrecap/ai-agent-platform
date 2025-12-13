'use client';

/**
 * TrustStrip Component
 * Displays verifiable metrics/proof points
 */

import { TrendingUp, Zap, Shield, Users } from 'lucide-react';

export default function TrustStrip({ isRTL = false }) {
    const metrics = [
        {
            icon: Shield,
            value: '99.9%',
            label: isRTL ? 'وقت التشغيل' : 'Uptime SLA',
            color: 'text-green-400'
        },
        {
            icon: Zap,
            value: '<200ms',
            label: isRTL ? 'وقت الاستجابة' : 'Response Time',
            color: 'text-yellow-400'
        },
        {
            icon: Users,
            value: '50K+',
            label: isRTL ? 'رسالة يومياً' : 'Messages/day',
            color: 'text-blue-400'
        },
        {
            icon: TrendingUp,
            value: '94%',
            label: isRTL ? 'رضا العملاء' : 'CSAT Score',
            color: 'text-purple-400'
        }
    ];

    return (
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {metrics.map((metric, index) => {
                const Icon = metric.icon;

                return (
                    <div
                        key={index}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[var(--role-surface)]/50 backdrop-blur-sm border border-[var(--role-border-subtle)]"
                    >
                        <Icon className={`w-5 h-5 ${metric.color}`} aria-hidden="true" />
                        <div>
                            <div className="text-lg font-bold text-[var(--role-text-primary)]">
                                {metric.value}
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

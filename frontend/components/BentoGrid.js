'use client';

import { MessageSquare, Zap, Shield, TrendingUp, Users, Clock } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

/**
 * BentoGrid Component
 * Modern bento-style grid layout with varying sizes
 * Features:
 * - Mixed card sizes (some span 2 cols/rows)
 * - Gradient backgrounds
 * - Icon displays
 * - Responsive layout
 */

export default function BentoGrid({ isRTL }) {
    const bentoItems = [
        {
            title: isRTL ? 'دردشة فورية 24/7' : 'Instant Chat 24/7',
            description: isRTL ? 'ردود فورية على مدار الساعة' : 'Instant responses around the clock',
            icon: MessageSquare,
            gradient: 'from-purple-500 to-pink-500',
            span: 'md:col-span-2'
        },
        {
            title: isRTL ? 'أداء فائق' : 'Lightning Fast',
            description: isRTL ? 'استجابة في أقل من ثانية' : 'Response in under 1 second',
            icon: Zap,
            gradient: 'from-cyan-500 to-blue-500',
            span: 'md:row-span-2'
        },
        {
            title: isRTL ? 'أمان متقدم' : 'Enterprise Security',
            description: isRTL ? 'تشفير من الدرجة العسكرية' : 'Military-grade encryption',
            icon: Shield,
            gradient: 'from-green-500 to-emerald-500',
            span: ''
        },
        {
            title: isRTL ? 'تحليلات ذكية' : 'Smart Analytics',
            description: isRTL ? 'رؤى عميقة مدعومة بالذكاء الاصطناعي' : 'AI-powered insights',
            icon: TrendingUp,
            gradient: 'from-orange-500 to-red-500',
            span: ''
        },
        {
            title: isRTL ? 'دعم متعدد اللغات' : 'Multi-Language',
            description: isRTL ? 'دعم أكثر من 50 لغة' : 'Support for 50+ languages',
            icon: Users,
            gradient: 'from-indigo-500 to-purple-500',
            span: 'md:col-span-2'
        },
        {
            title: isRTL ? 'وقت تشغيل 99.9%' : '99.9% Uptime',
            description: isRTL ? 'موثوقية على مدار الساعة' : 'Always-on reliability',
            icon: Clock,
            gradient: 'from-pink-500 to-rose-500',
            span: ''
        }
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 py-24">
            <ScrollReveal direction="up" className="text-center mb-16">
                <h2 className="text-h2 mb-4">
                    {isRTL ? 'مميزات قوية' : 'Powerful Features'}
                </h2>
                <p className="text-body text-[var(--role-text-secondary)] max-w-2xl mx-auto">
                    {isRTL
                        ? 'كل ما تحتاجه لتحويل تجربة العملاء'
                        : 'Everything you need to transform customer experience'
                    }
                </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
                {bentoItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <ScrollReveal
                            key={index}
                            direction="up"
                            delay={index * 100}
                            className={`group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${item.gradient} ${item.span} hover:scale-[1.02] transition-transform duration-300`}
                        >
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/90 text-sm">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </ScrollReveal>
                    );
                })}
            </div>
        </section>
    );
}

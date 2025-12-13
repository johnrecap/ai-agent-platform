'use client';

/**
 * Timeline Component  
 * How It Works - Step-by-step flow
 * Features:
 * - Numbered steps
 * - Connector lines with gradient
 * - Icon rotation on hover
 * - Responsive (vertical mobile, horizontal desktop)
 */

import { Sparkles, Settings, Rocket } from 'lucide-react';

export default function Timeline({ isRTL }) {
    const steps = [
        {
            number: 1,
            icon: Sparkles,
            title: isRTL ? 'إنشاء الوكيل' : 'Create Agent',
            description: isRTL
                ? 'أنشئ وكيل AI الخاص بك في دقائق. أضف معلومات عملك وحدد نطاق الردود.'
                : 'Create your AI agent in minutes. Add your business info and define response scope.',
        },
        {
            number: 2,
            icon: Settings,
            title: isRTL ? 'التخصيص' : 'Customize',
            description: isRTL
                ? 'خصص الألوان، الأيقونات، والرسائل. اجعله يتناسب مع هوية علامتك التجارية.'
                : 'Customize colors, icons, and messages. Make it match your brand identity.',
        },
        {
            number: 3,
            icon: Rocket,
            title: isRTL ? 'الإطلاق' : 'Launch',
            description: isRTL
                ? 'انسخ كود التضمين وألصقه في موقعك. ابدأ في استقبال المحادثات فوراً.'
                : 'Copy the embed code and paste it on your site. Start receiving conversations instantly.',
        },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4">
            {/* Desktop: Horizontal */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 relative">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <div key={index} className="relative">
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div
                                    className="absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-[var(--role-accent)] to-transparent opacity-20 transition-opacity duration-300 hover:opacity-40"
                                    style={{ zIndex: 0 }}
                                />
                            )}

                            {/* Step Card */}
                            <div className="relative z-10 p-6 rounded-2xl bg-[var(--role-surface)] border border-[var(--role-border)] hover:border-[var(--role-accent)] transition-all duration-300 hover:-translate-y-4 hover:shadow-[0_24px_48px_rgba(168,85,247,0.3)] group">
                                {/* Step Number */}
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl mb-4 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_24px_rgba(168,85,247,0.8)]">
                                    {step.number}
                                </div>

                                {/* Icon */}
                                <Icon className="w-8 h-8 text-[var(--role-accent)] mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />

                                {/* Content */}
                                <h4 className="text-xl font-bold text-[var(--role-text-primary)] mb-2">
                                    {step.title}
                                </h4>
                                <p className="text-[var(--role-text-secondary)] text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Mobile: Vertical */}
            <div className="md:hidden space-y-6">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <div key={index} className="relative">
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="absolute top-20 left-6 w-0.5 h-full bg-gradient-to-b from-[var(--role-accent)] to-transparent opacity-20" />
                            )}

                            {/* Step Card */}
                            <div className="relative z-10 p-6 rounded-2xl bg-[var(--role-surface)] border border-[var(--role-border)]">
                                <div className="flex items-start gap-4">
                                    {/* Step Number */}
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                                        {step.number}
                                    </div>

                                    <div className="flex-1">
                                        {/* Icon */}
                                        <Icon className="w-8 h-8 text-[var(--role-accent)] mb-3" />

                                        {/* Content */}
                                        <h4 className="text-lg font-bold text-[var(--role-text-primary)] mb-2">
                                            {step.title}
                                        </h4>
                                        <p className="text-[var(--role-text-secondary)] text-sm leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

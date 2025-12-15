import dynamic from 'next/dynamic';
import { Sparkles, ArrowRight } from 'lucide-react';
import useParallax from '@/hooks/useParallax';
import PersonalizationSwitcher from '@/components/PersonalizationSwitcher';
import MagneticButton from '@/components/MagneticButton';
import TypingText from '@/components/TypingText';
import TrustStrip from '@/components/TrustStrip';
import ScrollIndicator from '@/components/ScrollIndicator';

/**
 * Hero Section Component
 * Main landing section with personalization, headline, and CTA
 */
export default function HeroSection({ content, activeRole, onRoleChange, isRTL }) {
    const headlineRef = useParallax(0.2);
    const subheadRef = useParallax(0.15);
    const ctaRef = useParallax(0.1);

    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20 brand-grid overflow-hidden">

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto text-center">
                {/* Personalization Switcher */}
                <div className="flex justify-center">
                    <PersonalizationSwitcher onChange={onRoleChange} />
                </div>

                {/* Headline */}
                <div
                    ref={headlineRef}
                    className="relative z-20 mt-20 mb-16 pb-8 overflow-visible min-h-[160px] flex items-center justify-center"
                >
                    <div className="max-w-4xl mx-auto w-full">
                        <h1 className="text-h1 mb-0 leading-tight">
                            <TypingText
                                text={content.headline}
                                speed={50}
                                className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent inline-block"
                            />
                        </h1>
                    </div>
                </div>

                {/* Subheadline */}
                <p
                    ref={subheadRef}
                    className="text-h3 text-[var(--role-text-secondary)] mb-12 max-w-3xl mx-auto font-normal min-h-[84px] flex items-center justify-center"
                >
                    {content.subhead}
                </p>

                {/* CTA Button */}
                <div ref={ctaRef}>
                    <MagneticButton
                        href="/login"
                        shimmer={true}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg shadow-[var(--elevation-4)] hover:shadow-[var(--elevation-5)] group"
                    >
                        <Sparkles className="w-5 h-5" />
                        {content.cta}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-[var(--motion-micro-duration)]" />
                    </MagneticButton>
                </div>

                {/* Trust Strip */}
                <div className="mt-16">
                    <TrustStrip isRTL={isRTL} />
                </div>
            </div>

            {/* Scroll Indicator */}
            <ScrollIndicator />
        </section>
    );
}

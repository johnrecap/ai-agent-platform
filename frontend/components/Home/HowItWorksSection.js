import ScrollReveal from '@/components/ScrollReveal';
import Timeline from '@/components/Timeline';

/**
 * How It Works Section Component
 * Shows step-by-step timeline
 */
export default function HowItWorksSection({ isRTL }) {
    return (
        <ScrollReveal direction="up">
            <section className="max-w-7xl mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-h2 mb-4">
                        {isRTL ? 'كيف يعمل' : 'How It Works'}
                    </h2>
                    <p className="text-body text-[var(--role-text-secondary)] max-w-2xl mx-auto">
                        {isRTL
                            ? 'ثلاث خطوات بسيطة للبدء مع منصتنا'
                            : 'Three simple steps to get started with our platform'}
                    </p>
                </div>
                <Timeline isRTL={isRTL} />
            </section>
        </ScrollReveal>
    );
}

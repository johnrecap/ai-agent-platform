import { Sparkles, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import MagneticButton from '@/components/MagneticButton';

/**
 * Final CTA Section Component
 * Last call-to-action before footer
 */
export default function FinalCTASection({ isRTL }) {
    return (
        <ScrollReveal direction="up">
            <section className="max-w-5xl mx-auto px-4 py-24 text-center">
                <div className="p-12 rounded-3xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white">
                    <h2 className="text-h2 mb-4">
                        {isRTL ? 'جاهز للبدء؟' : 'Ready to Get Started?'}
                    </h2>
                    <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                        {isRTL
                            ? 'انضم إلى آلاف الشركات التي تستخدم منصتنا'
                            : 'Join thousands of businesses using our platform'}
                    </p>
                    <MagneticButton
                        href="/login"
                        shimmer={true}
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:scale-105 shadow-[var(--elevation-5)]"
                    >
                        <Sparkles className="w-5 h-5" />
                        {isRTL ? 'ابدأ الآن مجاناً' : 'Start Free Now'}
                        <ArrowRight className="w-5 h-5" />
                    </MagneticButton>
                </div>
            </section>
        </ScrollReveal>
    );
}

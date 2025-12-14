import ScrollReveal from '@/components/ScrollReveal';
import FAQAccordion from '@/components/FAQAccordion';
import { faqData } from '@/constants/home/faqData';

/**
 * FAQ Section Component
 * Frequently asked questions
 */
export default function FAQSection({ isRTL }) {
    // Format FAQ data for the accordion
    const faqItems = faqData.map(item => ({
        question: isRTL ? item.question_ar : item.question_en,
        answer: isRTL ? item.answer_ar : item.answer_en
    }));

    return (
        <ScrollReveal direction="up">
            <section className="max-w-7xl mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-h2 mb-4">
                        {isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                    </h2>
                    <p className="text-body text-[var(--role-text-secondary)] max-w-2xl mx-auto">
                        {isRTL
                            ? 'إجابات على الأسئلة الأكثر شيوعاً حول منصتنا'
                            : 'Answers to the most common questions about our platform'}
                    </p>
                </div>
                <FAQAccordion items={faqItems} />
            </section>
        </ScrollReveal>
    );
}

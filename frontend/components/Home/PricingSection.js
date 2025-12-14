import ScrollReveal from '@/components/ScrollReveal';
import PricingCard from '@/components/PricingCard';

/**
 * Pricing Section Component
 * Displays pricing plans with cards
 */
export default function PricingSection({ isRTL }) {
    const pricingPlans = [
        {
            tier: isRTL ? 'مجاني' : 'Free',
            price: isRTL ? 'مجاناً' : 'Free',
            description: isRTL ? 'للأفراد والمشاريع الصغيرة' : 'For individuals and small projects',
            features: isRTL ? [
                '1 وكيل AI',
                '100 محادثة/شهر',
                'دعم أساسي',
                'تخصيص محدود'
            ] : [
                '1 AI Agent',
                '100 conversations/month',
                'Basic support',
                'Limited customization'
            ],
            cta: isRTL ? 'ابدأ مجاناً' : 'Get Started',
            ctaLink: '/login',
            popular: false,
            delay: 0
        },
        {
            tier: isRTL ? 'احترافي' : 'Pro',
            price: isRTL ? '$29' : '$29',
            period: isRTL ? 'شهر' : 'month',
            description: isRTL ? 'للشركات النامية' : 'For growing businesses',
            features: isRTL ? [
                '5 وكلاء AI',
                '1,000 محادثة/شهر',
                'تخصيص كامل',
                'دعم أولوية',
                'تحليلات متقدمة',
                'رفع الشعار'
            ] : [
                '5 AI Agents',
                '1,000 conversations/month',
                'Full customization',
                'Priority support',
                'Advanced analytics',
                'Logo upload'
            ],
            cta: isRTL ? 'ابدأ الآن' : 'Start Now',
            ctaLink: '/login',
            popular: true,
            delay: 100
        },
        {
            tier: isRTL ? 'مؤسسات' : 'Enterprise',
            price: isRTL ? 'مخصص' : 'Custom',
            description: isRTL ? 'للمؤسسات الكبيرة' : 'For large organizations',
            features: isRTL ? [
                'وكلاء غير محدودة',
                'محادثات غير محدودة',
                'تخصيص كامل',
                'دعم مخصص 24/7',
                'SLA مضمون',
                'تدريب فريقك',
                'تكامل مخصص'
            ] : [
                'Unlimited AI Agents',
                'Unlimited conversations',
                'Full customization',
                'Dedicated support 24/7',
                'Guaranteed SLA',
                'Team training',
                'Custom integration'
            ],
            cta: isRTL ? 'تواصل معنا' : 'Contact Us',
            ctaLink: '/login',
            popular: false,
            delay: 200
        }
    ];

    return (
        <ScrollReveal direction="up">
            <section className="max-w-7xl mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-h2 mb-4">
                        {isRTL ? 'خطط الأسعار' : 'Pricing Plans'}
                    </h2>
                    <p className="text-body text-[var(--role-text-secondary)] max-w-2xl mx-auto">
                        {isRTL
                            ? 'اختر الخطة المناسبة لاحتياجات عملك'
                            : 'Choose the perfect plan for your business needs'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pricingPlans.map((plan, index) => (
                        <PricingCard
                            key={index}
                            tier={plan.tier}
                            price={plan.price}
                            period={plan.period}
                            description={plan.description}
                            features={plan.features}
                            cta={plan.cta}
                            ctaLink={plan.ctaLink}
                            popular={plan.popular}
                            delay={plan.delay}
                        />
                    ))}
                </div>
            </section>
        </ScrollReveal>
    );
}

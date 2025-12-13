'use client';

/**
 * LogoShowcase Component
 * Client logos grid with grayscale/color hover effect
 */

export default function LogoShowcase({ isRTL }) {
    const logos = [
        { name: 'Tech Corp', emoji: '🚀' },
        { name: 'AI Solutions', emoji: '🤖' },
        { name: 'Digital Hub', emoji: '💼' },
        { name: 'Cloud Systems', emoji: '☁️' },
        { name: 'Data Analytics', emoji: '📊' },
        { name: 'Smart Apps', emoji: '📱' },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
                <h3 className="text-h3 mb-3 text-[var(--role-text-primary)]">
                    {isRTL ? 'يثق بنا أكثر من 1000+ شركة' : 'Trusted by 1000+ Companies'}
                </h3>
                <p className="text-[var(--role-text-secondary)]">
                    {isRTL
                        ? 'شركات رائدة تستخدم منصتنا لتعزيز تفاعل العملاء'
                        : 'Leading companies use our platform to enhance customer engagement'
                    }
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {logos.map((logo, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center p-6 rounded-xl bg-[var(--role-surface)] border border-[var(--role-border)] transition-all duration-300 hover:border-[var(--role-accent)] hover:shadow-lg group"
                        style={{
                            filter: 'grayscale(100%)',
                            transition: 'filter 0.3s ease, transform 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.filter = 'grayscale(0%)';
                            e.currentTarget.style.transform = 'translateY(-4px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.filter = 'grayscale(100%)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <div className="text-5xl mb-2 group-hover:scale-110 transition-transform duration-300">
                            {logo.emoji}
                        </div>
                        <span className="text-sm font-medium text-[var(--role-text-secondary)] group-hover:text-[var(--role-text-primary)] transition-colors">
                            {logo.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

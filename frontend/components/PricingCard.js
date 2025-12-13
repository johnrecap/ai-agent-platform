'use client';

/**
 * PricingCard Component
 * Pricing tier card for landing page
 */

import Link from 'next/link';

export default function PricingCard({
    tier,
    price,
    period = 'month',
    description,
    features = [],
    cta = 'Get Started',
    ctaLink = '/login',
    popular = false,
    delay = 0
}) {
    return (
        <div
            className={`relative p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2 ${popular
                    ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500 shadow-lg shadow-purple-500/20'
                    : 'bg-[var(--bg-card)] border-[var(--border-primary)] hover:border-purple-500/30'
                }`}
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Popular Badge */}
            {popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                    🔥 MOST POPULAR
                </div>
            )}

            {/* Tier Name */}
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                {tier}
            </h3>

            {/* Description */}
            <p className="text-sm text-[var(--text-secondary)] mb-6">
                {description}
            </p>

            {/* Price */}
            <div className="mb-6">
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                        {price}
                    </span>
                    {price !== 'Free' && price !== 'Custom' && (
                        <span className="text-[var(--text-secondary)] text-sm">
                            /{period}
                        </span>
                    )}
                </div>
            </div>

            {/* Features List */}
            <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            {/* CTA Button */}
            <Link
                href={ctaLink}
                className={`block w-full py-3 px-6 rounded-xl text-center font-semibold transition-all ${popular
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 hover:scale-105'
                        : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-purple-500/20 hover:text-purple-400'
                    }`}
            >
                {cta}
            </Link>
        </div>
    );
}

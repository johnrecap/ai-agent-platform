'use client';

/**
 * LandingFeatureCard Component
 * Reusable feature card for landing page features section
 */

export default function LandingFeatureCard({ icon, title, description, delay = 0 }) {
    return (
        <div
            className="group p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1"
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Icon */}
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-purple-400 transition-colors">
                {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {description}
            </p>
        </div>
    );
}

import { TrendingUp } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import TiltCard from '@/components/TiltCard';
import { problemCards } from '@/constants/home/problemCards';

/**
 * Problem Solution Section Component
 * Shows problem → solution → result cards
 */
export default function ProblemSolutionSection({ isRTL }) {
    return (
        <ScrollReveal direction="up">
            <section className="max-w-7xl mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-h2 mb-4">
                        {isRTL ? 'كيف نحل مشاكلك' : 'How We Solve Your Problems'}
                    </h2>
                    <p className="text-body text-[var(--role-text-secondary)] max-w-2xl mx-auto">
                        {isRTL
                            ? 'حلول حقيقية لتحديات حقيقية. كل ميزة مبنية لحل مشكلة محددة.'
                            : 'Real solutions for real challenges. Every feature built to solve a specific problem.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {problemCards.map((card, index) => {
                        const Icon = card.icon;
                        const problem = isRTL ? card.problem_ar : card.problem_en;
                        const solution = isRTL ? card.solution_ar : card.solution_en;
                        const result = isRTL ? card.result_ar : card.result_en;
                        const metric = isRTL ? card.metric_ar : card.metric_en;

                        return (
                            <TiltCard
                                key={index}
                                className="p-8 rounded-2xl bg-[var(--role-surface)] border border-[var(--role-border)] group"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-[var(--motion-ui-duration)]">
                                    <Icon className={`w-7 h-7 ${card.iconColor}`} />
                                </div>

                                {/* Problem */}
                                <div className="mb-4">
                                    <div className="text-xs font-semibold text-[var(--color-error)] uppercase mb-2">
                                        {isRTL ? 'المشكلة' : 'Problem'}
                                    </div>
                                    <p className="text-sm text-[var(--role-text-secondary)]">{problem}</p>
                                </div>

                                {/* Solution */}
                                <div className="mb-4">
                                    <div className="text-xs font-semibold text-[var(--color-info)] uppercase mb-2">
                                        {isRTL ? 'الحل' : 'Solution'}
                                    </div>
                                    <p className="text-sm text-[var(--role-text-primary)]">{solution}</p>
                                </div>

                                {/* Result */}
                                <div className="mb-2">
                                    <div className="text-xs font-semibold text-[var(--color-success)] uppercase mb-2">
                                        {isRTL ? 'النتيجة' : 'Result'}
                                    </div>
                                    <p className="text-lg font-bold text-[var(--role-accent)]">{result}</p>
                                </div>

                                {/* Metric */}
                                <div className="pt-4 border-t border-[var(--role-border)]">
                                    <div className="flex items-center gap-2 text-sm text-[var(--role-text-secondary)]">
                                        <TrendingUp className="w-4 h-4 text-green-400" />
                                        {metric}
                                    </div>
                                </div>
                            </TiltCard>
                        );
                    })}
                </div>
            </section>
        </ScrollReveal>
    );
}

import { GradientButton } from '@/components/ui';

/**
 * Agents Page Header Component
 * Title, subtitle, and create button
 */
export default function AgentsHeader({ txt, onCreateClick }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                    🤖 {txt.title}
                </h1>
                <p className="text-[var(--text-secondary)]">
                    {txt.subtitle}
                </p>
            </div>
            <GradientButton onClick={onCreateClick}>
                {txt.createAgent}
            </GradientButton>
        </div>
    );
}

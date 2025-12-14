import { Skeleton } from '@/components/ui';
import AgentCard from './AgentCard';
import AgentsEmptyState from './AgentsEmptyState';

/**
 * Agents Grid Component
 * Displays loading, empty state, or grid of agent cards
 */
export default function AgentsGrid({
    loading,
    agents,
    txt,
    isRTL,
    onEdit,
    onDelete,
    onEmbed,
    onCreateClick
}) {
    // Loading skeleton
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-primary)]">
                        <Skeleton className="w-16 h-16 mb-4" variant="circular" />
                        <Skeleton className="w-32 h-6 mb-2" />
                        <Skeleton className="w-full h-4 mb-4" />
                        <Skeleton className="w-24 h-8" />
                    </div>
                ))}
            </div>
        );
    }

    // Empty state
    if (agents.length === 0) {
        return (
            <AgentsEmptyState
                txt={txt}
                onCreateClick={onCreateClick}
            />
        );
    }

    // Agents grid
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, index) => (
                <AgentCard
                    key={agent.id}
                    agent={agent}
                    index={index}
                    txt={txt}
                    isRTL={isRTL}
                    onEdit={() => onEdit(agent)}
                    onDelete={() => onDelete(agent.id)}
                    onEmbed={() => onEmbed(agent)}
                />
            ))}
        </div>
    );
}

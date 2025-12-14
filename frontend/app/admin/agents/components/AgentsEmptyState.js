import { EmptyState } from '@/components/ui';

/**
 * Agents Empty State Component  
 * Shown when no agents exist
 */
export default function AgentsEmptyState({ txt, onCreateClick }) {
    return (
        <EmptyState
            icon="🤖"
            title={txt.noAgents}
            description={txt.createFirst}
            action
            actionLabel={txt.createAgent}
            onAction={onCreateClick}
        />
    );
}

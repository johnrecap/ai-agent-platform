import Image from 'next/image';
import { GlassCard, StatusBadge, IconButton } from '@/components/ui';

/**
 * Agent Card Component
 * Individual agent card with actions
 */
export default function AgentCard({
    agent,
    index,
    txt,
    isRTL,
    onEdit,
    onDelete,
    onEmbed
}) {
    return (
        <GlassCard
            className="p-6 group animate-fadeInUp"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl text-white group-hover:scale-110 transition-transform">
                    {agent.avatar_url ? (
                        <Image
                            src={agent.avatar_url}
                            alt={agent.agent_name}
                            width={56}
                            height={56}
                            className="object-cover"
                        />
                    ) : (
                        '🤖'
                    )}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <IconButton
                        size="sm"
                        variant="secondary"
                        onClick={onEmbed}
                        title={txt.embed}
                    >
                        &lt;/&gt;
                    </IconButton>
                    <IconButton
                        size="sm"
                        onClick={onEdit}
                        aria-label="Edit agent"
                    >
                        ✏️
                    </IconButton>
                    <IconButton
                        size="sm"
                        variant="danger"
                        onClick={onDelete}
                        aria-label="Delete agent"
                    >
                        🗑️
                    </IconButton>
                </div>
            </div>

            {/* Info */}
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                {agent.agent_name}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                {agent.page_title || txt.noDesc}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-primary)]">
                <StatusBadge status="online" label={txt.active} />
                <a
                    href={`/agent/${agent.id}`}
                    target="_blank"
                    className="text-sm text-[var(--primary)] hover:underline"
                >
                    {txt.view} {isRTL ? '←' : '→'}
                </a>
            </div>
        </GlassCard>
    );
}

'use client';

/**
 * Agent Card Component
 * AI Agent Hosting Platform
 */

import Link from 'next/link';

export default function AgentCard({ agent }) {
    return (
        <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
            {/* Header with gradient */}
            <div className="h-24 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 relative">
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-4 left-4">
                    <span className="text-4xl">🤖</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {agent.agent_name}
                </h3>

                {agent.page_title && agent.page_title !== agent.agent_name && (
                    <p className="text-sm text-gray-500 mb-2">{agent.page_title}</p>
                )}

                {agent.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {agent.description}
                    </p>
                )}

                {/* Status badge */}
                <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${agent.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                        {agent.status === 'active' ? '🟢 Active' : '⚫ Inactive'}
                    </span>
                </div>

                {/* Action button */}
                <Link
                    href={`/agent/${agent.id}`}
                    className="block w-full py-2.5 text-center text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                >
                    Chat with Agent →
                </Link>
            </div>
        </div>
    );
}

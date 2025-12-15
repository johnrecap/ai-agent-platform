'use client';

import React from 'react';
import { getAssignedAgentsCount, getAssignmentBadgeColor } from '@/lib/userAgentUtils';

/**
 * Agent Assignment Section Component
 * For User Form - shows checkboxes to assign agents
 */
const AgentAssignmentSection = ({
    agents,
    selectedAgentIds = [],
    onChange,
    language = 'en'
}) => {
    const txt = {
        en: {
            assignedAgents: 'Assigned Agents',
            selectAgents: 'Select agents to assign to this user',
            noAgents: 'No agents available',
            search: 'Search agents...'
        },
        ar: {
            assignedAgents: 'البوتات المخصصة',
            selectAgents: 'اختر البوتات لتخصيصها لهذا المستخدم',
            noAgents: 'لا توجد بوتات متاحة',
            search: 'بحث عن البوتات...'
        }
    };

    const t = (key) => txt[language]?.[key] || txt.en[key];

    const [searchQuery, setSearchQuery] = React.useState('');

    const filteredAgents = agents.filter(agent =>
        agent.agent_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleToggle = (agentId) => {
        const newIds = selectedAgentIds.includes(agentId)
            ? selectedAgentIds.filter(id => id !== agentId)
            : [...selectedAgentIds, agentId];
        onChange(newIds);
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-[var(--text-secondary)]">
                {t('assignedAgents')} ({selectedAgentIds.length})
            </label>
            <p className="text-xs text-[var(--text-tertiary)]">
                {t('selectAgents')}
            </p>

            {/* Search */}
            {agents.length > 5 && (
                <input
                    type="text"
                    placeholder={t('search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)]"
                />
            )}

            {/* Agents List */}
            <div className="max-h-48 overflow-y-auto bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-lg p-3 space-y-2">
                {filteredAgents.length === 0 ? (
                    <p className="text-sm text-[var(--text-muted)] text-center py-4">
                        {agents.length === 0 ? t('noAgents') : 'No matching agents'}
                    </p>
                ) : (
                    filteredAgents.map((agent) => (
                        <label
                            key={agent.id}
                            className="flex items-center gap-3 cursor-pointer hover:bg-[var(--bg-card)] p-2 rounded-lg transition-colors group"
                        >
                            <input
                                type="checkbox"
                                checked={selectedAgentIds.includes(agent.id)}
                                onChange={() => handleToggle(agent.id)}
                                className="w-4 h-4 accent-purple-500 cursor-pointer"
                            />
                            <span className="text-[var(--text-primary)] text-sm flex-1 group-hover:text-purple-400 transition-colors">
                                {agent.agent_name}
                            </span>
                        </label>
                    ))
                )}
            </div>
        </div>
    );
};

export default AgentAssignmentSection;

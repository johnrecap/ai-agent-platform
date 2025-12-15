'use client';

import React from 'react';
import { getAssignedAgentsCount } from '@/lib/userAgentUtils';

/**
 * User Profile Header Component
 * Shows user info with assigned agents
 */
const UserProfileHeader = ({ user, language = 'en' }) => {
    const txt = {
        en: { admin: 'Admin', user: 'User', assignedAgents: 'Assigned Agents', noAgents: 'No agents assigned' },
        ar: { admin: 'مسؤول', user: 'مستخدم', assignedAgents: 'البوتات المخصصة', noAgents: 'لا توجد بوتات' }
    };

    const t = (key) => txt[language]?.[key] || txt.en[key];

    if (!user) return null;

    const agentsCount = getAssignedAgentsCount(user);

    return (
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl text-white font-bold shrink-0">
                    {user.name?.charAt(0).toUpperCase() || '?'}
                </div>

                {/* User Info */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                            {user.name}
                        </h1>
                        <span className={`px-3 py-1 text-xs rounded-full border ${user.role === 'admin'
                                ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                                : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            }`}>
                            {user.role === 'admin' ? t('admin') : t('user')}
                        </span>
                    </div>

                    <p className="text-[var(--text-secondary)] mb-3">
                        ✉️ {user.email}
                    </p>

                    {/* Assigned Agents */}
                    {agentsCount > 0 ? (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-[var(--text-secondary)]">
                                {t('assignedAgents')}:
                            </span>
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-medium">
                                🤖 {agentsCount}
                            </span>
                        </div>
                    ) : (
                        <p className="text-sm text-[var(--text-tertiary)]">
                            {t('noAgents')}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfileHeader;

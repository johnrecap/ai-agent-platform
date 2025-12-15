'use client';

import React from 'react';
import { getAssignedAgentsCount, getAssignmentBadgeColor, formatAgentsList } from '@/lib/userAgentUtils';

/**
 * Enhanced User Card Component
 * Shows user info with assigned agents preview
 */
const UserCard = ({
    user,
    onEdit,
    onDelete,
    onViewConversations,
    language = 'en'
}) => {
    const txt = {
        en: { edit: 'Edit', delete: 'Delete', viewChats: 'View Chats', admin: 'Admin', user: 'User', agents: 'Agents' },
        ar: { edit: 'تعديل', delete: 'حذف', viewChats: 'المحادثات', admin: 'مسؤول', user: 'مستخدم', agents: 'بوتات' }
    };

    const t = (key) => txt[language]?.[key] || txt.en[key];

    const agentsCount = getAssignedAgentsCount(user);
    const badgeColor = getAssignmentBadgeColor(agentsCount);

    return (
        <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-6 hover:border-purple-500/50 transition-all group">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl text-white font-bold group-hover:scale-110 transition-transform">
                    {user.name?.charAt(0).toUpperCase() || '?'}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(user)}
                        className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
                        title={t('edit')}
                    >
                        ✏️
                    </button>
                    <button
                        onClick={() => onDelete(user.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                        title={t('delete')}
                    >
                        🗑️
                    </button>
                </div>
            </div>

            {/* User Info */}
            <h3 className="font-semibold text-[var(--text-primary)] mb-1">{user.name}</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-3 truncate">{user.email}</p>

            {/* Assigned Agents Preview */}
            {agentsCount > 0 && (
                <div className={`mb-3 px-2 py-1.5 rounded-lg text-xs border ${badgeColor}`}>
                    🤖 {agentsCount} {t('agents')}
                </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-primary)]">
                <span className={`px-2 py-0.5 text-xs rounded-full border ${user.role === 'admin'
                        ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                        : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    }`}>
                    {user.role === 'admin' ? t('admin') : t('user')}
                </span>
                <button
                    onClick={() => onViewConversations(user.id)}
                    className="text-sm text-purple-400 hover:text-purple-300 hover:underline transition-colors"
                >
                    {t('viewChats')} →
                </button>
            </div>
        </div>
    );
};

export default UserCard;

'use client';

import React from 'react';

/**
 * User Stats Summary Component
 * Shows user conversation statistics
 */
const UserStatsSummary = ({ stats, language = 'en' }) => {
    const txt = {
        en: {
            totalConversations: 'Total Conversations',
            totalMessages: 'Total Messages',
            lastActive: 'Last Active',
            never: 'Never',
            today: 'Today',
            yesterday: 'Yesterday',
            daysAgo: 'days ago'
        },
        ar: {
            totalConversations: 'إجمالي المحادثات',
            totalMessages: 'إجمالي الرسائل',
            lastActive: 'آخر نشاط',
            never: 'أبداً',
            today: 'اليوم',
            yesterday: 'أمس',
            daysAgo: 'أيام مضت'
        }
    };

    const t = (key) => txt[language]?.[key] || txt.en[key];

    const formatLastActive = (date) => {
        if (!date) return t('never');

        const now = new Date();
        const lastActive = new Date(date);
        const diffDays = Math.floor((now - lastActive) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return t('today');
        if (diffDays === 1) return t('yesterday');
        return `${diffDays} ${t('daysAgo')}`;
    };

    const statCards = [
        { icon: '💬', label: t('totalConversations'), value: stats?.conversations || 0, color: 'from-blue-500 to-cyan-500' },
        { icon: '📨', label: t('totalMessages'), value: stats?.messages || 0, color: 'from-purple-500 to-pink-500' },
        { icon: '🕐', label: t('lastActive'), value: formatLastActive(stats?.lastActive), color: 'from-green-500 to-emerald-500' }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {statCards.map((stat, index) => (
                <div
                    key={index}
                    className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl p-4 hover:border-purple-500/50 transition-all"
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
                            <p className="text-xl font-bold text-[var(--text-primary)]">{stat.value}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserStatsSummary;

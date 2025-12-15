'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { useLanguage } from '@/lib/language';
import toast from 'react-hot-toast';
import UserProfileHeader from '@/components/UserProfile/UserProfileHeader';
import UserStatsSummary from '@/components/UserProfile/UserStatsSummary';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { GlassCard, Skeleton, EmptyState } from '@/components/ui';

/**
 * User Conversations Container
 * Shows user profile with their conversations
 */
const UserConversationsContainer = () => {
    const { userId } = useParams();
    const { language } = useLanguage();
    const [user, setUser] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const txt = {
        en: {
            conversations: 'Conversations',
            noConversations: 'No conversations yet',
            startConversation: 'User hasn\'t started any conversations',
            messages: 'messages',
            users: 'Users'
        },
        ar: {
            conversations: 'المحادثات',
            noConversations: 'لا توجد محادثات',
            startConversation: 'لم يبدأ المستخدم أي محادثات',
            messages: 'رسائل',
            users: 'المستخدمين'
        }
    };

    const t = (key) => txt[language]?.[key] || txt.en[key];

    useEffect(() => {
        loadUserData();
    }, [userId]);

    const loadUserData = async () => {
        setLoading(true);
        try {
            // Load user info
            const userRes = await api.get(`/api/users/${userId}`);
            setUser(userRes.data.data);

            // Load conversations
            const convRes = await api.get(`/api/conversations?userId=${userId}`);
            const userConversations = convRes.data.data || [];
            setConversations(userConversations);

            // Calculate stats
            const totalMessages = userConversations.reduce((sum, conv) => sum + (conv.message_count || 0), 0);
            const lastActive = userConversations.length > 0
                ? userConversations[0].updated_at
                : null;

            setStats({
                conversations: userConversations.length,
                messages: totalMessages,
                lastActive
            });
        } catch (error) {
            toast.error('Failed to load user data');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const breadcrumbItems = [
        { label: t('users'), href: '/admin/users', icon: '👥' },
        { label: user?.name || 'User', icon: '👤' },
        { label: t('conversations'), icon: '💬' }
    ];

    if (loading) {
        return (
            <div className="min-h-screen p-6 lg:p-8">
                <Skeleton className="w-48 h-6 mb-6" />
                <Skeleton className="w-full h-32 mb-6" />
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {[1, 2, 3].map(i => <Skeleton key={i} className="h-24" />)}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 lg:p-8">
            <Breadcrumbs items={breadcrumbItems} />
            <UserProfileHeader user={user} language={language} />
            <UserStatsSummary stats={stats} language={language} />

            {/* Conversations List */}
            {conversations.length === 0 ? (
                <EmptyState
                    icon="💬"
                    title={t('noConversations')}
                    description={t('startConversation')}
                />
            ) : (
                <GlassCard className="divide-y divide-[var(--border-primary)]">
                    {conversations.map((conv, index) => (
                        <div
                            key={conv.id}
                            className="p-4 hover:bg-[var(--bg-card-hover)] transition-colors animate-fadeInUp"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-[var(--text-primary)] mb-1">
                                        {conv.title || `Conversation #${conv.id}`}
                                    </h3>
                                    <p className="text-sm text-[var(--text-secondary)]">
                                        {conv.message_count} {t('messages')} • {new Date(conv.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded-full border ${conv.conversation_type === 'dify'
                                        ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                                        : 'bg-green-500/20 text-green-400 border-green-500/30'
                                    }`}>
                                    {conv.conversation_type || 'general'}
                                </span>
                            </div>
                        </div>
                    ))}
                </GlassCard>
            )}
        </div>
    );
};

export default UserConversationsContainer;

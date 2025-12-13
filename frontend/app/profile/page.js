'use client';

/**
 * User Profile Page with i18n
 * AI Agent Platform - Premium 2026 Design
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, logout, isLoggedIn } from '@/lib/auth';
import { useLanguage } from '@/lib/language';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { GlassCard, GradientButton, IconButton } from '@/components/ui';
import EmbedCodeGenerator from '@/components/EmbedCodeGenerator';
import ThemeToggle from '@/components/ThemeToggle';

export default function ProfilePage() {
    const router = useRouter();
    const { t, isRTL, language, setLanguage } = useLanguage();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ conversations: 0, messages: 0, agents: 0 });
    const [agents, setAgents] = useState([]);
    const [embedAgent, setEmbedAgent] = useState(null); // Agent for embed modal

    useEffect(() => {
        if (!isLoggedIn()) {
            router.push('/login');
            return;
        }
        loadProfile();
    }, [router]);

    const loadProfile = async () => {
        try {
            const userData = getUser();
            setUser(userData);

            // Load user stats and agents
            if (userData?.id) {
                const [convRes, agentsRes] = await Promise.all([
                    api.get(`/api/conversations/user/${userData.id}?limit=100`),
                    api.get('/api/agents/public')
                ]);
                const conversations = convRes.data.data || [];
                const totalMessages = conversations.reduce((sum, c) => sum + (c.messages?.length || 0), 0);
                setStats({
                    conversations: conversations.length,
                    messages: totalMessages,
                    agents: (agentsRes.data.data || []).length
                });
                setAgents(agentsRes.data.data || []);
            }
        } catch (error) {
            console.error('Profile error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const toggleLanguage = () => {
        setLanguage(language === 'ar' ? 'en' : 'ar');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // Plan data (for future use)
    const plan = {
        name: language === 'ar' ? 'مجاني' : 'Free',
        conversationsLimit: 100,
        conversationsUsed: stats.conversations,
        messagesLimit: 1000,
        messagesUsed: stats.messages,
    };

    const usagePercent = (used, limit) => Math.min((used / limit) * 100, 100);

    return (
        <div className="min-h-screen bg-[var(--bg-primary)]" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <header className="border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <span className="text-2xl">🤖</span>
                        <span className="font-bold text-[var(--text-primary)]">{t('nav.aiAgentPlatform')}</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <ThemeToggle size="md" />
                        <button
                            onClick={toggleLanguage}
                            className="px-3 py-1.5 text-sm bg-[var(--bg-tertiary)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                            {language === 'ar' ? 'EN' : 'ع'}
                        </button>
                        <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm">
                            {t('common.home')}
                        </Link>
                        <button onClick={handleLogout} className="text-[var(--text-secondary)] hover:text-red-400 text-sm">
                            {t('common.logout')}
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto p-6">
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl text-white font-bold">
                        {user?.name?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div className="text-center sm:text-start">
                        <h1 className="text-2xl font-bold text-[var(--text-primary)]">{user?.name}</h1>
                        <p className="text-[var(--text-secondary)]">{user?.email}</p>
                        <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                                {plan.name}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions - AI Agents & Conversations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <Link href="/profile/conversations">
                        <GlassCard className="p-6 h-full group cursor-pointer hover:border-purple-500/50 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                    💬
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-purple-400 transition-colors">
                                        {t('profile.myConversations')}
                                    </h3>
                                    <p className="text-sm text-[var(--text-secondary)]">
                                        {stats.conversations} {t('profile.conversations')} • {stats.messages} {t('profile.messages')}
                                    </p>
                                </div>
                                <span className="text-purple-400 group-hover:translate-x-1 transition-transform">
                                    {isRTL ? '←' : '→'}
                                </span>
                            </div>
                        </GlassCard>
                    </Link>

                    <Link href="/">
                        <GlassCard className="p-6 h-full group cursor-pointer hover:border-purple-500/50 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                    🤖
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-purple-400 transition-colors">
                                        {t('profile.browseAgents')}
                                    </h3>
                                    <p className="text-sm text-[var(--text-secondary)]">
                                        {stats.agents} {t('profile.agentsAvailable')}
                                    </p>
                                </div>
                                <span className="text-purple-400 group-hover:translate-x-1 transition-transform">
                                    {isRTL ? '←' : '→'}
                                </span>
                            </div>
                        </GlassCard>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Stats & Plan */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Usage Stats */}
                        <GlassCard className="p-6">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                                <span>📊</span> {t('profile.usageThisMonth')}
                            </h2>

                            {/* Conversations */}
                            <div className="mb-6">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-[var(--text-secondary)]">{t('profile.conversations')}</span>
                                    <span className="text-[var(--text-primary)]">{stats.conversations} / {plan.conversationsLimit}</span>
                                </div>
                                <div className="h-3 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                                        style={{ width: `${usagePercent(stats.conversations, plan.conversationsLimit)}%` }}
                                    />
                                </div>
                            </div>

                            {/* Messages */}
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-[var(--text-secondary)]">{t('profile.messages')}</span>
                                    <span className="text-[var(--text-primary)]">{stats.messages} / {plan.messagesLimit}</span>
                                </div>
                                <div className="h-3 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
                                        style={{ width: `${usagePercent(stats.messages, plan.messagesLimit)}%` }}
                                    />
                                </div>
                            </div>
                        </GlassCard>

                        {/* Account Info (Read-only) */}
                        <GlassCard className="p-6">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                                <span>👤</span> {t('profile.accountInfo')}
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between py-3 border-b border-[var(--border-primary)]">
                                    <span className="text-[var(--text-secondary)]">{t('profile.name')}</span>
                                    <span className="text-[var(--text-primary)]">{user?.name}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-[var(--border-primary)]">
                                    <span className="text-[var(--text-secondary)]">{t('login.email')}</span>
                                    <span className="text-[var(--text-primary)]">{user?.email}</span>
                                </div>
                                <div className="flex justify-between py-3">
                                    <span className="text-[var(--text-secondary)]">{t('profile.memberSince')}</span>
                                    <span className="text-[var(--text-primary)]">
                                        {new Date(user?.created_at || Date.now()).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}
                                    </span>
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Right Column - Plan & Agents */}
                    <div className="space-y-6">
                        {/* Current Plan */}
                        <GlassCard className="p-6">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                                <span>⭐</span> {t('profile.currentPlan')}
                            </h2>
                            <div className="text-center p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30 mb-4">
                                <div className="text-3xl font-bold text-[var(--text-primary)]">{plan.name}</div>
                                <div className="text-sm text-[var(--text-secondary)] mt-1">{t('common.active')}</div>
                            </div>
                            <ul className="space-y-2 mb-4">
                                <li className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                                    <span className="text-green-400">✓</span>
                                    {plan.conversationsLimit} {t('profile.conversationsPerMonth')}
                                </li>
                                <li className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                                    <span className="text-green-400">✓</span>
                                    {plan.messagesLimit} {t('profile.messagesPerMonth')}
                                </li>
                                <li className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                                    <span className="text-green-400">✓</span>
                                    {t('profile.accessToAllAgents')}
                                </li>
                            </ul>
                            <GradientButton className="w-full" size="sm">
                                {t('profile.upgradePlan')}
                            </GradientButton>
                        </GlassCard>

                        {/* Available Agents Preview */}
                        <GlassCard className="p-6">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">{t('profile.availableAgents')}</h2>
                            <div className="space-y-3">
                                {agents.slice(0, 3).map(agent => (
                                    <div key={agent.id} className="relative group">
                                        <Link
                                            href={`/agent/${agent.id}`}
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-card)] transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                                                🤖
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-[var(--text-primary)] truncate">{agent.agent_name}</p>
                                                <div className="flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                                    <span className="text-xs text-[var(--text-muted)]">{t('common.online')}</span>
                                                </div>
                                            </div>
                                        </Link>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setEmbedAgent(agent);
                                            }}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-white transition-all bg-black/50 rounded-lg backdrop-blur-sm"
                                            title={language === 'ar' ? 'تضمين' : 'Embed'}
                                        >
                                            &lt;/&gt;
                                        </button>
                                    </div>
                                ))}
                                {agents.length > 3 && (
                                    <Link href="/" className="block text-center text-sm text-purple-400 hover:text-purple-300 pt-2">
                                        {t('profile.viewAllAgents')} {isRTL ? '←' : '→'}
                                    </Link>
                                )}
                                {agents.length === 0 && (
                                    <p className="text-center text-[var(--text-muted)] py-4">{t('profile.noAgents')}</p>
                                )}
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div >
            {/* Embed Modal */}
            < EmbedCodeGenerator
                agent={embedAgent}
                isOpen={!!embedAgent
                }
                onClose={() => setEmbedAgent(null)}
            />
        </div >
    );
}

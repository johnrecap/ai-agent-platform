'use client';

/**
 * Admin Dashboard - Premium 2026 Design with i18n
 * AI Agent Platform
 * @version 2.0.0-new-dashboard (December 2024)
 * This is the NEW dashboard - not the old one!
 */

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useLanguage } from '@/lib/language';
import Link from 'next/link';
import { GlassCard, GradientButton, Skeleton, StatusBadge } from '@/components/ui';

export default function AdminDashboard() {
    const { t, isRTL, language } = useLanguage();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recentActivity, setRecentActivity] = useState([]);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const [usersRes, agentsRes, conversationsRes] = await Promise.all([
                api.get('/api/users?limit=5'),
                api.get('/api/agents?limit=5'),
                api.get('/api/conversations?limit=5')
            ]);

            setStats({
                users: usersRes.data.pagination?.total || 0,
                agents: agentsRes.data.pagination?.total || 0,
                conversations: conversationsRes.data.pagination?.total || 0
            });

            // Create mock activity from real data
            const activities = [];
            (usersRes.data.data || []).slice(0, 2).forEach(u => {
                activities.push({ type: 'user', name: u.name, action: language === 'ar' ? 'انضم' : 'joined', time: u.created_at });
            });
            (conversationsRes.data.data || []).slice(0, 3).forEach(c => {
                activities.push({ type: 'conversation', name: c.title || (language === 'ar' ? 'محادثة جديدة' : 'New conversation'), action: language === 'ar' ? 'تم إنشاؤها' : 'created', time: c.created_at });
            });
            setRecentActivity(activities.slice(0, 5));
        } catch (error) {
            console.error('Dashboard error:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            labelKey: 'admin.totalUsers',
            value: stats?.users || 0,
            icon: '👥',
            gradient: 'from-blue-500 to-cyan-400',
            href: '/admin/users',
            change: '+12%'
        },
        {
            labelKey: 'admin.totalAgents',
            value: stats?.agents || 0,
            icon: '🤖',
            gradient: 'from-purple-500 to-pink-500',
            href: '/admin/agents',
            change: '+5%'
        },
        {
            labelKey: 'admin.totalConversations',
            value: stats?.conversations || 0,
            icon: '💬',
            gradient: 'from-orange-500 to-red-400',
            href: '/admin/conversations/upload',
            change: '+28%'
        },
        {
            label: language === 'ar' ? 'معدل الاستجابة' : 'Response Rate',
            value: '98%',
            icon: '⚡',
            gradient: 'from-green-500 to-emerald-400',
            href: '#',
            change: '+2%'
        },
    ];

    const quickActions = [
        { icon: '📤', labelKey: 'conversations.title', href: '/admin/conversations/upload', gradient: 'from-green-500 to-emerald-500' },
        { icon: '🤖', labelKey: 'admin.addAgent', href: '/admin/agents', gradient: 'from-purple-500 to-pink-500' },
        { icon: '👤', labelKey: 'admin.addUser', href: '/admin/users', gradient: 'from-blue-500 to-cyan-500' },
    ];

    const formatTime = (dateStr) => {
        if (!dateStr) return language === 'ar' ? 'مؤخراً' : 'Recently';
        const date = new Date(dateStr);
        const now = new Date();
        const diff = (now - date) / 1000 / 60;
        if (diff < 60) return language === 'ar' ? `منذ ${Math.floor(diff)} د` : `${Math.floor(diff)}m ago`;
        if (diff < 1440) return language === 'ar' ? `منذ ${Math.floor(diff / 60)} س` : `${Math.floor(diff / 60)}h ago`;
        return language === 'ar' ? `منذ ${Math.floor(diff / 1440)} ي` : `${Math.floor(diff / 1440)}d ago`;
    };

    return (
        <div className="min-h-screen p-6 lg:p-8" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                    {t('admin.dashboard')} ✨
                </h1>
                <p className="text-[var(--text-secondary)]">
                    {language === 'ar' ? 'مرحباً بعودتك! إليك ما يحدث مع وكلاء الذكاء الاصطناعي.' : "Welcome back! Here's what's happening with your AI agents."}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
                {loading ? (
                    [...Array(4)].map((_, i) => (
                        <div key={i} className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-primary)]">
                            <Skeleton className="w-12 h-12 mb-4" variant="circular" />
                            <Skeleton className="w-20 h-8 mb-2" />
                            <Skeleton className="w-24 h-4" />
                        </div>
                    ))
                ) : (
                    statCards.map((card, index) => (
                        <Link key={index} href={card.href} className="group">
                            <GlassCard className="p-6 h-full relative overflow-hidden">
                                {/* Gradient Overlay on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                                            {card.icon}
                                        </span>
                                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-[var(--success)]/20 text-[var(--success)]">
                                            {card.change}
                                        </span>
                                    </div>
                                    <div className="text-3xl font-bold text-[var(--text-primary)] mb-1">
                                        {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
                                    </div>
                                    <div className="text-sm text-[var(--text-secondary)]">
                                        {card.labelKey ? t(card.labelKey) : card.label}
                                    </div>
                                </div>
                            </GlassCard>
                        </Link>
                    ))
                )}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <div className="lg:col-span-2">
                    <GlassCard className="p-6">
                        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                            <span>⚡</span> {language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {quickActions.map((action, index) => (
                                <Link key={index} href={action.href}>
                                    <div className={`
                                        relative overflow-hidden rounded-xl p-6 
                                        bg-gradient-to-br ${action.gradient}
                                        text-white
                                        hover:scale-105 hover:shadow-xl
                                        transition-all duration-300
                                        group
                                    `}>
                                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                                            {action.icon}
                                        </div>
                                        <div className="font-semibold">{t(action.labelKey)}</div>
                                        <div className="absolute -right-4 -bottom-4 text-8xl opacity-20 group-hover:opacity-30 transition-opacity">
                                            {action.icon}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </GlassCard>
                </div>

                {/* Recent Activity */}
                <div>
                    <GlassCard className="p-6 h-full">
                        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                            <span>📊</span> {language === 'ar' ? 'النشاط الأخير' : 'Recent Activity'}
                        </h2>
                        {loading ? (
                            <div className="space-y-4">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Skeleton className="w-10 h-10" variant="circular" />
                                        <div className="flex-1">
                                            <Skeleton className="w-32 h-4 mb-1" />
                                            <Skeleton className="w-20 h-3" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : recentActivity.length > 0 ? (
                            <div className="space-y-4">
                                {recentActivity.map((activity, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-card-hover)] transition-colors animate-fadeInUp"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className={`
                                            w-10 h-10 rounded-full flex items-center justify-center
                                            ${activity.type === 'user' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}
                                        `}>
                                            {activity.type === 'user' ? '👤' : '💬'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-[var(--text-primary)] truncate font-medium">
                                                {activity.name}
                                            </p>
                                            <p className="text-xs text-[var(--text-tertiary)]">
                                                {activity.action} • {formatTime(activity.time)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <span className="text-4xl mb-2 block">📭</span>
                                <p className="text-[var(--text-secondary)]">
                                    {language === 'ar' ? 'لا يوجد نشاط حديث' : 'No recent activity'}
                                </p>
                            </div>
                        )}
                    </GlassCard>
                </div>
            </div>

            {/* AI Insights Banner */}
            <GlassCard className="mt-6 p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <span className="text-4xl animate-float">🧠</span>
                        <div>
                            <h3 className="font-semibold text-[var(--text-primary)]">
                                {language === 'ar' ? 'رؤى الذكاء الاصطناعي' : 'AI Insights'}
                            </h3>
                            <p className="text-sm text-[var(--text-secondary)]">
                                {language === 'ar'
                                    ? 'حقق وكلاؤك زيادة بنسبة 28% في المحادثات هذا الأسبوع!'
                                    : 'Your agents had a 28% increase in conversations this week!'}
                            </p>
                        </div>
                    </div>
                    <Link href="/admin/analytics">
                        <GradientButton size="sm">{t('admin.analytics')}</GradientButton>
                    </Link>
                </div>
            </GlassCard>
        </div>
    );
}

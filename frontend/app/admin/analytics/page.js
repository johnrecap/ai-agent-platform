'use client';

/**
 * Analytics Dashboard with i18n
 * AI Agent Platform - Premium 2026 Design
 */

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useLanguage } from '@/lib/language';
import { GlassCard, GradientButton, Skeleton } from '@/components/ui';

export default function AnalyticsPage() {
    const { t, isRTL, language } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [timeRange, setTimeRange] = useState('7d');

    const txt = {
        title: language === 'ar' ? 'التحليلات' : 'Analytics',
        subtitle: language === 'ar' ? 'رؤى المنصة ومقاييس الأداء' : 'Platform insights and performance metrics',
        totalUsers: language === 'ar' ? 'إجمالي المستخدمين' : 'Total Users',
        activeAgents: language === 'ar' ? 'الوكلاء النشطين' : 'Active Agents',
        conversations: language === 'ar' ? 'المحادثات' : 'Conversations',
        totalMessages: language === 'ar' ? 'إجمالي الرسائل' : 'Total Messages',
        byDay: language === 'ar' ? 'المحادثات حسب اليوم' : 'Conversations by Day',
        byType: language === 'ar' ? 'المحادثات حسب النوع' : 'Conversations by Type',
        performance: language === 'ar' ? 'مقاييس الأداء' : 'Performance Metrics',
        avgMessages: language === 'ar' ? 'متوسط الرسائل/محادثة' : 'Avg Messages/Conv',
        responseRate: language === 'ar' ? 'معدل الاستجابة' : 'Response Rate',
        avgResponseTime: language === 'ar' ? 'متوسط وقت الاستجابة' : 'Avg Response Time',
        exportReport: language === 'ar' ? '📥 تصدير التقرير' : '📥 Export Report',
        noData: language === 'ar' ? 'لا توجد بيانات متاحة' : 'No data available',
        days7: language === 'ar' ? '٧ أيام' : '7 Days',
        days30: language === 'ar' ? '٣٠ يوم' : '30 Days',
        days90: language === 'ar' ? '٩٠ يوم' : '90 Days',
    };

    useEffect(() => {
        loadAnalytics();
    }, [timeRange]);

    const loadAnalytics = async () => {
        setLoading(true);
        try {
            const [usersRes, agentsRes, convRes] = await Promise.all([
                api.get('/api/users?limit=1'),
                api.get('/api/agents?limit=1'),
                api.get('/api/conversations?limit=100')
            ]);

            const conversations = convRes.data.data || [];

            // Calculate stats
            const totalMessages = conversations.reduce((sum, c) => sum + (c.messages?.length || 0), 0);
            const avgMessages = conversations.length ? Math.round(totalMessages / conversations.length) : 0;

            // Group by day for chart
            const byDay = {};
            conversations.forEach(c => {
                const day = new Date(c.created_at).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'short' });
                byDay[day] = (byDay[day] || 0) + 1;
            });

            // Group by type
            const byType = {};
            conversations.forEach(c => {
                const type = c.conversation_type || (language === 'ar' ? 'عام' : 'general');
                byType[type] = (byType[type] || 0) + 1;
            });

            setStats({
                users: usersRes.data.pagination?.total || 0,
                agents: agentsRes.data.pagination?.total || 0,
                conversations: convRes.data.pagination?.total || conversations.length,
                totalMessages,
                avgMessages,
                byDay,
                byType,
            });
        } catch (error) {
            console.error('Analytics error:', error);
        } finally {
            setLoading(false);
        }
    };

    const timeRanges = [
        { id: '7d', label: txt.days7 },
        { id: '30d', label: txt.days30 },
        { id: '90d', label: txt.days90 },
    ];

    const StatCard = ({ icon, label, value, change, trend }) => (
        <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{icon}</span>
                {change && (
                    <span className={`text-xs px-2 py-1 rounded-full ${trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {trend === 'up' ? '↑' : '↓'} {change}
                    </span>
                )}
            </div>
            <div className="text-3xl font-bold text-[var(--text-primary)] mb-1">
                {typeof value === 'number' ? value.toLocaleString() : value}
            </div>
            <div className="text-sm text-[var(--text-secondary)]">{label}</div>
        </GlassCard>
    );

    const ChartBar = ({ label, value, max, color }) => {
        const percentage = max ? (value / max) * 100 : 0;
        return (
            <div className="flex items-center gap-3">
                <div className="w-12 text-xs text-[var(--text-secondary)]">{label}</div>
                <div className="flex-1 h-8 bg-[var(--bg-tertiary)] rounded-lg overflow-hidden">
                    <div
                        className={`h-full ${color} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <div className="w-8 text-sm text-[var(--text-primary)] text-end">{value}</div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="p-6 lg:p-8" dir={isRTL ? 'rtl' : 'ltr'}>
                <Skeleton className="w-48 h-8 mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-primary)]">
                            <Skeleton className="w-12 h-12 mb-4" />
                            <Skeleton className="w-20 h-8 mb-2" />
                            <Skeleton className="w-24 h-4" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const maxByDay = Math.max(...Object.values(stats?.byDay || { a: 1 }));
    const maxByType = Math.max(...Object.values(stats?.byType || { a: 1 }));

    return (
        <div className="p-6 lg:p-8" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">📊 {txt.title}</h1>
                    <p className="text-[var(--text-secondary)]">{txt.subtitle}</p>
                </div>
                <div className="flex gap-2">
                    {timeRanges.map(tr => (
                        <button
                            key={tr.id}
                            onClick={() => setTimeRange(tr.id)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${timeRange === tr.id
                                ? 'bg-purple-500 text-white'
                                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
                                }`}
                        >
                            {tr.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard icon="👥" label={txt.totalUsers} value={stats?.users} change="+12%" trend="up" />
                <StatCard icon="🤖" label={txt.activeAgents} value={stats?.agents} change="+5%" trend="up" />
                <StatCard icon="💬" label={txt.conversations} value={stats?.conversations} change="+28%" trend="up" />
                <StatCard icon="✉️" label={txt.totalMessages} value={stats?.totalMessages} change="+45%" trend="up" />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Conversations by Day */}
                <GlassCard className="p-6">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                        <span>📈</span> {txt.byDay}
                    </h2>
                    <div className="space-y-3">
                        {Object.entries(stats?.byDay || {}).map(([day, count]) => (
                            <ChartBar
                                key={day}
                                label={day}
                                value={count}
                                max={maxByDay}
                                color="bg-gradient-to-r from-purple-500 to-pink-500"
                            />
                        ))}
                        {Object.keys(stats?.byDay || {}).length === 0 && (
                            <p className="text-center text-[var(--text-muted)] py-8">{txt.noData}</p>
                        )}
                    </div>
                </GlassCard>

                {/* Conversations by Type */}
                <GlassCard className="p-6">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                        <span>🏷️</span> {txt.byType}
                    </h2>
                    <div className="space-y-3">
                        {Object.entries(stats?.byType || {}).map(([type, count]) => (
                            <ChartBar
                                key={type}
                                label={type.slice(0, 8)}
                                value={count}
                                max={maxByType}
                                color="bg-gradient-to-r from-blue-500 to-cyan-500"
                            />
                        ))}
                        {Object.keys(stats?.byType || {}).length === 0 && (
                            <p className="text-center text-[var(--text-muted)] py-8">{txt.noData}</p>
                        )}
                    </div>
                </GlassCard>
            </div>

            {/* Performance Metrics */}
            <GlassCard className="p-6">
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                    <span>⚡</span> {txt.performance}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-[var(--bg-tertiary)] rounded-xl">
                        <div className="text-4xl font-bold text-green-400 mb-2">{stats?.avgMessages || 0}</div>
                        <div className="text-sm text-[var(--text-secondary)]">{txt.avgMessages}</div>
                    </div>
                    <div className="text-center p-4 bg-[var(--bg-tertiary)] rounded-xl">
                        <div className="text-4xl font-bold text-blue-400 mb-2">98%</div>
                        <div className="text-sm text-[var(--text-secondary)]">{txt.responseRate}</div>
                    </div>
                    <div className="text-center p-4 bg-[var(--bg-tertiary)] rounded-xl">
                        <div className="text-4xl font-bold text-purple-400 mb-2">&lt;1s</div>
                        <div className="text-sm text-[var(--text-secondary)]">{txt.avgResponseTime}</div>
                    </div>
                </div>
            </GlassCard>

            {/* Export Section */}
            <div className={`mt-8 flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
                <GradientButton variant="secondary" size="sm">
                    {txt.exportReport}
                </GradientButton>
            </div>
        </div>
    );
}

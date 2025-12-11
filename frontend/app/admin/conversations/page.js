'use client';

/**
 * Admin Conversations Page - Redesigned with Dify Integration
 * AI Agent Platform - Premium 2026 Design
 */

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useLanguage } from '@/lib/language';
import toast from 'react-hot-toast';
import { GlassCard, GradientButton, Skeleton, StatusBadge, EmptyState } from '@/components/ui';
import ConversationViewer from '@/components/ConversationViewer';
import Pagination from '@/components/Pagination';

export default function AdminConversationsPage() {
    const { language, isRTL } = useLanguage();
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [syncStatus, setSyncStatus] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [filter, setFilter] = useState('all'); // all, dify, excel

    const txt = {
        title: language === 'ar' ? 'المحادثات' : 'Conversations',
        subtitle: language === 'ar' ? 'إدارة ومراجعة جميع المحادثات' : 'Manage and review all conversations',
        syncFromDify: language === 'ar' ? '🔄 مزامنة من Dify' : '🔄 Sync from Dify',
        syncing: language === 'ar' ? 'جاري المزامنة...' : 'Syncing...',
        uploadExcel: language === 'ar' ? '📤 رفع Excel' : '📤 Upload Excel',
        noConversations: language === 'ar' ? 'لا توجد محادثات' : 'No conversations yet',
        startChat: language === 'ar' ? 'ابدأ محادثة جديدة أو قم بالمزامنة من Dify' : 'Start a new chat or sync from Dify',
        selectConversation: language === 'ar' ? 'اختر محادثة للعرض' : 'Select a conversation to view',
        messages: language === 'ar' ? 'رسائل' : 'messages',
        all: language === 'ar' ? 'الكل' : 'All',
        dify: language === 'ar' ? 'Dify' : 'Dify',
        excel: language === 'ar' ? 'مرفوعة' : 'Uploaded',
        syncSuccess: language === 'ar' ? 'تمت المزامنة بنجاح!' : 'Sync completed!',
        syncFailed: language === 'ar' ? 'فشلت المزامنة' : 'Sync failed',
        connected: language === 'ar' ? 'متصل' : 'Connected',
        notConnected: language === 'ar' ? 'غير متصل' : 'Not Connected',
    };

    useEffect(() => {
        loadConversations();
        checkDifyStatus();
    }, [page, filter]);

    const loadConversations = async () => {
        setLoading(true);
        try {
            const params = { page, limit: 10 };
            if (filter === 'dify') params.type = 'dify';
            if (filter === 'excel') params.type = 'excel';

            const response = await api.get('/api/conversations', { params });
            setConversations(response.data.data || []);
            setTotalPages(response.data.pagination?.totalPages || 1);
        } catch (error) {
            console.error('Error loading conversations:', error);
        } finally {
            setLoading(false);
        }
    };

    const checkDifyStatus = async () => {
        try {
            const response = await api.get('/api/dify/status');
            setSyncStatus(response.data.data);
        } catch (error) {
            setSyncStatus({ configured: false, connected: false });
        }
    };

    const handleSync = async () => {
        setSyncing(true);
        try {
            const response = await api.post('/api/dify/sync', { agentId: null });
            toast.success(`${txt.syncSuccess} (${response.data.data?.synced || 0} ${txt.messages})`);
            loadConversations();
        } catch (error) {
            toast.error(error.response?.data?.message || txt.syncFailed);
        } finally {
            setSyncing(false);
        }
    };

    const viewConversation = async (id) => {
        try {
            const response = await api.get(`/api/conversations/${id}`);
            setSelectedConversation(response.data.data);
        } catch (error) {
            toast.error('Failed to load conversation');
        }
    };

    const getTypeColor = (type) => {
        if (type === 'dify') return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
        if (type === 'excel') return 'bg-green-500/20 text-green-400 border-green-500/30';
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    };

    return (
        <div className="min-h-screen p-6 lg:p-8" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                        💬 {txt.title}
                    </h1>
                    <p className="text-[var(--text-secondary)]">{txt.subtitle}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    {/* Dify Sync Button */}
                    <GradientButton
                        onClick={handleSync}
                        loading={syncing}
                        disabled={!syncStatus?.configured}
                        className="relative"
                    >
                        {syncing ? txt.syncing : txt.syncFromDify}
                        {syncStatus?.configured && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--bg-secondary)]" />
                        )}
                    </GradientButton>
                </div>
            </div>

            {/* Dify Status Banner */}
            {syncStatus && (
                <GlassCard className="p-4 mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🤖</span>
                        <div>
                            <p className="font-medium text-[var(--text-primary)]">Dify Integration</p>
                            <p className="text-sm text-[var(--text-secondary)]">
                                {syncStatus.configured ? txt.connected : txt.notConnected}
                            </p>
                        </div>
                    </div>
                    <StatusBadge
                        status={syncStatus.configured ? 'online' : 'offline'}
                        label={syncStatus.configured ? 'Active' : 'Not Configured'}
                    />
                </GlassCard>
            )}

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6">
                {['all', 'dify'].map((f) => (
                    <button
                        key={f}
                        onClick={() => { setFilter(f); setPage(1); }}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f
                            ? 'bg-purple-500 text-white'
                            : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-primary)]'
                            }`}
                    >
                        {f === 'all' ? txt.all : txt.dify}
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Conversations List */}
                <div>
                    {loading ? (
                        <GlassCard className="p-4 space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <Skeleton className="w-12 h-12" variant="circular" />
                                    <div className="flex-1">
                                        <Skeleton className="w-32 h-4 mb-2" />
                                        <Skeleton className="w-48 h-3" />
                                    </div>
                                </div>
                            ))}
                        </GlassCard>
                    ) : conversations.length === 0 ? (
                        <EmptyState
                            icon="💬"
                            title={txt.noConversations}
                            description={txt.startChat}
                            action
                            actionLabel={txt.syncFromDify}
                            onAction={handleSync}
                        />
                    ) : (
                        <GlassCard className="divide-y divide-[var(--border-primary)] overflow-hidden">
                            {conversations.map((conv, index) => (
                                <div
                                    key={conv.id}
                                    onClick={() => viewConversation(conv.id)}
                                    className={`p-4 cursor-pointer transition-all hover:bg-[var(--bg-card-hover)] animate-fadeInUp ${selectedConversation?.id === conv.id ? 'bg-purple-500/10 border-l-4 border-purple-500' : ''
                                        }`}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg">
                                                💬
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-[var(--text-primary)] line-clamp-1">
                                                    {conv.title || conv.agent?.agent_name || 'Conversation'}
                                                </h3>
                                                <p className="text-sm text-[var(--text-secondary)]">
                                                    {conv.message_count} {txt.messages} • {new Date(conv.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full border ${getTypeColor(conv.conversation_type)}`}>
                                            {conv.conversation_type || 'general'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </GlassCard>
                    )}

                    {/* Pagination */}
                    {!loading && conversations.length > 0 && (
                        <div className="mt-4">
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                        </div>
                    )}
                </div>

                {/* Conversation Viewer */}
                <div className="lg:sticky lg:top-8">
                    {selectedConversation ? (
                        <GlassCard className="overflow-hidden">
                            <div className="p-4 border-b border-[var(--border-primary)] bg-[var(--bg-tertiary)]">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold text-[var(--text-primary)]">
                                            {selectedConversation.title || selectedConversation.agent?.agent_name}
                                        </h3>
                                        <p className="text-sm text-[var(--text-secondary)]">
                                            {selectedConversation.message_count} {txt.messages}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedConversation(null)}
                                        className="p-2 hover:bg-[var(--bg-card-hover)] rounded-lg transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                            <div className="max-h-[600px] overflow-y-auto">
                                <ConversationViewer conversation={selectedConversation} />
                            </div>
                        </GlassCard>
                    ) : (
                        <GlassCard className="p-8 text-center">
                            <span className="text-6xl mb-4 block">👈</span>
                            <p className="text-[var(--text-secondary)]">{txt.selectConversation}</p>
                        </GlassCard>
                    )}
                </div>
            </div>
        </div>
    );
}

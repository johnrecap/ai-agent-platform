'use client';

/**
 * User Conversations Page - Split-Screen Design
 * AI Agent Platform - Premium 2026 Design
 */

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { GlassCard, GradientButton, Skeleton, EmptyState, StatusBadge, IconButton } from '@/components/ui';

export default function UserConversationsPage() {
    const { userId } = useParams();
    const router = useRouter();
    const messagesEndRef = useRef(null);

    const [user, setUser] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    // Multi-select state
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [selectMode, setSelectMode] = useState(false);

    // Search
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (userId) loadData();
    }, [userId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedConversation]);

    const loadData = async () => {
        try {
            const [userResponse, convResponse] = await Promise.all([
                api.get(`/api/users/${userId}`),
                api.get(`/api/conversations/user/${userId}?limit=100`)
            ]);
            setUser(userResponse.data.data);
            setConversations(convResponse.data.data || []);
        } catch (error) {
            toast.error('Failed to load conversations');
        } finally {
            setLoading(false);
        }
    };

    const toggleSelection = (id) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) newSelected.delete(id);
        else newSelected.add(id);
        setSelectedIds(newSelected);
    };

    const selectAll = () => {
        if (selectedIds.size === filteredConversations.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredConversations.map(c => c.id)));
        }
    };

    const deleteConversation = async (id) => {
        if (!confirm('Delete this conversation?')) return;
        setDeleting(true);
        try {
            await api.delete(`/api/conversations/${id}`);
            toast.success('Deleted');
            setConversations(conversations.filter(c => c.id !== id));
            if (selectedConversation?.id === id) setSelectedConversation(null);
        } catch (error) {
            toast.error('Failed');
        } finally {
            setDeleting(false);
        }
    };

    const bulkDelete = async () => {
        if (selectedIds.size === 0) return;
        if (!confirm(`Delete ${selectedIds.size} conversations?`)) return;
        setDeleting(true);
        try {
            await api.delete('/api/conversations/bulk', { data: { ids: Array.from(selectedIds) } });
            toast.success(`Deleted ${selectedIds.size} conversations`);
            setConversations(conversations.filter(c => !selectedIds.has(c.id)));
            setSelectedIds(new Set());
            setSelectMode(false);
            if (selectedIds.has(selectedConversation?.id)) setSelectedConversation(null);
        } catch (error) {
            toast.error('Failed');
        } finally {
            setDeleting(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const diff = (now - date) / 1000 / 60;
        if (diff < 60) return `${Math.floor(diff)}m ago`;
        if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
        return date.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' });
    };

    const filteredConversations = conversations.filter(c =>
        c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.conversation_type?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-[var(--text-secondary)]">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex">
            {/* Left Panel - Conversation List */}
            <div className="w-80 lg:w-96 border-r border-[var(--border-primary)] flex flex-col bg-[var(--bg-secondary)]">
                {/* Header */}
                <div className="p-4 border-b border-[var(--border-primary)]">
                    <button
                        onClick={() => router.push('/admin/users')}
                        className="text-[var(--primary)] text-sm mb-3 flex items-center gap-1 hover:gap-2 transition-all"
                    >
                        ← Back to Users
                    </button>
                    <h1 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                        <span>💬</span> {user?.name || 'User'}
                    </h1>
                    <p className="text-sm text-[var(--text-secondary)]">{conversations.length} conversations</p>

                    {/* Search */}
                    <div className="mt-3">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]"
                        />
                    </div>

                    {/* Multi-select Controls */}
                    <div className="flex gap-2 mt-3">
                        <button
                            onClick={() => { setSelectMode(!selectMode); setSelectedIds(new Set()); }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectMode ? 'bg-purple-500 text-white' : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
                                }`}
                        >
                            {selectMode ? '✓ Selecting' : '☐ Select'}
                        </button>
                        {selectMode && (
                            <>
                                <button onClick={selectAll} className="px-3 py-1.5 rounded-lg text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
                                    {selectedIds.size === filteredConversations.length ? 'None' : 'All'}
                                </button>
                                {selectedIds.size > 0 && (
                                    <button
                                        onClick={bulkDelete}
                                        disabled={deleting}
                                        className="px-3 py-1.5 rounded-lg text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                    >
                                        🗑️ {selectedIds.size}
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredConversations.length === 0 ? (
                        <div className="p-8 text-center">
                            <span className="text-4xl mb-2 block">📭</span>
                            <p className="text-[var(--text-secondary)] text-sm">No conversations</p>
                        </div>
                    ) : (
                        filteredConversations.map((conv) => (
                            <div
                                key={conv.id}
                                onClick={() => !selectMode && setSelectedConversation(conv)}
                                className={`p-4 border-b border-[var(--border-primary)] cursor-pointer transition-all hover:bg-[var(--bg-card-hover)] ${selectedConversation?.id === conv.id ? 'bg-purple-500/10 border-l-2 border-l-purple-500' : ''
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    {selectMode && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); toggleSelection(conv.id); }}
                                            className={`w-5 h-5 rounded border-2 flex items-center justify-center text-xs shrink-0 mt-0.5 ${selectedIds.has(conv.id)
                                                ? 'bg-purple-500 border-purple-500 text-white'
                                                : 'border-[var(--border-secondary)]'
                                                }`}
                                        >
                                            {selectedIds.has(conv.id) && '✓'}
                                        </button>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-[var(--text-primary)] truncate text-sm">
                                            {conv.title || `Conversation #${conv.id}`}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-[var(--text-tertiary)]">
                                                {conv.messages?.length || 0} msgs
                                            </span>
                                            <span className="text-xs text-[var(--text-muted)]">•</span>
                                            <span className="text-xs text-[var(--text-muted)]">{formatDate(conv.created_at)}</span>
                                        </div>
                                        {conv.conversation_type && (
                                            <span className="inline-block mt-1.5 px-2 py-0.5 text-xs rounded-full bg-purple-500/20 text-purple-400">
                                                {conv.conversation_type}
                                            </span>
                                        )}
                                    </div>
                                    {!selectMode && (
                                        <IconButton
                                            size="sm"
                                            variant="danger"
                                            onClick={(e) => { e.stopPropagation(); deleteConversation(conv.id); }}
                                        >
                                            🗑️
                                        </IconButton>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Right Panel - Chat View */}
            <div className="flex-1 flex flex-col bg-[var(--bg-primary)]">
                {selectedConversation ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="font-semibold text-[var(--text-primary)]">
                                        {selectedConversation.title || `Conversation #${selectedConversation.id}`}
                                    </h2>
                                    <p className="text-sm text-[var(--text-secondary)]">
                                        {selectedConversation.messages?.length || 0} messages
                                    </p>
                                </div>
                                <StatusBadge status="online" label="Active" />
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4" dir="rtl">
                            {selectedConversation.messages?.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${msg.role === 'user'
                                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-br-md'
                                        : 'bg-[var(--bg-card)] border border-[var(--border-primary)] text-[var(--text-primary)] rounded-bl-md'
                                        }`}>
                                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                        {msg.timestamp && (
                                            <p className={`text-xs mt-1.5 ${msg.role === 'user' ? 'text-purple-200' : 'text-[var(--text-muted)]'}`}>
                                                {new Date(msg.timestamp).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <span className="text-6xl block mb-4">💬</span>
                            <p className="text-[var(--text-secondary)]">Select a conversation</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

'use client';

/**
 * User Conversations Page with i18n
 * AI Agent Platform - Premium 2026 Design
 */

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, isLoggedIn } from '@/lib/auth';
import { useLanguage } from '@/lib/language';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { GlassCard, GradientButton } from '@/components/ui';

export default function UserConversationsPage() {
    const router = useRouter();
    const { t, isRTL, language } = useLanguage();
    const messagesEndRef = useRef(null);
    const [user, setUser] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const txt = {
        title: language === 'ar' ? 'محادثاتي' : 'My Conversations',
        profile: language === 'ar' ? 'الملف الشخصي' : 'Profile',
        home: language === 'ar' ? 'الرئيسية' : 'Home',
        search: language === 'ar' ? 'بحث...' : 'Search...',
        noConversations: language === 'ar' ? 'لا توجد محادثات بعد' : 'No conversations yet',
        startChatting: language === 'ar' ? 'ابدأ محادثة مع وكيل ذكاء اصطناعي' : 'Start chatting with an AI agent',
        browseAgents: language === 'ar' ? 'تصفح الوكلاء' : 'Browse Agents',
        selectConversation: language === 'ar' ? 'اختر محادثة' : 'Select a Conversation',
        clickToView: language === 'ar' ? 'اضغط على محادثة لعرض الرسائل' : 'Click on a conversation to view messages',
        messages: language === 'ar' ? 'رسائل' : 'msgs',
        failed: language === 'ar' ? 'فشل تحميل المحادثات' : 'Failed to load conversations',
    };

    useEffect(() => {
        if (!isLoggedIn()) {
            router.push('/login');
            return;
        }
        loadData();
    }, [router]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedConversation]);

    const loadData = async () => {
        try {
            const userData = getUser();
            setUser(userData);

            if (userData?.id) {
                const response = await api.get(`/api/conversations/user/${userData.id}?limit=100`);
                setConversations(response.data.data || []);
            }
        } catch (error) {
            toast.error(txt.failed);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const diff = (now - date) / 1000 / 60;
        if (diff < 60) return language === 'ar' ? `منذ ${Math.floor(diff)} د` : `${Math.floor(diff)}m ago`;
        if (diff < 1440) return language === 'ar' ? `منذ ${Math.floor(diff / 60)} س` : `${Math.floor(diff / 60)}h ago`;
        return date.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric' });
    };

    const filteredConversations = conversations.filter(c =>
        c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.conversation_type?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--bg-primary)]" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <header className="border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/profile" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                            {isRTL ? '→' : '←'} {txt.profile}
                        </Link>
                        <span className="text-[var(--text-primary)] font-bold">{txt.title}</span>
                    </div>
                    <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm">
                        {txt.home}
                    </Link>
                </div>
            </header>

            <div className="h-[calc(100vh-64px)] flex">
                {/* Conversation List */}
                <div className={`w-80 lg:w-96 ${isRTL ? 'border-l' : 'border-r'} border-[var(--border-primary)] flex flex-col bg-[var(--bg-secondary)]`}>
                    {/* Search */}
                    <div className="p-4 border-b border-[var(--border-primary)]">
                        <input
                            type="text"
                            placeholder={txt.search}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-purple-500"
                        />
                    </div>

                    {/* Conversation List */}
                    <div className="flex-1 overflow-y-auto">
                        {filteredConversations.length === 0 ? (
                            <div className="text-center py-12 px-4">
                                <span className="text-4xl mb-4 block">💬</span>
                                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{txt.noConversations}</h3>
                                <p className="text-sm text-[var(--text-secondary)] mb-4">{txt.startChatting}</p>
                                <Link href="/">
                                    <GradientButton size="sm">{txt.browseAgents}</GradientButton>
                                </Link>
                            </div>
                        ) : (
                            filteredConversations.map((conv) => (
                                <button
                                    key={conv.id}
                                    onClick={() => setSelectedConversation(conv)}
                                    className={`w-full p-4 text-start border-b border-[var(--border-primary)] hover:bg-[var(--bg-card)] transition-colors ${selectedConversation?.id === conv.id ? 'bg-[var(--bg-card)] border-purple-500/30' : ''}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg">
                                            🤖
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-medium text-[var(--text-primary)] truncate">
                                                    {conv.title || `#${conv.id}`}
                                                </span>
                                                <span className="text-xs text-[var(--text-muted)]">
                                                    {formatDate(conv.created_at)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">
                                                    {conv.messages?.length || 0} {txt.messages}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-[var(--bg-primary)]">
                    {selectedConversation ? (
                        <>
                            {/* Chat Header */}
                            <div className="h-16 px-6 flex items-center border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg">
                                        🤖
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-[var(--text-primary)]">
                                            {selectedConversation.title || `#${selectedConversation.id}`}
                                        </h2>
                                        <p className="text-xs text-[var(--text-muted)]">
                                            {formatDate(selectedConversation.created_at)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {(selectedConversation.messages || []).map((msg, idx) => {
                                    const isUser = msg.role === 'user' || msg.sender === 'user';
                                    return (
                                        <div key={idx} className={`flex ${isUser ? (isRTL ? 'justify-start' : 'justify-end') : (isRTL ? 'justify-end' : 'justify-start')}`}>
                                            <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${isUser
                                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                                : 'bg-[var(--bg-card)] border border-[var(--border-primary)] text-[var(--text-primary)]'
                                                }`}
                                                dir="auto"
                                            >
                                                <p className="text-sm whitespace-pre-wrap">{msg.content || msg.text}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <span className="text-6xl mb-4 block">💬</span>
                                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">{txt.selectConversation}</h2>
                                <p className="text-[var(--text-secondary)]">{txt.clickToView}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

'use client';

/**
 * Custom Chat Interface - Premium 2026 Design
 * AI Agent Platform
 * 
 * Streaming chat with Dify AI backend
 */

import { useState, useRef, useEffect } from 'react';

export default function ChatInterface({ agentId, agentName }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [conversationId, setConversationId] = useState(null);
    const [streamingMessage, setStreamingMessage] = useState('');
    const [userId, setUserId] = useState('user_temp');
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Generate unique user ID on client side only to avoid hydration mismatch
    useEffect(() => {
        setUserId(`user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, streamingMessage]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const sendMessage = async (e) => {
        e?.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');
        setLoading(true);
        setStreamingMessage('');

        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

            // Use simple (blocking) endpoint for reliable Arabic text
            const response = await fetch(`${API_URL}/api/chat/${agentId}/simple`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    conversation_id: conversationId,
                    user: userId
                })
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to send message');
            }

            // Set conversation ID
            if (data.data.conversation_id) {
                setConversationId(data.data.conversation_id);
            }

            // Add assistant message
            if (data.data.answer) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.data.answer }]);
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `⚠️ ${error.message || 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.'}`,
                error: true
            }]);
        } finally {
            setLoading(false);
            setStreamingMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full min-h-[600px] max-h-[80vh] bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Header */}
            <div className="flex items-center gap-4 p-5 border-b border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl shadow-lg shadow-purple-500/30">
                        🤖
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1a1a2e] animate-pulse" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-white">{agentName || 'AI Assistant'}</h2>
                    <p className="text-sm text-gray-400">متصل • جاهز للمساعدة</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
                {messages.length === 0 && !loading && (
                    <div className="flex flex-col items-center justify-center h-full text-center py-20">
                        <div className="text-6xl mb-4 animate-bounce">👋</div>
                        <h3 className="text-xl font-bold text-white mb-2">مرحباً!</h3>
                        <p className="text-gray-400 max-w-sm">
                            أنا هنا لمساعدتك. اكتب رسالتك وسأرد عليك فوراً.
                        </p>
                    </div>
                )}

                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeInUp`}
                        style={{ animationDelay: `${idx * 50}ms` }}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl px-5 py-3 ${msg.role === 'user'
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-sm'
                                : msg.error
                                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                    : 'bg-white/10 backdrop-blur-sm text-gray-100 rounded-bl-sm border border-white/10'
                                }`}
                        >
                            <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                        </div>
                    </div>
                ))}

                {/* Streaming message */}
                {streamingMessage && (
                    <div className="flex justify-start animate-fadeIn">
                        <div className="max-w-[80%] rounded-2xl rounded-bl-sm px-5 py-3 bg-white/10 backdrop-blur-sm text-gray-100 border border-white/10">
                            <p className="whitespace-pre-wrap leading-relaxed">{streamingMessage}</p>
                            <span className="inline-block w-2 h-4 bg-purple-400 animate-pulse ml-1" />
                        </div>
                    </div>
                )}

                {/* Typing indicator */}
                {loading && !streamingMessage && (
                    <div className="flex justify-start">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-bl-sm px-5 py-4 border border-white/10">
                            <div className="flex gap-1.5">
                                <span className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="flex gap-3 items-end">
                    <div className="flex-1 relative">
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="اكتب رسالتك..."
                            rows={1}
                            className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none transition-all"
                            disabled={loading}
                            dir="auto"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!input.trim() || loading}
                        className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white text-xl hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <span>🚀</span>
                        )}
                    </button>
                </div>
                <p className="text-xs text-center text-gray-500 mt-3">
                    developed by Muhammed Saeed
                </p>
            </form>
        </div>
    );
}

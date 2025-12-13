'use client';

/**
 * Custom Chat Interface - Premium 2026 Design
 * AI Agent Platform
 * 
 * Streaming chat with Dify AI backend
 */

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function ChatInterface({ agentId, agentName, avatarUrl, isWidget = false }) {
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

    // Responsive classes based on context (widget vs full page)
    const containerClasses = isWidget
        ? 'flex flex-col h-full bg-[#0f0f1a]' // Widget: Full height, plain dark bg (glass effect handled by iframe container)
        : 'flex flex-col h-full min-h-[600px] max-h-[80vh] bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] rounded-3xl overflow-hidden border border-white/10 shadow-2xl'; // Full page card

    return (
        <div className={containerClasses}>
            {/* Header */}
            <div className="flex items-center gap-4 p-4 border-b border-white/5 bg-white/5 backdrop-blur-md">
                <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl shadow-lg shadow-purple-500/20 ring-2 ring-white/10">
                        {avatarUrl ? (
                            <Image src={avatarUrl} alt={agentName || 'Agent'} width={40} height={40} className="object-cover" />
                        ) : (
                            '🤖'
                        )}
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1a1a2e]" />
                </div>
                <div>
                    <h2 className="text-base font-bold text-white leading-tight">{agentName || 'AI Assistant'}</h2>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <p className="text-xs text-gray-400">Online</p>
                    </div>
                </div>
                {/* Reset Conversation Button (Optional) */}
                <button
                    onClick={() => {
                        setMessages([]);
                        setConversationId(null);
                    }}
                    className="ml-auto w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Start New Conversation"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                        <path d="M16 21h5v-5" />
                    </svg>
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {messages.length === 0 && !loading && (
                    <div className="flex flex-col items-center justify-center h-full text-center py-10 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
                        <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-pink-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
                            <span className="text-3xl">👋</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Hello there!</h3>
                        <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                            I'm here to help. Ask me anything about our services or products.
                        </p>
                    </div>
                )}

                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-[slideInUp_0.3s_ease-out_forwards]`}
                    >
                        <div
                            className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${msg.role === 'user'
                                    ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-tr-sm shadow-purple-900/20'
                                    : msg.error
                                        ? 'bg-red-500/10 text-red-200 border border-red-500/20 rounded-tl-sm'
                                        : 'bg-white/10 backdrop-blur-sm text-gray-100 rounded-tl-sm border border-white/5'
                                }`}
                        >
                            <p className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                        </div>
                    </div>
                ))}

                {/* Streaming message */}
                {streamingMessage && (
                    <div className="flex justify-start animate-fadeIn">
                        <div className="max-w-[85%] rounded-2xl rounded-tl-sm px-4 py-3 bg-white/10 backdrop-blur-sm text-gray-100 border border-white/5">
                            <p className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed">{streamingMessage}</p>
                            <span className="inline-block w-1.5 h-3 bg-purple-400 animate-pulse ml-1 align-middle" />
                        </div>
                    </div>
                )}

                {/* Typing indicator */}
                {loading && !streamingMessage && (
                    <div className="flex justify-start">
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 border border-white/5">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={sendMessage} className="p-4 pt-2 bg-gradient-to-t from-[#0f0f1a] to-transparent">
                <div className="relative flex items-end gap-2 bg-white/10 backdrop-blur-md rounded-[24px] p-2 border border-white/10 transition-all focus-within:bg-white/15 focus-within:border-white/20 focus-within:ring-1 focus-within:ring-white/10">
                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        rows={1}
                        className="w-full bg-transparent border-0 text-white placeholder-gray-500 focus:ring-0 resize-none py-3 px-3 min-h-[44px] max-h-32 text-sm sm:text-base scrollbar-hide"
                        disabled={loading}
                        style={{ height: 'auto', minHeight: '44px' }}
                        onInput={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                        }}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || loading}
                        className="mb-1 mr-1 w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/30 transition-all active:scale-95 flex-shrink-0"
                    >
                        {loading ? (
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
                                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Branding Footer */}
                <div className="text-center mt-2 opacity-50 hover:opacity-100 transition-opacity">
                    <a
                        href="https://github.com/muhammad-saeed"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-gray-400 hover:text-white flex items-center justify-center gap-1"
                    >
                        <span>Powered by AI Agent</span>
                    </a>
                </div>
            </form>
        </div>
    );
}

// Add these keyframes to your global CSS or inside the style tag of the widget if not using Tailwind config
/*
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
@keyframes slideInUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
*/

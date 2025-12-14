'use client';

import { useState, useRef, useEffect } from 'react';

/**
 * Custom hook for Chat Interface logic
 * Manages chat state, message sending, and conversation handling
 */
export function useChatLogic(agentId) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [conversationId, setConversationId] = useState(null);
    const [streamingMessage, setStreamingMessage] = useState('');
    const [userId, setUserId] = useState('user_temp');
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Generate unique user ID on client side only
    useEffect(() => {
        setUserId(`user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }, []);

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, streamingMessage]);

    // Auto-focus input
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Reset conversation
    const resetConversation = () => {
        setMessages([]);
        setConversationId(null);
    };

    // Send message
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

    return {
        messages,
        input,
        setInput,
        loading,
        streamingMessage,
        messagesEndRef,
        inputRef,
        sendMessage,
        resetConversation
    };
}

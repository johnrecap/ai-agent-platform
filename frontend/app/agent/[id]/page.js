'use client';

/**
 * Agent Chat Page - Custom Dify Integration
 * AI Agent Platform - Premium 2026 Design
 */

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ChatInterface from '@/components/ChatInterface';
import LoadingSpinner from '@/components/LoadingSpinner';
import ThemeToggle from '@/components/ThemeToggle';
import Image from 'next/image';

export default function AgentPage() {
    const params = useParams();
    const router = useRouter();
    const [agent, setAgent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAgent = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const response = await fetch(`${API_URL}/api/agents/public`);
                const data = await response.json();

                if (data.success && data.data) {
                    const foundAgent = data.data.find(a => a.id === parseInt(params.id));
                    if (foundAgent) {
                        setAgent(foundAgent);
                    } else {
                        setError('Agent not found');
                    }
                }
            } catch (err) {
                console.error('Error loading agent:', err);
                setError('Failed to load agent');
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            loadAgent();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#1a0a1a] flex items-center justify-center">
                <div className="text-center">
                    <LoadingSpinner size="lg" />
                    <p className="text-gray-400 mt-4">جاري التحميل...</p>
                </div>
            </div>
        );
    }

    if (error || !agent) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#1a0a1a] flex items-center justify-center">
                <div className="text-center p-8">
                    <span className="text-6xl mb-4 block">😔</span>
                    <h1 className="text-2xl font-bold text-white mb-2">Agent Not Found</h1>
                    <p className="text-gray-400 mb-6">The agent you&apos;re looking for doesn&apos;t exist.</p>
                    <button
                        onClick={() => router.push('/')}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#1a0a1a]">
            {/* Decorative Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
            </div>

            {/* Header */}
            <header className="relative z-10 border-b border-white/10 bg-black/30 backdrop-blur-xl">
                <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all"
                    >
                        <span>←</span>
                        <span>Back</span>
                    </button>
                    <h1 className="text-xl font-bold text-white">
                        {agent.page_title || agent.agent_name}
                    </h1>
                    <ThemeToggle size="sm" />
                </div>
            </header>

            {/* Chat Container */}
            <main className="relative z-10 max-w-4xl mx-auto px-4 py-6">
                <ChatInterface
                    agentId={agent.id}
                    agentName={agent.agent_name}
                    avatarUrl={agent.avatar_url}
                />
            </main>

            {/* Footer */}
            <footer className="relative z-10 text-center py-4 text-sm">
                <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                    Developed by Muhammad Saeed
                </a>
            </footer>
        </div>
    );
}

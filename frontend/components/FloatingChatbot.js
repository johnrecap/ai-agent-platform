'use client';

/**
 * FloatingChatbot - Premium Chatbot Widget
 * Elegant floating assistant with glassmorphism design
 */

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/language';

export default function FloatingChatbot({ agentId = '1' }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const { language, isRTL } = useLanguage();

    useEffect(() => {
        // Show widget after a short delay for smooth entrance
        setTimeout(() => setIsVisible(true), 1000);
    }, []);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const txt = {
        chatWithUs: language === 'ar' ? 'تحدث معنا' : 'Chat with us',
        needHelp: language === 'ar' ? 'هل تحتاج مساعدة؟' : 'Need help?',
        minimize: language === 'ar' ? 'تصغير' : 'Minimize',
    };

    return (
        <>
            {/* Floating Button */}
            <div
                className={`fixed ${isRTL ? 'left-6' : 'right-6'} bottom-6 z-50 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                    }`}
            >
                {!isOpen && (
                    <button
                        onClick={toggleChat}
                        className="group relative"
                        aria-label={txt.chatWithUs}
                    >
                        {/* Pulsing Rings */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-ping opacity-20" />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse opacity-30" />

                        {/* Main Button */}
                        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 shadow-2xl shadow-purple-500/50 flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                            {/* Glassmorphism Overlay */}
                            <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm" />

                            {/* Icon */}
                            <div className="relative text-3xl animate-bounce-subtle">
                                💬
                            </div>

                            {/* Notification Badge */}
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold animate-pulse">
                                1
                            </div>
                        </div>

                        {/* Tooltip */}
                        <div className={`absolute bottom-full mb-3 ${isRTL ? 'left-0' : 'right-0'} px-4 py-2 bg-gray-900/90 backdrop-blur-md text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}>
                            {txt.needHelp}
                            <div className={`absolute top-full ${isRTL ? 'left-4' : 'right-4'} w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90`} />
                        </div>
                    </button>
                )}

                {/* Chat Interface */}
                {isOpen && (
                    <div
                        className="w-96 h-[600px] bg-[var(--bg-card)]/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-[var(--border-primary)] overflow-hidden flex flex-col animate-slideInUp"
                        style={{
                            maxWidth: 'calc(100vw - 3rem)',
                            maxHeight: 'calc(100vh - 8rem)',
                        }}
                    >
                        {/* Header */}
                        <div className="relative px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            {/* Glassmorphism Overlay */}
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

                            <div className="relative flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl">
                                        🤖
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{txt.chatWithUs}</h3>
                                        <p className="text-xs text-white/80 flex items-center gap-1">
                                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                            {language === 'ar' ? 'متاح الآن' : 'Online now'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={toggleChat}
                                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                                    aria-label={txt.minimize}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Chat Content - Iframe to agent page */}
                        <div className="flex-1 bg-[var(--bg-primary)]">
                            <iframe
                                src={`/agent/${agentId}`}
                                className="w-full h-full border-0"
                                title="Chat Interface"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Custom Animations */}
            <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .animate-slideInUp {
          animation: slideInUp 0.3s ease-out forwards;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
        </>
    );
}

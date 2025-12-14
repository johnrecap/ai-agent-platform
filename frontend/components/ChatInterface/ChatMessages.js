/**
 * Chat Messages Component
 * Displays conversation messages with welcome screen and typing indicator
 */
export default function ChatMessages({ messages, streamingMessage, loading, messagesEndRef }) {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {/* Welcome Screen */}
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

            {/* Messages */}
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
    );
}

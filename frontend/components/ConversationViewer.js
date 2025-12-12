'use client';

/**
 * Conversation Viewer Component
 * AI Agent Hosting Platform
 * 
 * Beautiful chat bubble interface for displaying conversations
 */

export default function ConversationViewer({ conversation }) {
    if (!conversation || !conversation.messages || conversation.messages.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <span className="text-4xl mb-4 block">💬</span>
                <p>No messages in this conversation</p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="space-y-4">
                {conversation.messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-md ${msg.role === 'user'
                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                                : 'bg-white text-gray-900 border border-gray-200'
                                }`}
                        >
                            {/* Role indicator */}
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`text-xs font-semibold ${msg.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                                    }`}>
                                    {msg.role === 'user' ? '👤 User' : '🤖 AI Agent'}
                                </span>
                            </div>

                            {/* Message content */}
                            <div
                                className={`text-sm leading-loose ${msg.role === 'user' ? 'text-white' : 'text-gray-700'}`}
                                dir="auto"
                                style={{
                                    wordBreak: 'break-word',
                                    overflowWrap: 'anywhere',
                                    unicodeBidi: 'plaintext',
                                    textAlign: 'start'
                                }}
                            >
                                {msg.content.split('\n').map((line, lineIndex) => (
                                    <p key={lineIndex} className="mb-2 last:mb-0" style={{ unicodeBidi: 'plaintext' }}>
                                        {line || '\u00A0'}
                                    </p>
                                ))}
                            </div>

                            {/* Timestamp */}
                            {msg.timestamp && (
                                <div className={`flex items-center gap-2 mt-2 pt-2 border-t ${msg.role === 'user' ? 'border-white/20' : 'border-gray-100'
                                    }`}>
                                    <span className={`text-xs ${msg.role === 'user' ? 'text-blue-200' : 'text-gray-400'
                                        }`}>
                                        {new Date(msg.timestamp).toLocaleString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

import { Bot, X, Send, User } from 'lucide-react';

/**
 * Test Run Modal Component
 * Interactive chat interface for testing the agent
 */
export default function TestRunModal({
    isOpen,
    onClose,
    config,
    messages,
    input,
    onInputChange,
    onSend,
    isThinking,
    chatEndRef
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-700">
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                            <Bot size={18} />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                                تجربة: {config.agent_name}
                            </h2>
                            <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> معاينة مباشرة
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Chat Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30 dark:bg-gray-900/50">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'mr-auto flex-row-reverse' : ''}`}
                        >
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user'
                                        ? 'bg-gray-200 dark:bg-gray-700'
                                        : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600'
                                    }`}
                            >
                                {msg.role === 'user' ? <User size={16} /> : <Bot size={18} />}
                            </div>
                            <div
                                className={`p-3 rounded-2xl text-sm ${msg.role === 'user'
                                        ? 'bg-indigo-600 text-white rounded-br-none'
                                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm'
                                    }`}
                            >
                                <p className="whitespace-pre-wrap">{msg.content}</p>
                            </div>
                        </div>
                    ))}

                    {/* Thinking Indicator */}
                    {isThinking && (
                        <div className="flex gap-3 max-w-[85%]">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center shrink-0">
                                <Bot size={18} />
                            </div>
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-2xl rounded-bl-none shadow-sm">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 shrink-0">
                    <form
                        onSubmit={onSend}
                        className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-2 border border-gray-200 dark:border-gray-600 focus-within:ring-2 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-900 focus-within:border-indigo-300 transition-all"
                    >
                        <input
                            type="text"
                            placeholder={`راسل ${config.agent_name || 'Agent'}...`}
                            className="flex-1 bg-transparent border-none focus:outline-none text-sm py-2 text-gray-900 dark:text-white"
                            value={input}
                            onChange={(e) => onInputChange(e.target.value)}
                            autoFocus
                            dir="rtl"
                        />
                        <button
                            type="submit"
                            className={`p-2 rounded-lg transition-colors ${input.trim()
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    : 'bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-default'
                                }`}
                            disabled={!input.trim()}
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

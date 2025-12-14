/**
 * Chat Input Component
 * Message input field with send button and branding footer
 */
export default function ChatInput({ input, onInputChange, onSend, loading, inputRef }) {
    return (
        <form onSubmit={onSend} className="p-4 pt-2 bg-gradient-to-t from-[#0f0f1a] to-transparent">
            <div className="relative flex items-end gap-2 bg-white/10 backdrop-blur-md rounded-[24px] p-2 border border-white/10 transition-all focus-within:bg-white/15 focus-within:border-white/20 focus-within:ring-1 focus-within:ring-white/10">
                <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => onInputChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            onSend(e);
                        }
                    }}
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
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-gray-400 hover:text-white flex items-center justify-center gap-1"
                >
                    <span>Powered by Muhammad Saeed</span>
                </a>
            </div>
        </form>
    );
}

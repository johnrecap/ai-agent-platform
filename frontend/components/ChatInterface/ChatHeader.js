import Image from 'next/image';

/**
 * Chat Header Component
 * Displays agent info and reset button
 */
export default function ChatHeader({ agentName, avatarUrl, onReset }) {
    return (
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
            {/* Reset Conversation Button */}
            <button
                onClick={onReset}
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
    );
}

'use client';

/**
 * Command Palette - Advanced Search (Ctrl+K)
 * AI Agent Platform - Premium 2026 Design
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const COMMANDS = [
    { id: 'dashboard', icon: '🏠', label: 'Go to Dashboard', shortcut: 'G D', action: '/admin' },
    { id: 'users', icon: '👥', label: 'Go to Users', shortcut: 'G U', action: '/admin/users' },
    { id: 'agents', icon: '🤖', label: 'Go to Agents', shortcut: 'G A', action: '/admin/agents' },
    { id: 'analytics', icon: '📊', label: 'Go to Analytics', shortcut: 'G N', action: '/admin/analytics' },
    { id: 'upload', icon: '📤', label: 'Upload Conversations', shortcut: 'U C', action: '/admin/conversations/upload' },
    { id: 'settings', icon: '⚙️', label: 'Settings', shortcut: 'G S', action: '/admin/settings' },
    { id: 'home', icon: '🌐', label: 'Go to Homepage', shortcut: 'G H', action: '/' },
    { id: 'logout', icon: '🚪', label: 'Logout', shortcut: 'L O', action: 'logout' },
];

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const router = useRouter();

    const filteredCommands = COMMANDS.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase())
    );

    const handleKeyDown = useCallback((e) => {
        // Open with Ctrl+K or Cmd+K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            setIsOpen(true);
            setQuery('');
            setSelectedIndex(0);
        }
        // Close with Escape
        if (e.key === 'Escape') {
            setIsOpen(false);
        }
    }, []);

    const handleInternalKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(i => Math.min(i + 1, filteredCommands.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(i => Math.max(i - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            executeCommand(filteredCommands[selectedIndex]);
        }
    };

    const executeCommand = (cmd) => {
        if (!cmd) return;
        setIsOpen(false);

        if (cmd.action === 'logout') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/login');
        } else {
            router.push(cmd.action);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]"
                onClick={() => setIsOpen(false)}
            />

            {/* Palette */}
            <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-[1001] animate-fadeInDown">
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl shadow-2xl overflow-hidden">
                    {/* Search Input */}
                    <div className="flex items-center gap-3 p-4 border-b border-[var(--border-primary)]">
                        <span className="text-xl">🔍</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleInternalKeyDown}
                            placeholder="Type a command or search..."
                            className="flex-1 bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none text-lg"
                        />
                        <kbd className="px-2 py-1 bg-[var(--bg-tertiary)] text-[var(--text-muted)] text-xs rounded">ESC</kbd>
                    </div>

                    {/* Results */}
                    <div className="max-h-80 overflow-y-auto p-2">
                        {filteredCommands.length === 0 ? (
                            <div className="text-center py-8 text-[var(--text-muted)]">
                                No commands found
                            </div>
                        ) : (
                            filteredCommands.map((cmd, index) => (
                                <button
                                    key={cmd.id}
                                    onClick={() => executeCommand(cmd)}
                                    className={`
                                        w-full flex items-center gap-3 px-4 py-3 rounded-xl
                                        transition-all duration-150
                                        ${index === selectedIndex
                                            ? 'bg-purple-500/20 text-[var(--text-primary)]'
                                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)]'
                                        }
                                    `}
                                >
                                    <span className="text-xl">{cmd.icon}</span>
                                    <span className="flex-1 text-left">{cmd.label}</span>
                                    <kbd className="px-2 py-0.5 bg-[var(--bg-tertiary)] text-[var(--text-muted)] text-xs rounded">
                                        {cmd.shortcut}
                                    </kbd>
                                </button>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-3 border-t border-[var(--border-primary)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                        <div className="flex gap-2">
                            <span>↑↓ Navigate</span>
                            <span>↵ Select</span>
                        </div>
                        <span>Ctrl+K to open</span>
                    </div>
                </div>
            </div>
        </>
    );
}

// Export hook for triggering palette externally
export function useCommandPalette() {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen(o => !o), []);

    return { isOpen, open, close, toggle };
}

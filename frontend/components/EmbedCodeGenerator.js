'use client';

import { useState } from 'react';
import { GlassCard, GradientButton } from '@/components/ui';
import toast from 'react-hot-toast';

export default function EmbedCodeGenerator({ agent, isOpen, onClose }) {
    const [style, setStyle] = useState('bubble'); // bubble, sidebar, inline
    const [color, setColor] = useState('#8b5cf6');
    const [position, setPosition] = useState('bottom-right');

    if (!isOpen || !agent) return null;

    // Base URL calculation (client-side)
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const agentUrl = `${baseUrl}/agent/${agent.id}`;
    const scriptUrl = `${baseUrl}/widget.js`;

    const getCode = () => {
        return `<script 
  src="${scriptUrl}"
  data-agent-url="${agentUrl}"
  data-style="${style}"
  data-color="${color}"
  data-position="${position}"
></script>`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(getCode());
        toast.success('Code copied to clipboard!');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <GlassCard className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-0 flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-[var(--border-primary)] flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-[var(--text-primary)]">Embed Agent</h2>
                        <p className="text-sm text-[var(--text-secondary)]">Create a widget for {agent.agent_name}</p>
                    </div>
                    <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 space-y-8">

                    {/* Style Selection */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">Widget Style</label>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { id: 'bubble', icon: '💬', label: 'Floating Bubble' },
                                { id: 'sidebar', icon: '📑', label: 'Sidebar' },
                                { id: 'inline', icon: '💻', label: 'Inline Frame' }
                            ].map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => setStyle(opt.id)}
                                    className={`
                                        flex flex-col items-center gap-2 p-4 rounded-xl border transition-all
                                        ${style === opt.id
                                            ? 'bg-purple-500/20 border-purple-500 text-[var(--text-primary)]'
                                            : 'bg-[var(--bg-tertiary)] border-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
                                        }
                                    `}
                                >
                                    <span className="text-2xl">{opt.icon}</span>
                                    <span className="text-sm font-medium">{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Customization (Only for Bubble/Sidebar) */}
                    {style !== 'inline' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">Primary Color</label>
                                <div className="flex gap-3">
                                    {['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#000000'].map((c) => (
                                        <button
                                            key={c}
                                            onClick={() => setColor(c)}
                                            className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${color === c ? 'border-white ring-2 ring-purple-500/50' : 'border-transparent'}`}
                                            style={{ backgroundColor: c }}
                                        />
                                    ))}
                                    <input
                                        type="color"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="w-8 h-8 p-0 border-0 rounded-full overflow-hidden cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">Position</label>
                                <div className="flex gap-2 p-1 bg-[var(--bg-tertiary)] rounded-lg w-fit">
                                    <button
                                        onClick={() => setPosition('bottom-right')}
                                        className={`px-3 py-1.5 rounded-md text-sm transition-all ${position === 'bottom-right' ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-secondary)]'}`}
                                    >
                                        Bottom Right
                                    </button>
                                    <button
                                        onClick={() => setPosition('bottom-left')}
                                        className={`px-3 py-1.5 rounded-md text-sm transition-all ${position === 'bottom-left' ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-secondary)]'}`}
                                    >
                                        Bottom Left
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Preview Area (Visual Animation) */}
                    <div className="relative h-48 bg-[var(--bg-tertiary)] rounded-2xl border border-[var(--border-primary)] overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-x-0 bottom-0 top-10 mx-auto w-3/4 bg-[var(--bg-card)] rounded-t-xl opacity-50 border-t border-l border-r border-[var(--border-primary)] shadow-lg" />
                        <div className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none">
                            {style === 'inline' ? (
                                <div className="w-full h-full bg-[var(--bg-card)] rounded-xl border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-secondary)]">
                                    Desktop View (Inline)
                                </div>
                            ) : (
                                <div className={`flex w-full ${position === 'bottom-right' ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white text-xl animate-bounce-slow"
                                        style={{ backgroundColor: color }}
                                    >
                                        💬
                                    </div>
                                </div>
                            )}
                        </div>
                        <span className="text-[var(--text-muted)] text-sm">Preview</span>
                    </div>

                    {/* Code Block */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Integration Code</label>
                        <div className="relative group">
                            <pre className="bg-[#0a0a0f] text-gray-300 p-4 rounded-xl text-sm font-mono overflow-x-auto border border-white/10">
                                {getCode()}
                            </pre>
                            <button
                                onClick={handleCopy}
                                className="absolute top-2 right-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            >
                                Copy Code
                            </button>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mt-2">
                            Paste this code just before the closing <code>&lt;/body&gt;</code> tag of your website.
                        </p>
                    </div>

                </div>
            </GlassCard>
        </div>
    );
}

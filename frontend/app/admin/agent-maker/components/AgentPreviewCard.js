import { Bot, MessageSquare, Code } from 'lucide-react';
import { AGENT_CAPABILITIES } from '../constants/agentCapabilities';

/**
 * Agent Preview Card Component
 * Shows live preview of agent configuration
 */
export default function AgentPreviewCard({ config, onTestClick }) {
    // Get active capabilities
    const activeCapabilities = AGENT_CAPABILITIES.filter(
        cap => config.capabilities[cap.key]
    );

    return (
        <div className="sticky top-24">
            <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                معاينة
            </h3>

            {/* Agent Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 mb-6">
                <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                    <div className="absolute -bottom-8 right-6">
                        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-800 p-1 shadow-md">
                            <div className="w-full h-full bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                <Bot size={32} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-10 px-6 pb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white text-right">
                        {config.agent_name || 'Agent بدون عنوان'}
                    </h2>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-3 text-right">
                        {config.role || 'لم يتم تحديد دور'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3 text-right">
                        {config.description || 'لم يتم تقديم وصف.'}
                    </p>

                    {/* Capabilities Icons */}
                    <div className="flex gap-2 mb-6 justify-end">
                        {activeCapabilities.map(cap => {
                            const Icon = cap.icon;
                            return (
                                <span
                                    key={cap.key}
                                    className="p-1.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md"
                                    title={cap.label}
                                >
                                    <Icon size={14} />
                                </span>
                            );
                        })}
                    </div>

                    {/* Start Chat Button */}
                    <button
                        onClick={onTestClick}
                        className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                        <MessageSquare size={16} /> بدء المحادثة
                    </button>
                </div>
            </div>

            {/* API Integration Info */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl p-4">
                <div className="flex items-start gap-3">
                    <Code size={18} className="text-indigo-600 dark:text-indigo-400 mt-0.5" />
                    <div className="text-right">
                        <h4 className="font-bold text-sm text-indigo-900 dark:text-indigo-200 mb-1">
                            تكامل API
                        </h4>
                        <p className="text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
                            بعد الحفظ، يمكن الوصول إلى هذا الـ Agent عبر API باستخدام المعرّف:{' '}
                            <code className="bg-white/50 dark:bg-black/20 px-1 py-0.5 rounded">
                                ag_8x92m...
                            </code>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

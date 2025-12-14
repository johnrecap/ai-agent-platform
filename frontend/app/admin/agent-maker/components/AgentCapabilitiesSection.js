import { Sliders } from 'lucide-react';
import { AGENT_CAPABILITIES } from '../constants/agentCapabilities';

/**
 * Agent Capabilities Section Component
 * Toggle switches for agent capabilities (Web Search, Code Interpreter, File Analysis)
 */
export default function AgentCapabilitiesSection({ capabilities, onToggle }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Sliders size={20} className="text-orange-500" /> القدرات والأدوات
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {AGENT_CAPABILITIES.map((capability) => {
                    const Icon = capability.icon;
                    const isActive = capabilities[capability.key];

                    return (
                        <div
                            key={capability.key}
                            onClick={() => onToggle(capability.key)}
                            className={`cursor-pointer p-4 rounded-xl border transition-all ${isActive
                                    ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800'
                                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div
                                    className={`p-2 rounded-lg ${isActive
                                            ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
                                        }`}
                                >
                                    <Icon size={18} />
                                </div>
                                <span
                                    className={`font-semibold text-sm ${isActive
                                            ? 'text-indigo-900 dark:text-indigo-300'
                                            : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                >
                                    {capability.label}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {capability.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

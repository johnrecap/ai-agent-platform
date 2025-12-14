import { Bot } from 'lucide-react';

/**
 * Agent Identity Section Component
 * Form fields for agent name, role, and description
 */
export default function AgentIdentitySection({ config, onChange }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Bot size={20} className="text-indigo-500" /> هوية الـ Agent
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            اسم الـ Agent
                        </label>
                        <input
                            type="text"
                            placeholder="مثال: المستشار القانوني"
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white outline-none transition-all"
                            value={config.agent_name}
                            onChange={(e) => onChange('agent_name', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            الدور / المسمى الوظيفي
                        </label>
                        <input
                            type="text"
                            placeholder="مثال: مستشار عقود أول"
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white outline-none transition-all"
                            value={config.role}
                            onChange={(e) => onChange('role', e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        وصف مختصر
                    </label>
                    <textarea
                        rows={4}
                        placeholder="صف بإيجاز ما يقوم به هذا الـ Agent..."
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white outline-none transition-all resize-none"
                        value={config.description}
                        onChange={(e) => onChange('description', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}

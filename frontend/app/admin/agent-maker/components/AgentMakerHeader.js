import { Sparkles, Play, Save } from 'lucide-react';

/**
 * Agent Maker Header Component
 * Top section with title and action buttons
 */
export default function AgentMakerHeader({ onTest, onSave, isSaving }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    صانع الـ AI Agents المخصصة <Sparkles size={20} className="text-purple-500" />
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    صمم وأنشئ وانشر AI agents متخصصة لسير عملك
                </p>
            </div>
            <div className="flex gap-3">
                <button
                    onClick={onTest}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                    <Play size={16} /> تجربة
                </button>
                <button
                    onClick={onSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSaving ? 'جاري الحفظ...' : <><Save size={16} /> حفظ Agent</>}
                </button>
            </div>
        </div>
    );
}

import { Cpu } from 'lucide-react';
import { AGENT_MODELS } from '../constants/agentModels';

/**
 * Agent Intelligence Section Component
 * Configuration for AI model, temperature, and system instructions
 */
export default function AgentIntelligenceSection({ config, onChange }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Cpu size={20} className="text-purple-500" /> تكوين الذكاء
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Model Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        النموذج
                    </label>
                    <select
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white outline-none transition-all"
                        value={config.model}
                        onChange={(e) => onChange('model', e.target.value)}
                    >
                        {AGENT_MODELS.map(model => (
                            <option key={model.value} value={model.value}>
                                {model.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Temperature Slider */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex justify-between">
                        <span>الإبداعية (Temperature)</span>
                        <span className="text-gray-500">{config.temperature}</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        value={config.temperature}
                        onChange={(e) => onChange('temperature', parseFloat(e.target.value))}
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>دقيق</span>
                        <span>متوازن</span>
                        <span>مبدع</span>
                    </div>
                </div>
            </div>

            {/* System Instructions */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    تعليمات النظام (البرومبت)
                </label>
                <div className="relative">
                    <textarea
                        rows={8}
                        placeholder="أنت مساعد قانوني خبير. هدفك هو مراجعة العقود للبحث عن المخاطر المحتملة. اذكر دائماً البنود المحددة..."
                        className="w-full px-4 py-3 bg-gray-900 text-gray-300 font-mono text-sm border border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-y"
                        value={config.instructions}
                        onChange={(e) => onChange('instructions', e.target.value)}
                    />
                    <div className="absolute top-3 left-3 text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                        Markdown مدعوم
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    نصيحة: كن محدداً بشأن الشخصية والأسلوب والقيود. قدم أمثلة على المدخلات والمخرجات المطلوبة.
                </p>
            </div>
        </div>
    );
}

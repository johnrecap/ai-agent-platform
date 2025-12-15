'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import AutomationCard from './AutomationCard';
import { useAutomation } from '@/hooks/useAutomation';
import { getAutomationText } from '@/locales/automationLocales';
import { AUTOMATION_TEMPLATES } from '@/constants/automationConstants';
import toast from 'react-hot-toast';

/**
 * Automation Page Container
 */
const AutomationPageContainer = () => {
    const t = (key) => getAutomationText(key);
    const {
        rules,
        loading,
        createRule,
        updateRule,
        deleteRule,
        executeRule
    } = useAutomation();

    const [showTemplates, setShowTemplates] = useState(true);

    const handleUseTemplate = async (template) => {
        const result = await createRule({
            name: template.name,
            trigger: template.trigger,
            actions: template.actions,
            status: 'inactive'
        });

        if (result.success) {
            toast.success(t('ruleCreated'));
            setShowTemplates(false);
        } else {
            toast.error(result.error);
        }
    };

    const handleExecute = async (id) => {
        const result = await executeRule(id);
        if (result.success) {
            toast.success(t('ruleExecuted'));
        } else {
            toast.error(result.error);
        }
    };

    const handleToggle = async (id, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'paused' : 'active';
        const result = await updateRule(id, { status: newStatus });
        if (result.success) {
            toast.success(t('ruleUpdated'));
        } else {
            toast.error(result.error);
        }
    };

    const handleEdit = (rule) => {
        toast.info('Edit rule modal - Coming soon!');
    };

    const handleDelete = async (id) => {
        if (!confirm(t('deleteConfirm'))) return;

        const result = await deleteRule(id);
        if (result.success) {
            toast.success(t('ruleDeleted'));
        } else {
            toast.error(result.error);
        }
    };

    if (loading) {
        return (
            <div className="p-6 lg:p-8">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('pageTitle')}</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{t('pageSubtitle')}</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus size={20} />
                    {t('createRule')}
                </button>
            </div>

            {/* Automation Rules */}
            {rules.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        {t('active')} {t('rules')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rules.map(rule => (
                            <AutomationCard
                                key={rule.id}
                                rule={rule}
                                onExecute={handleExecute}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onToggle={handleToggle}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Templates */}
            {showTemplates && (
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('templates')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {AUTOMATION_TEMPLATES.map(template => (
                            <div
                                key={template.id}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
                            >
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{template.name}</h3>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    <p>{template.trigger.type}</p>
                                    <p className="mt-1">{template.actions.length} action(s)</p>
                                </div>
                                <button
                                    onClick={() => handleUseTemplate(template)}
                                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    {t('useTemplate')}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {rules.length === 0 && !showTemplates && (
                <div className="text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400 text-lg">{t('noRules')}</p>
                    <p className="text-gray-500 dark:text-gray-500 mt-2">{t('createFirstRule')}</p>
                </div>
            )}
        </div>
    );
};

export default AutomationPageContainer;

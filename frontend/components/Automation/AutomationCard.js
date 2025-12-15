'use client';

import React from 'react';
import { getAutomationStatusColor, formatExecutionCount, formatLastExecuted } from '@/lib/automationUtils';
import { getAutomationText } from '@/locales/automationLocales';
import { Play, Pause, Edit, Trash2 } from 'lucide-react';

/**
 * Automation Card Component
 */
const AutomationCard = ({ rule, onExecute, onEdit, onDelete, onToggle }) => {
    const t = (key) => getAutomationText(key);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{rule.name}</h3>
                    {rule.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">{rule.description}</p>
                    )}
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAutomationStatusColor(rule.status)}`}>
                    {t(rule.status)}
                </span>
            </div>

            {/* Trigger & Actions Summary */}
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{t('whenThis')}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                        {rule.trigger?.icon || '⚡'} {rule.trigger?.type || 'Trigger'}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-2">
                    <span className="text-gray-500 dark:text-gray-400">{t('doThis')}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                        {rule.actions?.length || 0} action{rule.actions?.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div>
                    <span className="font-medium">{formatExecutionCount(rule.execution_count)}</span> {t('executions')}
                </div>
                <div>
                    {t('lastExecuted')}: {formatLastExecuted(rule.last_executed)}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                {rule.status === 'active' && (
                    <button
                        onClick={() => onExecute(rule.id)}
                        className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                        title={t('execute')}
                    >
                        <Play size={18} />
                    </button>
                )}
                <button
                    onClick={() => onToggle(rule.id, rule.status)}
                    className="p-2 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/30 rounded-lg transition-colors"
                    title={rule.status === 'active' ? t('pause') : t('resume')}
                >
                    <Pause size={18} />
                </button>
                <button
                    onClick={() => onEdit(rule)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                    title={t('edit')}
                >
                    <Edit size={18} />
                </button>
                <button
                    onClick={() => onDelete(rule.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    title={t('delete')}
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default AutomationCard;

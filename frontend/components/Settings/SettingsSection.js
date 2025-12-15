'use client';

import React from 'react';
import { getSettingsText } from '@/locales/settingsLocales';

/**
 * Settings Section Component
 * Reusable section container
 */
const SettingsSection = ({ category, children, icon }) => {
    const t = (key) => getSettingsText(key);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{icon}</span>
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t(category)}</h2>
                </div>
            </div>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
};

export default SettingsSection;

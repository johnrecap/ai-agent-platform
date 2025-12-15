'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';
import SettingsSection from './SettingsSection';
import { useSettings } from '@/hooks/useSettings';
import { getSettingsText } from '@/locales/settingsLocales';
import { SETTING_CATEGORIES, THEME_OPTIONS, NOTIFICATION_TYPES } from '@/constants/settingsConstants';
import { getSettingValue } from '@/lib/settingsUtils';
import toast from 'react-hot-toast';

/**
 * Settings Page Container
 */
const SettingsPageContainer = () => {
    const t = (key) => getSettingsText(key);
    const { settings, loading, batchUpdate } = useSettings();
    const [activeCategory, setActiveCategory] = useState('profile');

    const handleSave = async () => {
        // Batch update logic would go here
        toast.success(t('settingsSaved'));
    };

    const handleToggle = async (category, key, currentValue) => {
        const newValue = !currentValue;
        // Update single setting
        toast.info('Toggle feature - Coming soon!');
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
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Save size={20} />
                    {t('save')}
                </button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
                {SETTING_CATEGORIES.map(cat => (
                    <button
                        key={cat.value}
                        onClick={() => setActiveCategory(cat.value)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${activeCategory === cat.value
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                    >
                        <span>{cat.icon}</span>
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Theme Settings */}
            {activeCategory === 'theme' && (
                <SettingsSection category="theme" icon="🎨">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t('themeMode')}
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {THEME_OPTIONS.map(option => (
                                <button
                                    key={option.value}
                                    className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-600 transition-colors"
                                >
                                    <span className="text-2xl block mb-2">{option.icon}</span>
                                    <span className="text-sm text-gray-900 dark:text-white">{option.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </SettingsSection>
            )}

            {/* Notifications Settings */}
            {activeCategory === 'notifications' && (
                <SettingsSection category="notifications" icon="🔔">
                    {NOTIFICATION_TYPES.map(notif => (
                        <div key={notif.key} className="flex items-center justify-between py-3">
                            <span className="text-gray-900 dark:text-white">{notif.label}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    onChange={(e) => handleToggle('notifications', notif.key, e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    ))}
                </SettingsSection>
            )}

            {/* Security Settings */}
            {activeCategory === 'security' && (
                <SettingsSection category="security" icon="🔒">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {t('twoFactor')}
                            </label>
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                {t('enabled')}
                            </button>
                        </div>
                    </div>
                </SettingsSection>
            )}
        </div>
    );
};

export default SettingsPageContainer;

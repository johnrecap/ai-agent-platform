'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import IntegrationCard from './IntegrationCard';
import { useIntegrations } from '@/hooks/useIntegrations';
import { getIntegrationText } from '@/locales/integrationsLocales';
import { POPULAR_INTEGRATIONS } from '@/constants/integrationsConstants';
import toast from 'react-hot-toast';

/**
 * Integrations Page Container
 */
const IntegrationsPageContainer = () => {
    const t = (key) => getIntegrationText(key);
    const {
        integrations,
        loading,
        createIntegration,
        deleteIntegration,
        testIntegration
    } = useIntegrations();

    const [showPopular, setShowPopular] = useState(true);

    const handleQuickConnect = async (popularIntegration) => {
        const result = await createIntegration({
            name: popularIntegration.name,
            type: popularIntegration.type,
            config: {
                icon: popularIntegration.icon,
                description: popularIntegration.description,
                features: popularIntegration.features
            }
        });

        if (result.success) {
            toast.success(t('connectionSuccess'));
            setShowPopular(false);
        } else {
            toast.error(result.error);
        }
    };

    const handleConfigure = (integration) => {
        toast.info('Configuration modal - Coming soon!');
    };

    const handleDisconnect = async (id) => {
        if (!confirm(t('deleteConfirm'))) return;

        const result = await deleteIntegration(id);
        if (result.success) {
            toast.success(t('integrationDeleted'));
        } else {
            toast.error(result.error);
        }
    };

    const handleTest = async (id) => {
        const result = await testIntegration(id);
        if (result.success) {
            toast.success(t('testSuccess'));
        } else {
            toast.error(t('testFailed'));
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
                    {t('addIntegration')}
                </button>
            </div>

            {/* Connected Integrations */}
            {integrations.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('connected')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {integrations.map(integration => (
                            <IntegrationCard
                                key={integration.id}
                                integration={integration}
                                onConfigure={handleConfigure}
                                onDisconnect={handleDisconnect}
                                onTest={handleTest}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Popular Integrations */}
            {showPopular && (
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('popularIntegrations')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {POPULAR_INTEGRATIONS.map(integration => (
                            <div
                                key={integration.id}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
                            >
                                <div className="text-4xl mb-3">{integration.icon}</div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{integration.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{integration.description}</p>
                                <button
                                    onClick={() => handleQuickConnect(integration)}
                                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    {t('connect')}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {integrations.length === 0 && !showPopular && (
                <div className="text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400 text-lg">{t('noIntegrations')}</p>
                    <p className="text-gray-500 dark:text-gray-500 mt-2">{t('startConnecting')}</p>
                </div>
            )}
        </div>
    );
};

export default IntegrationsPageContainer;

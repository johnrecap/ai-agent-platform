/**
 * Integrations Locales
 * All text content for Integrations module
 */

export const integrationsLocales = {
    en: {
        // Page
        pageTitle: 'Integrations',
        pageSubtitle: 'Connect your favorite tools and services',
        addIntegration: 'Add Integration',

        // Integration Types
        stripe: 'Stripe',
        zapier: 'Zapier',
        slack: 'Slack',
        webhook: 'Custom Webhook',
        api: 'API',
        custom: 'Custom',

        // Status
        active: 'Active',
        inactive: 'Inactive',
        error: 'Error',

        // Form
        integrationName: 'Integration Name',
        integrationType: 'Integration Type',
        apiKey: 'API Key',
        webhookUrl: 'Webhook URL',
        configuration: 'Configuration',

        // Actions
        test: 'Test',
        configure: 'Configure',
        disconnect: 'Disconnect',
        connect: 'Connect',
        cancel: 'Cancel',
        save: 'Save',

        // Messages
        testSuccess: 'Integration tested successfully',
        testFailed: 'Integration test failed',
        connectionSuccess: 'Integration connected successfully',
        connectionFailed: 'Failed to connect integration',
        deleteConfirm: 'Are you sure you want to disconnect this integration?',
        integrationDeleted: 'Integration disconnected successfully',

        // Info
        lastSync: 'Last Sync',
        never: 'Never',
        connected: 'Connected',
        notConnected: 'Not Connected',

        // Popular
        popularIntegrations: 'Popular Integrations',
        features: 'Features',
        documentation: 'Documentation',

        // Empty
        noIntegrations: 'No integrations connected yet',
        startConnecting: 'Start connecting your favorite tools'
    }
};

export const getIntegrationText = (key, lang = 'en') => {
    return integrationsLocales[lang]?.[key] || key;
};

/**
 * Dify Locales
 * All text content for Dify integration
 */

export const difyLocales = {
    en: {
        // Configuration
        difyApiKey: 'Dify API Key',
        difyAppId: 'Dify App ID',
        providerType: 'Provider Type',
        testConnection: 'Test Connection',

        // Status
        configured: 'Configured',
        notConfigured: 'Not Configured',
        connected: 'Connected',
        disconnected: 'Disconnected',
        active: 'Active',

        // Actions
        syncNow: 'Sync from Dify',
        syncing: 'Syncing...',
        syncSuccess: 'Sync completed successfully!',
        syncFailed: 'Sync failed',

        // Messages
        apiKeyRequired: 'API Key is required',
        appIdRequired: 'App ID is required',
        connectionSuccess: 'Connection successful!',
        connectionFailed: 'Connection failed',
        testingConnection: 'Testing connection...',

        // Help Text
        apiKeyHint: 'Enter your Dify Backend Service API Key',
        appIdHint: 'Enter your Dify Application ID',
        providerHint: 'Select AI provider type',

        // Labels
        difyIntegration: 'Dify Integration',
        difyStatus: 'Dify Status',
        lastSync: 'Last Sync',
        syncedConversations: 'Synced Conversations',

        // Providers
        dify: 'Dify AI',
        openai: 'OpenAI',
        custom: 'Custom API'
    }
};

export const getDifyText = (key, lang = 'en') => {
    return difyLocales[lang]?.[key] || key;
};

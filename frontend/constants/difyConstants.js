/**
 * Dify Constants
 * Provider types and status configurations
 */

export const DIFY_PROVIDERS = [
    { value: 'dify', label: 'Dify AI', icon: '🤖' },
    { value: 'openai', label: 'OpenAI', icon: '🧠' },
    { value: 'custom', label: 'Custom API', icon: '⚙️' }
];

export const DIFY_STATUS_TYPES = [
    { value: 'configured', label: 'Configured', color: 'green' },
    { value: 'not_configured', label: 'Not Configured', color: 'yellow' },
    { value: 'error', label: 'Error', color: 'red' }
];

export const SYNC_STATUSES = [
    { value: 'idle', label: 'Ready' },
    { value: 'syncing', label: 'Syncing...' },
    { value: 'success', label: 'Success' },
    { value: 'error', label: 'Failed' }
];

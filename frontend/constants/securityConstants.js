/**
 * Security Constants
 * Activity log types and severity levels
 */

export const LOG_SEVERITIES = [
    { value: 'info', label: 'Info', color: 'blue', icon: 'ℹ️' },
    { value: 'warning', label: 'Warning', color: 'yellow', icon: '⚠️' },
    { value: 'error', label: 'Error', color: 'red', icon: '🚫' },
    { value: 'critical', label: 'Critical', color: 'red', icon: '🔴' }
];

export const LOG_ACTIONS = [
    { value: 'login', label: 'Login', icon: '🔑' },
    { value: 'logout', label: 'Logout', icon: '🚪' },
    { value: 'create', label: 'Create', icon: '➕' },
    { value: 'update', label: 'Update', icon: '✏️' },
    { value: 'delete', label: 'Delete', icon: '🗑️' },
    { value: 'access', label: 'Access', icon: '👁️' }
];

export const ENTITY_TYPES = [
    'user', 'product', 'customer', 'invoice', 'payment',
    'integration', 'automation', 'setting'
];

/**
 * Integrations Constants
 * Integration types and statuses
 */

export const INTEGRATION_TYPES = [
    { value: 'stripe', label: 'Stripe', icon: '💳', color: 'purple' },
    { value: 'zapier', label: 'Zapier', icon: '⚡', color: 'orange' },
    { value: 'slack', label: 'Slack', icon: '💬', color: 'purple' },
    { value: 'webhook', label: 'Custom Webhook', icon: '🔗', color: 'blue' },
    { value: 'api', label: 'API', icon: '🔌', color: 'green' },
    { value: 'custom', label: 'Custom', icon: '⚙️', color: 'gray' }
];

export const INTEGRATION_STATUSES = [
    { value: 'active', label: 'Active', color: 'green' },
    { value: 'inactive', label: 'Inactive', color: 'gray' },
    { value: 'error', label: 'Error', color: 'red' }
];

export const POPULAR_INTEGRATIONS = [
    {
        id: 'stripe',
        name: 'Stripe',
        type: 'stripe',
        description: 'Accept payments and manage subscriptions',
        icon: '💳',
        features: ['Payment Processing', 'Subscriptions', 'Invoicing'],
        docsUrl: 'https://stripe.com/docs'
    },
    {
        id: 'zapier',
        name: 'Zapier',
        type: 'zapier',
        description: 'Connect with 5000+ apps',
        icon: '⚡',
        features: ['Automation', 'Workflows', 'Triggers'],
        docsUrl: 'https://zapier.com/apps'
    },
    {
        id: 'slack',
        name: 'Slack',
        type: 'slack',
        description: 'Send notifications to Slack channels',
        icon: '💬',
        features: ['Notifications', 'Messages', 'Alerts'],
        docsUrl: 'https://api.slack.com'
    }
];

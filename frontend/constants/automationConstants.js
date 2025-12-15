/**
 * Automation Constants
 * Triggers, actions, and automation workflows
 */

export const AUTOMATION_TRIGGERS = [
    { value: 'new_customer', label: 'New Customer Created', icon: '👤' },
    { value: 'new_invoice', label: 'New Invoice Created', icon: '📄' },
    { value: 'payment_received', label: 'Payment Received', icon: '💰' },
    { value: 'product_sold', label: 'Product Sold', icon: '🛍️' },
    { value: 'customer_inactive', label: 'Customer Inactive (30 days)', icon: '⏰' },
    { value: 'invoice_overdue', label: 'Invoice Overdue', icon: '⚠️' }
];

export const AUTOMATION_ACTIONS = [
    { value: 'send_email', label: 'Send Email', icon: '✉️' },
    { value: 'send_slack', label: 'Send Slack Message', icon: '💬' },
    { value: 'create_task', label: 'Create Task', icon: '✓' },
    { value: 'update_status', label: 'Update Status', icon: '🔄' },
    { value: 'webhook', label: 'Call Webhook', icon: '🔗' },
    { value: 'add_tag', label: 'Add Tag', icon: '🏷️' }
];

export const AUTOMATION_STATUSES = [
    { value: 'active', label: 'Active', color: 'green' },
    { value: 'inactive', label: 'Inactive', color: 'gray' },
    { value: 'paused', label: 'Paused', color: 'yellow' }
];

export const AUTOMATION_TEMPLATES = [
    {
        id: 'welcome-email',
        name: 'Welcome New Customers',
        trigger: { type: 'new_customer' },
        actions: [{ type: 'send_email', config: { template: 'welcome' } }]
    },
    {
        id: 'payment-reminder',
        name: 'Payment Reminder',
        trigger: { type: 'invoice_overdue' },
        actions: [{ type: 'send_email', config: { template: 'reminder' } }]
    },
    {
        id: 'slack-notification',
        name: 'Slack Sales Notification',
        trigger: { type: 'product_sold' },
        actions: [{ type: 'send_slack', config: { channel: '#sales' } }]
    }
];

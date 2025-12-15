/**
 * Invoices Constants
 * Invoice statuses, payment methods, and other constants
 */

export const INVOICE_STATUSES = [
    { value: 'draft', label: 'Draft', color: 'gray' },
    { value: 'sent', label: 'Sent', color: 'blue' },
    { value: 'paid', label: 'Paid', color: 'green' },
    { value: 'overdue', label: 'Overdue', color: 'red' },
    { value: 'cancelled', label: 'Cancelled', color: 'orange' }
];

export const PAYMENT_METHODS = [
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'stripe', label: 'Stripe' },
    { value: 'cash', label: 'Cash' }
];

export const PAYMENT_STATUSES = [
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'completed', label: 'Completed', color: 'green' },
    { value: 'failed', label: 'Failed', color: 'red' },
    { value: 'refunded', label: 'Refunded', color: 'purple' }
];

export const INVOICE_TABLE_COLUMNS = [
    { key: 'invoice_number', label: 'Invoice #', sortable: true },
    { key: 'customer', label: 'Customer', sortable: true },
    { key: 'issue_date', label: 'Issue Date', sortable: true },
    { key: 'due_date', label: 'Due Date', sortable: true },
    { key: 'total', label: 'Total', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
];

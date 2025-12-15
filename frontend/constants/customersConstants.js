/**
 * Customers Constants
 * Customer statuses, types, and other constants
 */

export const CUSTOMER_STATUSES = [
    { value: 'active', label: 'Active', color: 'green' },
    { value: 'inactive', label: 'Inactive', color: 'gray' },
    { value: 'blocked', label: 'Blocked', color: 'red' }
];

export const CUSTOMER_TYPES = [
    { value: 'individual', label: 'Individual' },
    { value: 'business', label: 'Business' }
];

export const CUSTOMER_FORM_FIELDS = [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: false },
    { name: 'company', label: 'Company', type: 'text', required: false },
    { name: 'customer_type', label: 'Customer Type', type: 'select', required: true },
    { name: 'address', label: 'Address', type: 'textarea', required: false },
    { name: 'city', label: 'City', type: 'text', required: false },
    { name: 'country', label: 'Country', type: 'text', required: false },
    { name: 'postal_code', label: 'Postal Code', type: 'text', required: false },
    { name: 'status', label: 'Status', type: 'select', required: true },
    { name: 'notes', label: 'Notes', type: 'textarea', required: false }
];

export const CUSTOMER_TABLE_COLUMNS = [
    { key: 'name', label: 'Customer Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'company', label: 'Company', sortable: true },
    { key: 'customer_type', label: 'Type', sortable: true },
    { key: 'total_spent', label: 'Total Spent', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
];

/**
 * Products Constants
 * Product categories, statuses, and other constants
 */

export const PRODUCT_CATEGORIES = [
    'Software',
    'Service',
    'Add-on',
    'Support',
    'Plugin',
    'License',
    'Subscription',
    'Hardware',
    'Training',
    'Consulting'
];

export const PRODUCT_STATUSES = [
    { value: 'active', label: 'Active', color: 'green' },
    { value: 'inactive', label: 'Inactive', color: 'gray' },
    { value: 'archived', label: 'Archived', color: 'red' }
];

export const PRODUCT_FORM_FIELDS = [
    { name: 'name', label: 'Product Name', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: false },
    { name: 'price', label: 'Price', type: 'number', required: true },
    { name: 'category', label: 'Category', type: 'select', required: false },
    { name: 'status', label: 'Status', type: 'select', required: true },
    { name: 'stock_quantity', label: 'Stock Quantity', type: 'number', required: false },
    { name: 'sku', label: 'SKU', type: 'text', required: false },
    { name: 'image_url', label: 'Image URL', type: 'text', required: false }
];

export const PRODUCT_TABLE_COLUMNS = [
    { key: 'name', label: 'Product Name', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'price', label: 'Price', sortable: true },
    { key: 'stock_quantity', label: 'Stock', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
];

/**
 * Invoices Locales
 * All text content for Invoices & Payments module
 */

export const invoicesLocales = {
    en: {
        // Page
        pageTitle: 'Invoices',
        pageSubtitle: 'Manage your invoices and payments',
        addInvoice: 'Create Invoice',
        searchPlaceholder: 'Search invoices...',
        filter: 'Filter',

        // Form
        formTitleCreate: 'Create New Invoice',
        formTitleEdit: 'Edit Invoice',
        invoiceNumber: 'Invoice Number',
        customer: 'Customer',
        issueDate: 'Issue Date',
        dueDate: 'Due Date',
        items: 'Items',
        taxRate: 'Tax Rate (%)',
        notes: 'Notes',
        subtotal: 'Subtotal',
        taxAmount: 'Tax Amount',
        total: 'Total',
        status: 'Status',

        // Item Fields
        itemDescription: 'Description',
        quantity: 'Quantity',
        unitPrice: 'Unit Price',
        amount: 'Amount',
        addItem: 'Add Item',
        removeItem: 'Remove',

        // Placeholders
        enterInvoiceNumber: 'Enter invoice number',
        selectCustomer: 'Select customer',
        enterNotes: 'Add notes about this invoice',
        enterDescription: 'Item description',

        // Buttons
        cancel: 'Cancel',
        save: 'Save',
        create: 'Create',
        update: 'Update',
        delete: 'Delete',
        edit: 'Edit',
        view: 'View',
        createInvoice: 'Create Invoice',
        updateInvoice: 'Update Invoice',
        saving: 'Saving...',
        markAsPaid: 'Mark as Paid',
        sendInvoice: 'Send Invoice',

        // Table
        invoiceCol: 'Invoice #',
        customerCol: 'Customer',
        issueDateCol: 'Issue Date',
        dueDateCol: 'Due Date',
        totalCol: 'Total',
        statusCol: 'Status',
        actionsCol: 'Actions',

        // Status
        draft: 'Draft',
        sent: 'Sent',
        paid: 'Paid',
        overdue: 'Overdue',
        cancelled: 'Cancelled',

        // Payment
        paymentMethod: 'Payment Method',
        paymentStatus: 'Payment Status',
        paymentDate: 'Payment Date',
        transactionId: 'Transaction ID',
        pending: 'Pending',
        completed: 'Completed',
        failed: 'Failed',
        refunded: 'Refunded',

        // Messages
        noInvoicesFound: 'No invoices found',
        deleteConfirm: 'Are you sure you want to delete this invoice?',
        invoiceCreated: 'Invoice created successfully',
        invoiceUpdated: 'Invoice updated successfully',
        invoiceDeleted: 'Invoice deleted successfully',

        // Validation
        invoiceNumberRequired: 'Invoice number must be at least 3 characters',
        customerRequired: 'Customer is required',
        itemsRequired: 'At least one item is required',

        // Required
        required: '*'
    }
};

export const getInvoiceText = (key, lang = 'en') => {
    return invoicesLocales[lang]?.[key] || key;
};

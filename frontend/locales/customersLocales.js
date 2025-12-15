/**
 * Customers Locales
 * All text content for Customers module
 */

export const customersLocales = {
    en: {
        // Page
        pageTitle: 'Customers',
        pageSubtitle: 'Manage your customers and clients',
        addCustomer: 'Add Customer',
        searchPlaceholder: 'Search customers...',
        filter: 'Filter',

        // Form
        formTitleCreate: 'Add New Customer',
        formTitleEdit: 'Edit Customer',
        fullName: 'Full Name',
        email: 'Email',
        phone: 'Phone',
        company: 'Company',
        customerType: 'Customer Type',
        address: 'Address',
        city: 'City',
        country: 'Country',
        postalCode: 'Postal Code',
        status: 'Status',
        notes: 'Notes',

        // Placeholders
        enterFullName: 'Enter full name',
        enterEmail: 'Enter email address',
        enterPhone: 'Enter phone number',
        enterCompany: 'Enter company name',
        selectCustomerType: 'Select customer type',
        enterAddress: 'Enter address',
        enterCity: 'Enter city',
        enterCountry: 'Enter country',
        enterPostalCode: 'Enter postal code',
        customerNotes: 'Add notes about customer',

        // Buttons
        cancel: 'Cancel',
        save: 'Save',
        update: 'Update',
        delete: 'Delete',
        edit: 'Edit',
        createCustomer: 'Create Customer',
        updateCustomer: 'Update Customer',
        saving: 'Saving...',

        // Table
        customerNameCol: 'Customer Name',
        emailCol: 'Email',
        companyCol: 'Company',
        typeCol: 'Type',
        totalSpentCol: 'Total Spent',
        statusCol: 'Status',
        actionsCol: 'Actions',

        // Status & Type
        active: 'Active',
        inactive: 'Inactive',
        blocked: 'Blocked',
        individual: 'Individual',
        business: 'Business',

        // Messages
        noCustomersFound: 'No customers found',
        deleteConfirm: 'Are you sure you want to delete this customer?',
        customerCreated: 'Customer created successfully',
        customerUpdated: 'Customer updated successfully',
        customerDeleted: 'Customer deleted successfully',

        // Validation
        nameRequired: 'Name must be at least 2 characters',
        emailRequired: 'Valid email is required',
        phoneInvalid: 'Phone number must be at least 5 digits',

        // Required
        required: '*'
    }
};

export const getCustomerText = (key, lang = 'en') => {
    return customersLocales[lang]?.[key] || key;
};

/**
 * Products Locales
 * All text content for Products module
 */

export const productsLocales = {
    en: {
        // Page
        pageTitle: 'Products',
        pageSubtitle: 'Manage your products inventory',
        addProduct: 'Add Product',
        searchPlaceholder: 'Search products...',
        filter: 'Filter',

        // Form
        formTitleCreate: 'Add New Product',
        formTitleEdit: 'Edit Product',
        productName: 'Product Name',
        description: 'Description',
        price: 'Price',
        stockQuantity: 'Stock Quantity',
        category: 'Category',
        status: 'Status',
        sku: 'SKU',
        imageUrl: 'Image URL',

        // Placeholders
        enterProductName: 'Enter product name',
        productDescription: 'Product description',
        selectCategory: 'Select category',
        productSKU: 'Product SKU',

        // Buttons
        cancel: 'Cancel',
        save: 'Save',
        update: 'Update',
        delete: 'Delete',
        edit: 'Edit',
        createProduct: 'Create Product',
        updateProduct: 'Update Product',
        saving: 'Saving...',

        // Table
        productNameCol: 'Product Name',
        categoryCol: 'Category',
        priceCol: 'Price',
        stockCol: 'Stock',
        statusCol: 'Status',
        actionsCol: 'Actions',

        // Messages
        noProductsFound: 'No products found',
        deleteConfirm: 'Are you sure you want to delete this product?',
        productCreated: 'Product created successfully',
        productUpdated: 'Product updated successfully',
        productDeleted: 'Product deleted successfully',

        // Validation
        nameRequired: 'Product name must be at least 3 characters',
        priceRequired: 'Price must be greater than 0',
        stockNegative: 'Stock quantity cannot be negative',

        // Required
        required: '*'
    }
};

export const getProductText = (key, lang = 'en') => {
    return productsLocales[lang]?.[key] || key;
};

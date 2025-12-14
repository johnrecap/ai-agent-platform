// Mock data for dashboard analytics
// Converted from TypeScript dashboard/constants/mockData.ts

export const monthlySalesData = [
    { name: 'Oct', China: 4000, UAE: 2400, USA: 2400, Canada: 1200, Other: 1000 },
    { name: 'Nov', China: 3000, UAE: 1398, USA: 2210, Canada: 1000, Other: 800 },
    { name: 'Dec', China: 5000, UAE: 3800, USA: 3290, Canada: 2000, Other: 1500 },
];

export const weeklySalesData = [
    { name: 'Mon', China: 1200, UAE: 800, USA: 900, Canada: 400, Other: 200 },
    { name: 'Tue', China: 1500, UAE: 900, USA: 1200, Canada: 500, Other: 300 },
    { name: 'Wed', China: 1000, UAE: 700, USA: 800, Canada: 300, Other: 200 },
    { name: 'Thu', China: 2000, UAE: 1100, USA: 1500, Canada: 700, Other: 400 },
    { name: 'Fri', China: 2500, UAE: 1300, USA: 1800, Canada: 900, Other: 500 },
    { name: 'Sat', China: 1800, UAE: 1000, USA: 1300, Canada: 600, Other: 300 },
    { name: 'Sun', China: 1600, UAE: 900, USA: 1100, Canada: 500, Other: 200 },
];

export const dailySalesData = [
    { name: '8am', China: 200, UAE: 100, USA: 150, Canada: 50, Other: 20 },
    { name: '12pm', China: 400, UAE: 250, USA: 300, Canada: 120, Other: 80 },
    { name: '4pm', China: 600, UAE: 350, USA: 450, Canada: 200, Other: 100 },
    { name: '8pm', China: 500, UAE: 300, USA: 400, Canada: 180, Other: 90 },
];

export const subscriberData = [
    { day: 'Sun', value: 1200 },
    { day: 'Mon', value: 1800 },
    { day: 'Tue', value: 3874 },
    { day: 'Wed', value: 1500 },
    { day: 'Thu', value: 2400 },
    { day: 'Fri', value: 2800 },
    { day: 'Sat', value: 1900 },
];

export const salesDistributionData = [
    { name: 'Website', value: 374.82, color: '#6366f1' },
    { name: 'Mobile App', value: 241.60, color: '#2dd4bf' },
    { name: 'Other', value: 213.42, color: '#e2e8f0' },
];

export const integrationsData = [
    { id: '1', name: 'Stripe', type: 'Finance', rate: 40, profit: 650.00, icon: 'S', active: false },
    { id: '2', name: 'Zapier', type: 'CRM', rate: 80, profit: 720.50, icon: 'Z', active: true },
    { id: '3', name: 'Shopify', type: 'Marketplace', rate: 20, profit: 432.25, icon: 'Sh', active: false },
];

export const productsData = [
    { id: 1, name: 'Premium Analytics Pro', price: '$299.00', stock: 450, category: 'Software' },
    { id: 2, name: 'AI Chatbot License', price: '$1,200.00', stock: 120, category: 'Service' },
    { id: 3, name: 'Data Connector Pack', price: '$89.00', stock: 800, category: 'Add-on' },
    { id: 4, name: 'Enterprise Support', price: '$499.00', stock: 'Unlimited', category: 'Support' },
    { id: 5, name: 'Marketing Automation Tool', price: '$150.00', stock: 320, category: 'Software' },
    { id: 6, name: 'User Management Plugin', price: '$49.00', stock: 500, category: 'Plugin' },
];

export const customersData = [
    { id: 1, name: 'Esther Howard', email: 'esther@example.com', role: 'Admin', status: 'Active', spent: '$2,450' },
    { id: 2, name: 'Cameron Williamson', email: 'cameron@example.com', role: 'Editor', status: 'Inactive', spent: '$1,200' },
    { id: 3, name: 'Robert Fox', email: 'robert@example.com', role: 'Subscriber', status: 'Active', spent: '$450' },
    { id: 4, name: 'Jenny Wilson', email: 'jenny@example.com', role: 'Subscriber', status: 'Active', spent: '$890' },
    { id: 5, name: 'Marvin McKinney', email: 'marvin@example.com', role: 'Admin', status: 'Active', spent: '$3,200' },
];

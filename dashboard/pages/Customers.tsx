import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, Mail, Phone, Trash2, Edit, X, Plus, UserPlus, CheckCircle } from 'lucide-react';
import { customersData } from '../constants/mockData';
import { Customer } from '../types';

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>(customersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  
  const itemsPerPage = 5;

  // New Customer Form State
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    role: 'Subscriber',
    status: 'Active'
  });

  // Filter Logic
  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const toggleMenu = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent document click handler
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
        setCustomers(customers.filter(c => c.id !== id));
        setActiveMenuId(null);
    }
  };

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
    const customerToAdd: Customer = {
        id: newId,
        name: newCustomer.name,
        email: newCustomer.email,
        role: newCustomer.role,
        status: newCustomer.status,
        spent: '$0.00'
    };
    setCustomers([customerToAdd, ...customers]);
    setIsAddModalOpen(false);
    setNewCustomer({ name: '', email: '', role: 'Subscriber', status: 'Active' });
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-6 relative">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
        <div className="flex items-center gap-3">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search customers..." 
                  className="pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 transition-colors w-64" 
                  value={searchTerm}
                  onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // Reset to page 1 on search
                  }}
                />
            </div>
            <button 
                onClick={() => setShowFilter(!showFilter)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm shadow-sm transition-colors ${showFilter ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
                <Filter size={16} /> Filter
            </button>
            <button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none"
            >
                <UserPlus size={16} /> Add Customer
            </button>
        </div>
      </div>
      
      {/* Filter Panel (Visual only for now) */}
      {showFilter && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm animate-in slide-in-from-top-2 flex gap-4">
              <select className="px-3 py-1.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900">
                  <option>Role: All</option>
                  <option>Role: Admin</option>
                  <option>Role: Subscriber</option>
              </select>
              <select className="px-3 py-1.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900">
                  <option>Status: All</option>
                  <option>Status: Active</option>
                  <option>Status: Inactive</option>
              </select>
          </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-visible transition-colors min-h-[400px] flex flex-col">
        <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                    <tr>
                        <th className="px-6 py-4 font-medium">Name</th>
                        <th className="px-6 py-4 font-medium">Role</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Total Spent</th>
                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {currentItems.length > 0 ? (
                        currentItems.map((customer) => (
                        <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 group transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                                        {customer.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{customer.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{customer.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{customer.role}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    customer.status === 'Active' 
                                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' 
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                }`}>
                                    {customer.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{customer.spent}</td>
                            <td className="px-6 py-4 text-right relative">
                                <div className="flex justify-end items-center gap-2">
                                    <a href={`mailto:${customer.email}`} className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-gray-50 dark:bg-gray-700 rounded transition-colors" title="Send Email">
                                        <Mail size={16}/>
                                    </a>
                                    <button className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-gray-50 dark:bg-gray-700 rounded transition-colors" title="Call Customer">
                                        <Phone size={16}/>
                                    </button>
                                    <div className="relative">
                                        <button 
                                            onClick={(e) => toggleMenu(customer.id, e)}
                                            className={`p-1.5 rounded transition-colors ${activeMenuId === customer.id ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
                                        >
                                            <MoreHorizontal size={16}/>
                                        </button>
                                        
                                        {/* Dropdown Menu */}
                                        {activeMenuId === customer.id && (
                                            <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 z-10 animate-in fade-in zoom-in duration-200 overflow-hidden">
                                                <button className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                                                    <Edit size={12} /> Edit
                                                </button>
                                                <button className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                                                    <CheckCircle size={12} /> Verify
                                                </button>
                                                <div className="border-t border-gray-100 dark:border-gray-700 my-0.5"></div>
                                                <button 
                                                    onClick={() => handleDelete(customer.id)}
                                                    className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                                                >
                                                    <Trash2 size={12} /> Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                No customers found matching "{searchTerm}"
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <span>Showing {currentItems.length > 0 ? indexOfFirstItem + 1 : 0} - {Math.min(indexOfLastItem, filteredCustomers.length)} of {filteredCustomers.length} results</span>
            <div className="flex gap-2">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Prev
                </button>
                <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-3 py-1 border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                </button>
            </div>
        </div>
      </div>

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-700">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Add New Customer</h2>
                    <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleAddCustomer} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                        <input 
                            required
                            type="text" 
                            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="John Doe"
                            value={newCustomer.name}
                            onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                        <input 
                            required
                            type="email" 
                            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="john@example.com"
                            value={newCustomer.email}
                            onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                            <select 
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={newCustomer.role}
                                onChange={(e) => setNewCustomer({...newCustomer, role: e.target.value})}
                            >
                                <option value="Subscriber">Subscriber</option>
                                <option value="Editor">Editor</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                            <select 
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={newCustomer.status}
                                onChange={(e) => setNewCustomer({...newCustomer, status: e.target.value})}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button 
                            type="button" 
                            onClick={() => setIsAddModalOpen(false)}
                            className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none"
                        >
                            Add Customer
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
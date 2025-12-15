import React, { useState } from 'react';
import { Download, Printer, FileText, Plus, X, Trash2, Eye, CheckCircle, Clock } from 'lucide-react';
import { InvoiceData } from '../types';

const initialInvoices: InvoiceData[] = [
  { id: '#INV-2023-001', client: 'Acme Corp Ltd.', date: 'Oct 24, 2023', amount: 1200.00, status: 'Paid' },
  { id: '#INV-2023-002', client: 'Globex Inc.', date: 'Oct 25, 2023', amount: 850.50, status: 'Pending' },
  { id: '#INV-2023-003', client: 'Soylent Corp', date: 'Oct 26, 2023', amount: 3200.00, status: 'Paid' },
  { id: '#INV-2023-004', client: 'Initech', date: 'Oct 27, 2023', amount: 450.00, status: 'Overdue' },
  { id: '#INV-2023-005', client: 'Umbrella Corp', date: 'Oct 28, 2023', amount: 5000.00, status: 'Pending' },
];

const Invoice = () => {
  const [invoices, setInvoices] = useState<InvoiceData[]>(initialInvoices);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    client: '',
    amount: '',
    status: 'Pending' as const
  });

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const invoice: InvoiceData = {
        id: `#INV-2023-${String(invoices.length + 1).padStart(3, '0')}`,
        client: newInvoice.client,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        amount: parseFloat(newInvoice.amount) || 0,
        status: newInvoice.status
    };
    setInvoices([invoice, ...invoices]);
    setIsCreateModalOpen(false);
    setNewInvoice({ client: '', amount: '', status: 'Pending' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this invoice?')) {
        setInvoices(invoices.filter(inv => inv.id !== id));
    }
  };

  const handlePrint = (id: string) => {
      // In a real app, this would open a print view for the specific invoice
      window.print(); 
  };
  
  const handleDownload = (id: string) => {
      alert(`Downloading invoice ${id}...`);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Invoices</h1>
        <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
            <Plus size={16} /> Create Invoice
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                    <tr>
                        <th className="px-6 py-4 font-medium">Invoice ID</th>
                        <th className="px-6 py-4 font-medium">Client</th>
                        <th className="px-6 py-4 font-medium">Date</th>
                        <th className="px-6 py-4 font-medium">Amount</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {invoices.length > 0 ? (
                        invoices.map((invoice) => (
                        <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                            <td className="px-6 py-4 font-medium text-indigo-600 dark:text-indigo-400 font-mono">{invoice.id}</td>
                            <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{invoice.client}</td>
                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{invoice.date}</td>
                            <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">${invoice.amount.toFixed(2)}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 ${
                                    invoice.status === 'Paid' 
                                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' 
                                    : invoice.status === 'Pending'
                                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                }`}>
                                    {invoice.status === 'Paid' && <CheckCircle size={12} />}
                                    {invoice.status === 'Pending' && <Clock size={12} />}
                                    {invoice.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => handlePrint(invoice.id)} className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded transition-colors" title="Print">
                                        <Printer size={16} />
                                    </button>
                                    <button onClick={() => handleDownload(invoice.id)} className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded transition-colors" title="Download PDF">
                                        <Download size={16} />
                                    </button>
                                     <button onClick={() => handleDelete(invoice.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors opacity-0 group-hover:opacity-100" title="Delete">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                <div className="flex flex-col items-center justify-center">
                                    <FileText size={48} className="mb-4 text-gray-300 dark:text-gray-600" />
                                    <p className="text-lg font-medium text-gray-900 dark:text-white">No invoices found</p>
                                    <p className="text-sm">Create a new invoice to get started.</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-700">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Create New Invoice</h2>
                    <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleCreateInvoice} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client Name</label>
                        <input 
                            required
                            type="text" 
                            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g. Acme Corp"
                            value={newInvoice.client}
                            onChange={(e) => setNewInvoice({...newInvoice, client: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount ($)</label>
                        <input 
                            required
                            type="number" 
                            step="0.01"
                            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="0.00"
                            value={newInvoice.amount}
                            onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                        <select 
                            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={newInvoice.status}
                            onChange={(e) => setNewInvoice({...newInvoice, status: e.target.value as any})}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Overdue">Overdue</option>
                        </select>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button 
                            type="button" 
                            onClick={() => setIsCreateModalOpen(false)}
                            className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none"
                        >
                            Create Invoice
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default Invoice;
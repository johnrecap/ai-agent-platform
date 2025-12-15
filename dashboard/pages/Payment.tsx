import React from 'react';
import { CreditCard, DollarSign, Clock } from 'lucide-react';
import { CONFIG } from '../constants/config';

const Payment = () => {
  const handleAddPayment = () => {
    window.open(CONFIG.STRIPE_PAYMENT_LINK, '_blank');
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment</h1>
        <button 
            onClick={handleAddPayment}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
            Add Payment Method
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
            <div className="flex justify-between items-start mb-8">
                <CreditCard size={24} className="text-white/80" />
                <span className="bg-white/20 px-2 py-1 rounded text-xs">Primary</span>
            </div>
            <div className="mb-6">
                <p className="text-indigo-100 text-sm mb-1">Total Balance</p>
                <h3 className="text-3xl font-bold">$12,450.00</h3>
            </div>
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-xs text-indigo-100">**** **** **** 4582</p>
                    <p className="text-xs text-indigo-100">Exp 12/25</p>
                </div>
                <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
            </div>
         </div>

         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-center items-center gap-4 transition-colors">
             <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
                 <DollarSign size={24} />
             </div>
             <div className="text-center">
                 <p className="text-gray-500 dark:text-gray-400 text-sm">Last Month Income</p>
                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white">$4,250.32</h3>
             </div>
         </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-center items-center gap-4 transition-colors">
             <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center">
                 <Clock size={24} />
             </div>
             <div className="text-center">
                 <p className="text-gray-500 dark:text-gray-400 text-sm">Pending Transactions</p>
                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white">$120.00</h3>
             </div>
         </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-white">Transaction History</h3>
        </div>
        <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400">
                <tr>
                    <th className="px-6 py-3 font-medium">Description</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium text-right">Amount</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {[1, 2, 3, 4].map((i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">Monthly Subscription - Pro Plan</td>
                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">Oct 24, 2023</td>
                        <td className="px-6 py-4">
                            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">Completed</span>
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-gray-900 dark:text-white">$49.00</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payment;
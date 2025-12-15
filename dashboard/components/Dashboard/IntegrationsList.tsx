import React from 'react';
import { Layers, CheckSquare, Square } from 'lucide-react';
import { integrationsData } from '../../constants/mockData';

const IntegrationsList = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-full transition-colors duration-200">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
             <div className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-600 dark:text-gray-300"><Layers size={16} /></div>
             <h3 className="text-base font-bold text-gray-800 dark:text-white">List of Integration</h3>
        </div>
        <a href="#" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">See All</a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
            <thead>
                <tr className="text-left text-xs text-gray-400 dark:text-gray-500 border-b border-gray-50 dark:border-gray-700">
                    <th className="pb-3 pl-2 w-10">
                        <Square size={16} className="text-gray-300 dark:text-gray-600" />
                    </th>
                    <th className="pb-3 font-medium">APPLICATION</th>
                    <th className="pb-3 font-medium">TYPE</th>
                    <th className="pb-3 font-medium">RATE</th>
                    <th className="pb-3 font-medium text-right">PROFIT</th>
                </tr>
            </thead>
            <tbody>
                {integrationsData.map((item) => (
                    <tr key={item.id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="py-4 pl-2">
                             {item.active ? (
                                 <CheckSquare size={18} className="text-indigo-600 dark:text-indigo-400 cursor-pointer" />
                             ) : (
                                 <div className="w-[18px] h-[18px] border-2 border-gray-300 dark:border-gray-600 rounded hover:border-indigo-400 dark:hover:border-indigo-500 cursor-pointer"></div>
                             )}
                        </td>
                        <td className="py-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                                    item.name === 'Stripe' ? 'bg-indigo-600' : 
                                    item.name === 'Zapier' ? 'bg-orange-500' : 'bg-green-500'
                                }`}>
                                    {item.name === 'Stripe' && <span className="font-serif italic">S</span>}
                                    {item.name === 'Zapier' && <span>*</span>}
                                    {item.name === 'Shopify' && <span>S</span>}
                                </div>
                                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.name}</span>
                            </div>
                        </td>
                        <td className="py-4 text-sm text-gray-500 dark:text-gray-400">{item.type}</td>
                        <td className="py-4">
                            <div className="flex items-center gap-3">
                                <div className="w-24 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-indigo-500" 
                                        style={{ width: `${item.rate}%` }}
                                    ></div>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{item.rate}%</span>
                            </div>
                        </td>
                        <td className="py-4 text-sm font-bold text-gray-800 dark:text-gray-200 text-right">${item.profit.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default IntegrationsList;
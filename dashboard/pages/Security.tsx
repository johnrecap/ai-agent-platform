import React, { useState } from 'react';
import { ShieldCheck, Key, Smartphone, History, X, CheckCircle, AlertTriangle } from 'lucide-react';

const Security = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isTwoFactorModalOpen, setIsTwoFactorModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

  // Mock Login History Data
  const loginHistory = [
    { device: 'MacBook Pro', location: 'San Francisco, US', date: 'Oct 24, 2023 at 10:30 AM', ip: '192.168.1.1', status: 'Current Session' },
    { device: 'iPhone 13', location: 'San Francisco, US', date: 'Oct 23, 2023 at 4:15 PM', ip: '192.168.1.5', status: 'Success' },
    { device: 'Windows PC', location: 'London, UK', date: 'Oct 20, 2023 at 09:12 AM', ip: '10.0.0.4', status: 'Success' },
  ];

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        setIsPasswordModalOpen(false);
        alert("Password updated successfully.");
    }, 1000);
  };

  const handleEnable2FA = () => {
      setIsLoading(true);
      setTimeout(() => {
          setIsLoading(false);
          setIsTwoFactorEnabled(true);
          setIsTwoFactorModalOpen(false);
      }, 1500);
  };

  return (
    <div className="p-8 max-w-[1000px] mx-auto space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Security</h1>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm divide-y divide-gray-100 dark:divide-gray-700 transition-colors">
          
          {/* Password Section */}
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex gap-4">
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400 h-fit">
                      <Key size={24} />
                  </div>
                  <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Password</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Last changed 3 months ago</p>
                  </div>
              </div>
              <button 
                onClick={() => setIsPasswordModalOpen(true)}
                className="border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
              >
                Change Password
              </button>
          </div>

          {/* 2FA Section */}
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex gap-4">
                   <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400 h-fit">
                      <Smartphone size={24} />
                  </div>
                  <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Two-factor authentication</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-lg">Add an extra layer of security to your account by requiring a code in addition to your password.</p>
                  </div>
              </div>
              {isTwoFactorEnabled ? (
                  <button 
                    onClick={() => setIsTwoFactorEnabled(false)}
                    className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors whitespace-nowrap border border-red-100"
                  >
                    Disable
                  </button>
              ) : (
                  <button 
                    onClick={() => setIsTwoFactorModalOpen(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap"
                  >
                    Enable
                  </button>
              )}
          </div>
          
          {/* Login Activity Section */}
           <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex gap-4">
                   <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400 h-fit">
                      <History size={24} />
                  </div>
                  <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Login Activity</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Review your recent login sessions</p>
                  </div>
              </div>
              <button 
                onClick={() => setIsHistoryModalOpen(true)}
                className="border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
              >
                View History
              </button>
          </div>
      </div>

      {/* --- MODALS --- */}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-700">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Change Password</h2>
                    <button onClick={() => setIsPasswordModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handlePasswordChange} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                        <input type="password" required className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                        <input type="password" required className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                        <input type="password" required className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={() => setIsPasswordModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                        <button type="submit" disabled={isLoading} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-70">
                            {isLoading ? 'Updating...' : 'Update Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {/* 2FA Modal */}
      {isTwoFactorModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-700">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Enable 2FA</h2>
                    <button onClick={() => setIsTwoFactorModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-48 h-48 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                            {/* Placeholder for QR Code */}
                            <Smartphone size={48} className="text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Scan this QR code with your authenticator app.</p>
                        <p className="text-xs text-gray-400 font-mono bg-gray-50 dark:bg-gray-900 px-2 py-1 rounded">SECRET: ABCD 1234 EFGH 5678</p>
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Verification Code</label>
                         <input type="text" placeholder="123 456" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center tracking-widest font-mono text-lg" />
                    </div>
                    <button 
                        onClick={handleEnable2FA}
                        disabled={isLoading}
                        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                        {isLoading ? 'Verifying...' : 'Verify & Enable'}
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* History Modal */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-700 flex flex-col max-h-[90vh]">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Login History</h2>
                    <button onClick={() => setIsHistoryModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <X size={20} />
                    </button>
                </div>
                <div className="overflow-y-auto p-0">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700 sticky top-0">
                            <tr>
                                <th className="px-6 py-3 font-medium">Device</th>
                                <th className="px-6 py-3 font-medium">Location</th>
                                <th className="px-6 py-3 font-medium">Date</th>
                                <th className="px-6 py-3 font-medium">IP Address</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {loginHistory.map((item, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                        {item.device.includes('Mac') || item.device.includes('PC') ? <AlertTriangle size={16} className="text-gray-400" /> : <Smartphone size={16} className="text-gray-400" />}
                                        {item.device}
                                        {item.status === 'Current Session' && <span className="ml-2 text-[10px] bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded border border-green-200 dark:border-green-800">Current</span>}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{item.location}</td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{item.date}</td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 font-mono text-xs">{item.ip}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 flex justify-end">
                     <button 
                        onClick={() => {
                            alert('All other sessions logged out.');
                            setIsHistoryModalOpen(false);
                        }}
                        className="text-red-600 hover:text-red-700 text-sm font-medium hover:underline"
                    >
                        Log out all other sessions
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Security;
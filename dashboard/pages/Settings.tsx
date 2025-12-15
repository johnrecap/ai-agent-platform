import React, { useState, useRef } from 'react';
import { User, Bell, Lock, Globe, Camera, Save, Check, Moon, Smartphone, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'language'>('profile');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile State
  const [profileData, setProfileData] = useState({
    firstName: 'Young',
    lastName: 'Alaska',
    email: 'young.alaska@nexus.io',
    bio: 'Product Manager at Nexus.io',
    avatar: 'https://picsum.photos/seed/user1/200'
  });

  // Notification State
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: false,
    marketingEmails: true,
    securityAlerts: true
  });

  // Language State
  const [preferences, setPreferences] = useState({
    language: 'English (US)',
    timezone: 'UTC-05:00 Eastern Time',
    currency: 'USD'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        setIsLoading(false);
        alert('Settings saved successfully!');
    }, 1000);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileData(prev => ({ ...prev, avatar: reader.result as string }));
        };
        reader.readAsDataURL(file);
    }
  };

  const toggleNotification = (key: keyof typeof notifications) => {
      setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const NavButton = ({ id, icon: Icon, label }: { id: typeof activeTab, icon: any, label: string }) => (
    <button 
        onClick={() => setActiveTab(id)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
            activeTab === id 
            ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 shadow-sm' 
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
        }`}
    >
        <Icon size={18} /> {label}
    </button>
  );

  return (
    <div className="p-8 max-w-[1000px] mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>

      <div className="flex flex-col md:flex-row gap-8">
          {/* Settings Sidebar */}
          <div className="w-full md:w-64 space-y-1">
              <NavButton id="profile" icon={User} label="Profile" />
              <NavButton id="notifications" icon={Bell} label="Notifications" />
              <NavButton id="security" icon={Lock} label="Security" />
              <NavButton id="language" icon={Globe} label="Language & Region" />
          </div>

          {/* Settings Content Area */}
          <div className="flex-1 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors min-h-[500px]">
              
              {/* --- PROFILE TAB --- */}
              {activeTab === 'profile' && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Profile Settings</h2>
                    
                    <div className="flex items-center gap-6 mb-8">
                        <div className="relative group">
                            <img src={profileData.avatar} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-gray-100 dark:border-gray-600" />
                            <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                <Camera size={20} className="text-white" />
                            </div>
                        </div>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                        <div>
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                                >
                                    Change Photo
                                </button>
                                <button 
                                    onClick={() => setProfileData(prev => ({ ...prev, avatar: 'https://picsum.photos/seed/default/200' }))}
                                    className="text-red-500 text-sm font-medium hover:text-red-600 px-2"
                                >
                                    Remove
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                        </div>
                    </div>

                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">First Name</label>
                                <input 
                                    type="text" 
                                    value={profileData.firstName}
                                    onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Last Name</label>
                                <input 
                                    type="text" 
                                    value={profileData.lastName}
                                    onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                            <input 
                                type="email" 
                                value={profileData.email}
                                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Bio</label>
                            <textarea 
                                rows={3} 
                                value={profileData.bio}
                                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                            ></textarea>
                        </div>
                        
                        <div className="pt-4 flex justify-end">
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-70"
                            >
                                {isLoading ? 'Saving...' : <><Save size={16} /> Save Changes</>}
                            </button>
                        </div>
                    </form>
                  </div>
              )}

              {/* --- NOTIFICATIONS TAB --- */}
              {activeTab === 'notifications' && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Notification Preferences</h2>
                      
                      <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                              <div className="flex items-center gap-3">
                                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-lg">
                                      <Mail size={20} />
                                  </div>
                                  <div>
                                      <h3 className="text-sm font-bold text-gray-900 dark:text-white">Email Alerts</h3>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">Receive daily summaries and alerts.</p>
                                  </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" checked={notifications.emailAlerts} onChange={() => toggleNotification('emailAlerts')} className="sr-only peer" />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                              </label>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                              <div className="flex items-center gap-3">
                                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg">
                                      <Smartphone size={20} />
                                  </div>
                                  <div>
                                      <h3 className="text-sm font-bold text-gray-900 dark:text-white">Push Notifications</h3>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">Get real-time updates on your device.</p>
                                  </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" checked={notifications.pushNotifications} onChange={() => toggleNotification('pushNotifications')} className="sr-only peer" />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                              </label>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                              <div className="flex items-center gap-3">
                                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg">
                                      <Lock size={20} />
                                  </div>
                                  <div>
                                      <h3 className="text-sm font-bold text-gray-900 dark:text-white">Security Alerts</h3>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">Notify me about suspicious logins.</p>
                                  </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" checked={notifications.securityAlerts} onChange={() => toggleNotification('securityAlerts')} className="sr-only peer" />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                              </label>
                          </div>
                      </div>
                  </div>
              )}

              {/* --- SECURITY TAB --- */}
              {activeTab === 'security' && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Security Settings</h2>
                      
                      <form onSubmit={handleSave} className="space-y-4">
                          <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Current Password</label>
                              <input type="password" placeholder="••••••••" className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                              <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">New Password</label>
                                  <input type="password" placeholder="••••••••" className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                              </div>
                              <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm Password</label>
                                  <input type="password" placeholder="••••••••" className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                              </div>
                          </div>
                          
                          <div className="pt-4 border-t border-gray-100 dark:border-gray-700 mt-4">
                              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Two-Factor Authentication</h3>
                              <div className="flex items-center justify-between">
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account.</p>
                                  <button type="button" className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:underline">Enable 2FA</button>
                              </div>
                          </div>

                          <div className="pt-4 flex justify-end">
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-70"
                            >
                                {isLoading ? 'Updating...' : 'Update Password'}
                            </button>
                        </div>
                      </form>
                  </div>
              )}

              {/* --- LANGUAGE TAB --- */}
              {activeTab === 'language' && (
                   <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Language & Region</h2>

                      <div className="space-y-4">
                          <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Interface Language</label>
                              <select 
                                value={preferences.language}
                                onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                              >
                                  <option>English (US)</option>
                                  <option>English (UK)</option>
                                  <option>French</option>
                                  <option>Spanish</option>
                                  <option>German</option>
                              </select>
                          </div>
                          
                          <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Timezone</label>
                              <select 
                                value={preferences.timezone}
                                onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
                                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                              >
                                  <option>UTC-08:00 Pacific Time</option>
                                  <option>UTC-05:00 Eastern Time</option>
                                  <option>UTC+00:00 GMT</option>
                                  <option>UTC+01:00 Central European Time</option>
                              </select>
                          </div>

                          <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Currency</label>
                              <select 
                                value={preferences.currency}
                                onChange={(e) => setPreferences({...preferences, currency: e.target.value})}
                                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                              >
                                  <option>USD ($)</option>
                                  <option>EUR (€)</option>
                                  <option>GBP (£)</option>
                                  <option>JPY (¥)</option>
                              </select>
                          </div>

                          {/* Theme Toggle in Settings */}
                          <div className="pt-4 border-t border-gray-100 dark:border-gray-700 mt-4 flex items-center justify-between">
                              <div>
                                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Appearance</h3>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Customize how the app looks on your device.</p>
                              </div>
                              <button 
                                onClick={toggleTheme}
                                className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                              >
                                  {theme === 'dark' ? <><Moon size={16} /> Dark Mode</> : <><Globe size={16} /> Light Mode</>}
                              </button>
                          </div>
                      </div>

                       <div className="pt-4 flex justify-end">
                            <button 
                                onClick={(e) => handleSave(e)}
                                disabled={isLoading}
                                className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-70"
                            >
                                {isLoading ? 'Saving...' : 'Save Preferences'}
                            </button>
                        </div>
                   </div>
              )}
          </div>
      </div>
    </div>
  );
};

export default Settings;
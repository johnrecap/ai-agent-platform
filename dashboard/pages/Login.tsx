import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Command, Shield, User, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { CONFIG } from '../constants/config';

const Login = () => {
  const { handleGoogleLogin, loginAsDemoUser, user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';
  // Check if the user has actually updated the placeholder
  const isConfigured = CONFIG.GOOGLE_CLIENT_ID && !CONFIG.GOOGLE_CLIENT_ID.includes("YOUR_GOOGLE_CLIENT_ID");

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  // Initialize Google Button
  useEffect(() => {
    /* global google */
    if ((window as any).google && isConfigured) {
      try {
        (window as any).google.accounts.id.initialize({
            client_id: CONFIG.GOOGLE_CLIENT_ID,
            callback: handleGoogleLogin,
            auto_select: false,
        });

        (window as any).google.accounts.id.renderButton(
            document.getElementById("google-sign-in-button"),
            { 
              theme: theme === 'dark' ? "filled_black" : "outline", 
              size: "large", 
              width: 320, 
              type: "standard", 
              shape: "pill" 
            }
        );
      } catch (e) {
        console.error("Google Auth Error:", e);
      }
    }
  }, [handleGoogleLogin, isConfigured, theme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-200">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="p-10 text-center">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
              <Command size={32} />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Sign in to access the {CONFIG.APP_NAME}.</p>

          {/* Email Input */}
          <div className="mb-5 text-left">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
            <input 
                type="email" 
                id="email"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="name@work-email.com"
            />
          </div>

          {/* Google Login Section */}
          <div className="min-h-[50px] flex justify-center mb-6">
            {isConfigured ? (
                <div id="google-sign-in-button"></div>
            ) : (
                <div className="flex flex-col items-center gap-2 text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-4 py-3 rounded-lg border border-amber-200 dark:border-amber-800 text-sm w-full">
                    <div className="flex items-center gap-2">
                        <AlertCircle size={16} />
                        <span className="font-semibold">Setup Required</span>
                    </div>
                    <p className="text-xs text-center opacity-90">
                        Add your Google Client ID to <code>constants/config.ts</code> to enable Google Login.
                    </p>
                </div>
            )}
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or use Demo Account</span>
            </div>
          </div>

          {/* Demo Buttons */}
          <div className="space-y-3">
            <button 
                onClick={() => loginAsDemoUser('admin')}
                className="w-full flex items-center justify-center gap-3 p-3 bg-gray-900 dark:bg-gray-700 text-white rounded-xl hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors font-medium"
            >
                <Shield size={18} />
                Sign in as Admin
            </button>
            <button 
                onClick={() => loginAsDemoUser('user')}
                className="w-full flex items-center justify-center gap-3 p-3 bg-white dark:bg-transparent border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
                <User size={18} />
                Sign in as User
            </button>
          </div>

          <div className="mt-8 text-xs text-gray-400 dark:text-gray-500">
             Protected by Google Identity Services & Nexus Security
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
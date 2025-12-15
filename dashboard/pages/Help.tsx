import React, { useState } from 'react';
import { Search, Book, MessageCircle, Mail, FileQuestion, X, ChevronRight, Send, ExternalLink, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  category: string;
  readTime: string;
  content: string;
}

const articlesData: Article[] = [
  { 
    id: 1, 
    title: 'Getting started with Nexus AI', 
    category: 'Onboarding',
    readTime: '3 min read',
    content: 'Welcome to Nexus AI! This guide will walk you through the initial setup process. First, navigate to your Settings page to configure your profile and timezone preferences. Next, connect your first data source via the "Integrations" tab. Once connected, the dashboard will automatically populate with sample data until real traffic is detected.' 
  },
  { 
    id: 2, 
    title: 'How to configure your first automation', 
    category: 'Automation',
    readTime: '5 min read',
    content: 'Automations in Nexus AI allow you to streamline repetitive tasks. Go to the Automation page and click "New Workflow". Select a trigger (e.g., "New Lead") and an action (e.g., "Send Email"). You can use our visual builder to add conditions and delays. Remember to test your workflow before activating it.' 
  },
  { 
    id: 3, 
    title: 'Understanding billing and invoices', 
    category: 'Billing',
    readTime: '4 min read',
    content: 'Your billing cycle starts on the day you upgrade to a paid plan. Invoices are generated monthly and sent to the billing email address on file. You can view, download, and pay invoices directly from the "Invoice" page. We support major credit cards and Stripe payments.' 
  },
  { 
    id: 4, 
    title: 'API Authentication guide', 
    category: 'Developer',
    readTime: '8 min read',
    content: 'Nexus AI uses Bearer Token authentication. To generate an API key, go to Settings > Developer. Include this key in the "Authorization" header of your HTTP requests as "Bearer YOUR_API_KEY". Rate limits apply based on your subscription tier. See the full API reference for endpoint details.' 
  },
  { 
    id: 5, 
    title: 'Troubleshooting connection issues', 
    category: 'Support',
    readTime: '3 min read',
    content: 'If you are experiencing connectivity issues, first check your internet connection. If the problem persists, try clearing your browser cache or using an incognito window. Ensure that your firewall is not blocking Nexus AI domains. If you still cannot connect, contact our support team.' 
  }
];

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{sender: 'user' | 'agent', text: string}[]>([
      { sender: 'agent', text: 'Hi! How can I help you today?' }
  ]);

  const filteredArticles = articlesData.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    article.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendChat = (e: React.FormEvent) => {
      e.preventDefault();
      if (!chatMessage.trim()) return;
      
      const newHistory = [...chatHistory, { sender: 'user' as const, text: chatMessage }];
      setChatHistory(newHistory);
      setChatMessage('');

      // Simulate bot response
      setTimeout(() => {
          setChatHistory(prev => [...prev, { sender: 'agent', text: 'Thanks for your message. A support agent will be with you shortly. In the meantime, have you checked our documentation?' }]);
      }, 1000);
  };

  return (
    <div className="p-8 max-w-[1200px] mx-auto space-y-8">
      
      {/* Search Header */}
      <div className="text-center py-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How can we help you?</h1>
          <div className="max-w-xl mx-auto relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
               <input 
                 type="text" 
                 placeholder="Search for articles, guides, and help..." 
                 className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:border-indigo-300 outline-none transition-colors" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
          </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
                  <Book size={24} />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Documentation</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Browse our detailed guides and API references</p>
              <button 
                onClick={() => setSearchQuery('API')} // Quick shortcut to filter docs
                className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline mt-auto"
              >
                Read Docs &rarr;
              </button>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle size={24} />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Live Chat</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Chat with our support team in real-time</p>
              <button 
                onClick={() => setIsChatOpen(true)}
                className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline mt-auto"
              >
                Start Chat &rarr;
              </button>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center">
               <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mb-4">
                  <Mail size={24} />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Email Support</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Get help via email for complex issues</p>
              <a href="mailto:support@nexus.io" className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline mt-auto">Send Email &rarr;</a>
          </div>
      </div>

      {/* Articles List */}
      <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Articles'}
          </h2>
           <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm divide-y divide-gray-100 dark:divide-gray-700 transition-colors">
               {filteredArticles.length > 0 ? (
                   filteredArticles.map((article) => (
                   <button 
                        key={article.id} 
                        onClick={() => setSelectedArticle(article)}
                        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors text-left group"
                   >
                       <div className="flex items-start gap-4">
                           <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                <FileQuestion size={18} />
                           </div>
                           <div>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white block mb-1">{article.title}</span>
                                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{article.category}</span>
                                    <span>{article.readTime}</span>
                                </div>
                           </div>
                       </div>
                       <ChevronRight size={18} className="text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400" />
                   </button>
               ))
               ) : (
                   <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                       <p>No articles found matching your search.</p>
                       <button onClick={() => setSearchQuery('')} className="text-indigo-600 hover:underline mt-2 text-sm">Clear Search</button>
                   </div>
               )}
           </div>
      </div>

      {/* Article Viewer Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-700">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-start bg-gray-50 dark:bg-gray-700/50 rounded-t-2xl">
                    <div className="pr-4">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{selectedArticle.category}</span>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1">{selectedArticle.title}</h2>
                    </div>
                    <button onClick={() => setSelectedArticle(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 mt-1">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-8 overflow-y-auto prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                    <p className="leading-relaxed whitespace-pre-line">{selectedArticle.content}</p>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 rounded-b-2xl">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Was this article helpful?</span>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-white dark:hover:bg-gray-600 rounded-lg text-gray-500 hover:text-green-600 transition-colors" title="Yes"><ThumbsUp size={16} /></button>
                        <button className="p-2 hover:bg-white dark:hover:bg-gray-600 rounded-lg text-gray-500 hover:text-red-600 transition-colors" title="No"><ThumbsDown size={16} /></button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Live Chat Widget Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md h-[500px] flex flex-col animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="px-4 py-3 bg-indigo-600 text-white flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <MessageCircle size={16} />
                            </div>
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-indigo-600 rounded-full"></span>
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">Nexus Support</h3>
                            <p className="text-xs text-indigo-100">Typically replies in 5m</p>
                        </div>
                    </div>
                    <button onClick={() => setIsChatOpen(false)} className="text-white/80 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                    {chatHistory.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                                msg.sender === 'user' 
                                ? 'bg-indigo-600 text-white rounded-br-none' 
                                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-bl-none shadow-sm'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSendChat} className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-600 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                        <input 
                            type="text" 
                            placeholder="Type a message..." 
                            className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-900 dark:text-white"
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            autoFocus
                        />
                        <button 
                            type="submit" 
                            disabled={!chatMessage.trim()}
                            className="text-indigo-600 dark:text-indigo-400 disabled:opacity-50 hover:scale-110 transition-transform"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

    </div>
  );
};

export default Help;
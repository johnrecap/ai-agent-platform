import React, { useState } from 'react';
import { Search, Plus, MessageCircle, Bot, Download, MoreHorizontal, Sparkles, X, Trash2, Edit } from 'lucide-react';

const ChatList = () => {
  const [activeChatId, setActiveChatId] = useState<number | null>(1);
  const [showAgentSelector, setShowAgentSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [agentMenuId, setAgentMenuId] = useState<number | null>(null);
  
  const [chats, setChats] = useState([
    { id: 1, name: 'Jane Doe', message: 'Hey, can you check the sales report?', time: '12:30 PM', unread: 2, status: 'online', source: 'whatsapp', avatarSeed: 11 },
    { id: 2, name: 'John Smith', message: 'Meeting confirmed for tomorrow.', time: '11:15 AM', unread: 0, status: 'offline', source: 'messenger', avatarSeed: 12 },
    { id: 3, name: 'Alice Johnson', message: 'Can we reschedule?', time: '09:45 AM', unread: 1, status: 'online', source: 'other', avatarSeed: 13 },
    { id: 4, name: 'Robert Fox', message: 'Thanks for the update!', time: 'Yesterday', unread: 0, status: 'offline', source: 'whatsapp', avatarSeed: 14 },
    { id: 5, name: 'Cody Fisher', message: 'The project is ready.', time: 'Yesterday', unread: 5, status: 'busy', source: 'messenger', avatarSeed: 15 },
    { id: 6, name: 'Esther Howard', message: 'Call me when you are free.', time: 'Oct 24', unread: 0, status: 'online', source: 'other', avatarSeed: 16 },
  ]);

  const [activeAgents, setActiveAgents] = useState([
    { id: 1, name: 'Nexus Bot', role: 'Support', status: 'online' },
    { id: 2, name: 'Sales Genius', role: 'Sales', status: 'busy' },
    { id: 3, name: 'Copywriter', role: 'Content', status: 'offline' },
  ]);

  const availableNewAgents = [
    { name: 'Legal Advisor', role: 'Legal' },
    { name: 'HR Assistant', role: 'HR' },
    { name: 'Data Analyst', role: 'Analytics' },
    { name: 'Code Reviewer', role: 'Engineering' }
  ];

  // Close menus when clicking outside logic would go here in a real app or use a click-outside hook
  // For now, we rely on specific interactions to close

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchTerm.toLowerCase()) || chat.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || chat.source === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleChatClick = (id: number) => {
    setActiveChatId(id);
    setChats(prevChats => 
        prevChats.map(chat => 
            chat.id === id ? { ...chat, unread: 0 } : chat
        )
    );
  };

  const handleAddAgent = (agentTemplate: { name: string, role: string }) => {
    const newAgent = {
        id: Date.now(),
        name: agentTemplate.name,
        role: agentTemplate.role,
        status: 'online'
    };
    setActiveAgents([...activeAgents, newAgent]);
    setShowAgentSelector(false);
  };

  const deleteAgent = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setActiveAgents(prev => prev.filter(a => a.id !== id));
    setAgentMenuId(null);
  };

  const toggleAgentMenu = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setAgentMenuId(agentMenuId === id ? null : id);
  };

  return (
    <div className="w-80 border-r border-gray-100 dark:border-gray-700 flex flex-col transition-colors" onClick={() => setAgentMenuId(null)}>
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4 relative z-20">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Messages</h2>
                <div className="flex items-center gap-2">
                    {/* Add Agent Button & Dropdown */}
                    <div className="relative">
                        <button 
                            onClick={(e) => { e.stopPropagation(); setShowAgentSelector(!showAgentSelector); }}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-lg text-xs font-semibold hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors" 
                            title="Add AI Agent"
                        >
                            <Sparkles size={14} />
                            New Agent
                        </button>

                        {/* Dropdown Menu */}
                        {showAgentSelector && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-1 animate-in fade-in zoom-in duration-200 z-50">
                                <div className="flex justify-between items-center px-3 py-2 border-b border-gray-50 dark:border-gray-700 mb-1">
                                    <span className="text-xs font-bold text-gray-500">Select Template</span>
                                    <button onClick={(e) => { e.stopPropagation(); setShowAgentSelector(false); }} className="text-gray-400 hover:text-gray-600">
                                        <X size={12} />
                                    </button>
                                </div>
                                {availableNewAgents.map((agent, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => { e.stopPropagation(); handleAddAgent(agent); }}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg flex items-center gap-2"
                                    >
                                        <div className="w-5 h-5 bg-indigo-100 dark:bg-indigo-900/50 rounded-md flex items-center justify-center text-indigo-600">
                                            <Bot size={12} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-xs">{agent.name}</span>
                                            <span className="text-[10px] text-gray-400">{agent.role}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-lg text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors" title="Connect New Plugin">
                        <Plus size={14} />
                        Plugin
                    </button>
                </div>
            </div>
            
            {/* Connected Channels / Plugins */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
                    <button 
                        onClick={() => setActiveFilter('all')}
                        className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeFilter === 'all' ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}
                    >
                    All
                    </button>
                    <button 
                        onClick={() => setActiveFilter('whatsapp')}
                        className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeFilter === 'whatsapp' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200' : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-100 dark:border-green-800 hover:bg-green-100'}`}
                    >
                    <MessageCircle size={12} /> WhatsApp
                    </button>
                    <button 
                        onClick={() => setActiveFilter('messenger')}
                        className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeFilter === 'messenger' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800 hover:bg-blue-100'}`}
                    >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    Messenger
                    </button>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search chats..." 
                    className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
            {/* AI Agents Section */}
            <div className="px-4 py-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        AI Agents <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded-md text-[10px]">{activeAgents.length}</span>
                    </h3>
                    <div className="flex items-center gap-1">
                        <button className="p-1 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" title="Download List">
                            <Download size={14} />
                        </button>
                        <button 
                            className="p-1 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" 
                            title="Add Agent" 
                            onClick={(e) => { e.stopPropagation(); setShowAgentSelector(true); }}
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                </div>
                <div className="space-y-1">
                    {activeAgents.map(agent => (
                        <div key={agent.id} className="relative">
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer group transition-colors">
                                <div className="relative">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                                        <Bot size={16} />
                                    </div>
                                    <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 border-2 border-white dark:border-gray-800 rounded-full ${
                                        agent.status === 'online' ? 'bg-green-500' : 
                                        agent.status === 'busy' ? 'bg-red-500' : 'bg-gray-400'
                                    }`}></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{agent.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{agent.role}</p>
                                </div>
                                <button 
                                    onClick={(e) => toggleAgentMenu(e, agent.id)}
                                    className={`text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-opacity ${agentMenuId === agent.id ? 'opacity-100 text-gray-600' : 'opacity-0 group-hover:opacity-100'}`}
                                >
                                    <MoreHorizontal size={14} />
                                </button>
                            </div>

                            {/* Agent Dropdown */}
                            {agentMenuId === agent.id && (
                                <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 z-30 animate-in fade-in zoom-in duration-200 overflow-hidden">
                                    <button className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                                        <Edit size={12} /> Edit
                                    </button>
                                    <button 
                                        onClick={(e) => deleteAgent(e, agent.id)}
                                        className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                                    >
                                        <Trash2 size={12} /> Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Chats Section Header */}
            <div className="px-4 pt-4 pb-2">
                 <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Recent Chats</h3>
            </div>

            {filteredChats.length > 0 ? (
                filteredChats.map((chat) => (
                    <div 
                        key={chat.id} 
                        onClick={() => handleChatClick(chat.id)}
                        className={`px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors ${
                            activeChatId === chat.id 
                                ? 'bg-indigo-50/80 dark:bg-indigo-900/20 border-l-2 border-indigo-600 dark:border-indigo-400 -ml-[1px]' 
                                : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 border-l-2 border-transparent'
                        }`}
                    >
                        <div className="relative">
                                <img src={`https://picsum.photos/seed/${chat.avatarSeed}/50`} alt="User" className="w-10 h-10 rounded-full object-cover" />
                                {/* Status Indicator */}
                                <div className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white dark:border-gray-800 rounded-full ${
                                    chat.status === 'online' ? 'bg-green-500' : 
                                    chat.status === 'busy' ? 'bg-red-500' : 'bg-gray-400'
                                }`}></div>
                                
                                {/* Plugin Source Icon */}
                                <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] text-white border border-white dark:border-gray-800 ${
                                    chat.source === 'whatsapp' ? 'bg-green-500' : chat.source === 'messenger' ? 'bg-blue-500' : 'bg-gray-400'
                                }`}>
                                    {chat.source === 'whatsapp' ? <MessageCircle size={8} /> : chat.source === 'messenger' ? 'f' : 'w'}
                                </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className={`text-sm truncate ${chat.unread > 0 || activeChatId === chat.id ? 'font-bold text-gray-900 dark:text-white' : 'font-semibold text-gray-700 dark:text-gray-300'}`}>{chat.name}</h4>
                                <span className="text-xs text-gray-400">{chat.time}</span>
                            </div>
                            <p className={`text-xs truncate ${chat.unread > 0 ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>{chat.message}</p>
                        </div>
                        {chat.unread > 0 && (
                            <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white text-[10px] shrink-0 animate-in zoom-in duration-200">
                                {chat.unread}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                    No chats found matching filters.
                </div>
            )}
        </div>
    </div>
  );
};

export default ChatList;
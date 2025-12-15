import React, { useState, useRef, useEffect } from 'react';
import { Phone, Video, MoreVertical, Paperclip, Send, Sparkles, Trash2, User, BellOff, Ban } from 'lucide-react';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'me';
    time: string;
}

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi there! Did you get a chance to look at the new dashboard designs?", sender: 'user', time: '10:00 AM' },
    { id: 2, text: "Yes! They look amazing. I especially love the sales overview chart.", sender: 'me', time: '10:05 AM' },
    { id: 3, text: "When can we push this to production?", sender: 'me', time: '10:06 AM' }
  ]);
  const [inputText, setInputText] = useState('');
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
        id: Date.now(),
        text: inputText,
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const handleAction = (action: string) => {
      alert(`${action} action triggered`);
      setShowHeaderMenu(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50/30 dark:bg-gray-900/50" onClick={() => setShowHeaderMenu(false)}>
        {/* Header */}
        <div className="h-16 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between px-6 shrink-0 transition-colors relative">
            <div className="flex items-center gap-3">
                <img src="https://picsum.photos/seed/11/50" alt="Active User" className="w-10 h-10 rounded-full object-cover" />
                <div>
                    <h3 className="font-bold text-gray-800 dark:text-white text-sm">Jane Doe</h3>
                    <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online</p>
                </div>
            </div>
            <div className="flex items-center gap-4 text-gray-400 relative">
                <button onClick={() => alert('Starting audio call...')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Phone size={20} /></button>
                <button onClick={() => alert('Starting video call...')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Video size={20} /></button>
                <button 
                    onClick={(e) => { e.stopPropagation(); setShowHeaderMenu(!showHeaderMenu); }}
                    className={`hover:text-gray-600 dark:hover:text-gray-200 transition-colors ${showHeaderMenu ? 'text-gray-600 dark:text-gray-200' : ''}`}
                >
                    <MoreVertical size={20} />
                </button>

                {/* Header Dropdown Menu */}
                {showHeaderMenu && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-1 animate-in fade-in zoom-in duration-200 z-50 overflow-hidden">
                         <button onClick={() => handleAction('View Profile')} className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                            <User size={14} /> View Profile
                        </button>
                        <button onClick={() => handleAction('Mute Notifications')} className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                            <BellOff size={14} /> Mute Notifications
                        </button>
                        <button onClick={() => setMessages([])} className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                            <Trash2 size={14} /> Clear Chat
                        </button>
                        <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                        <button onClick={() => handleAction('Block User')} className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                            <Ban size={14} /> Block User
                        </button>
                    </div>
                )}
            </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="flex justify-center">
                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-3 py-1 rounded-full">Today</span>
            </div>
            
            {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 max-w-[80%] ${msg.sender === 'me' ? 'ml-auto flex-row-reverse' : ''}`}>
                    <img src={`https://picsum.photos/seed/${msg.sender === 'user' ? 11 : 12}/50`} className="w-8 h-8 rounded-full self-end mb-1" />
                    <div>
                            <div className={`p-3 rounded-2xl shadow-sm ${
                                msg.sender === 'me' 
                                ? 'bg-indigo-600 text-white rounded-br-none' 
                                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-bl-none'
                            }`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                            <span className={`text-[10px] text-gray-400 ${msg.sender === 'me' ? 'mr-1 text-right' : 'ml-1'} block mt-1`}>{msg.time}</span>
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 shrink-0 transition-colors">
            <form onSubmit={handleSend} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-2 border border-gray-200 dark:border-gray-600 focus-within:ring-2 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-900 focus-within:border-indigo-300 transition-all">
                <button type="button" onClick={() => alert('File picker')} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" title="Attach file"><Paperclip size={20} /></button>
                <button type="button" onClick={() => alert('AI Assist')} className="text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 transition-colors" title="Ask AI Agent">
                    <Sparkles size={20} />
                </button>
                <input 
                    type="text" 
                    placeholder="Type a message or prompt AI..." 
                    className="flex-1 bg-transparent border-none focus:outline-none text-sm py-2 text-gray-900 dark:text-white"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)} 
                />
                <button 
                    type="submit" 
                    className={`p-2 rounded-lg transition-colors ${inputText.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-default'}`}
                    disabled={!inputText.trim()}
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    </div>
  );
};

export default ChatWindow;
import React, { useState, useEffect } from 'react';
import { Zap, Play, Pause, Settings, MoreHorizontal, Plus, X, Trash2, Edit } from 'lucide-react';

interface Workflow {
  id: number;
  title: string;
  description: string;
  status: 'Active' | 'Paused';
  color: 'orange' | 'blue' | 'green' | 'purple';
}

const initialWorkflows: Workflow[] = [
  { id: 1, title: 'New Lead Follow-up', description: 'Automatically send a welcome email and schedule a follow-up task when a new lead is added to CRM.', status: 'Active', color: 'orange' },
  { id: 2, title: 'Weekly Report Generator', description: 'Compiles sales and traffic data into a PDF and emails it to the admin team every Monday morning.', status: 'Paused', color: 'blue' },
  { id: 3, title: 'Cart Abandonment Recovery', description: 'Triggers a sequence of reminder emails when a user leaves items in their cart for more than 24 hours.', status: 'Active', color: 'green' },
];

const Automation = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>(initialWorkflows);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [newWorkflow, setNewWorkflow] = useState({ title: '', description: '' });

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleToggleStatus = (id: number) => {
    setWorkflows(workflows.map(wf => 
      wf.id === id 
        ? { ...wf, status: wf.status === 'Active' ? 'Paused' : 'Active' } 
        : wf
    ));
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this workflow?')) {
      setWorkflows(workflows.filter(wf => wf.id !== id));
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkflow.title || !newWorkflow.description) return;

    const colors: Workflow['color'][] = ['orange', 'blue', 'green', 'purple'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const created: Workflow = {
      id: Date.now(),
      title: newWorkflow.title,
      description: newWorkflow.description,
      status: 'Active',
      color: randomColor
    };

    setWorkflows([...workflows, created]);
    setIsModalOpen(false);
    setNewWorkflow({ title: '', description: '' });
  };

  const toggleMenu = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const getColorClasses = (color: string) => {
    switch(color) {
      case 'orange': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400';
      case 'blue': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'green': return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'purple': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Automation <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-xs px-2 py-0.5 rounded-full border border-purple-200 dark:border-purple-800">BETA</span>
        </h1>
        <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none"
        >
            <Zap size={16} /> New Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map((wf) => (
            <div key={wf.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors group relative">
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-lg ${getColorClasses(wf.color)}`}>
                        <Zap size={24} />
                    </div>
                    
                    <div className="relative">
                        <button 
                            onClick={(e) => toggleMenu(e, wf.id)}
                            className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <MoreHorizontal size={20} />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {activeMenuId === wf.id && (
                            <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 z-10 animate-in fade-in zoom-in duration-200 overflow-hidden">
                                <button className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                                    <Settings size={12} /> Configure
                                </button>
                                <button className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                                    <Edit size={12} /> Rename
                                </button>
                                <div className="border-t border-gray-100 dark:border-gray-700 my-0.5"></div>
                                <button 
                                    onClick={() => handleDelete(wf.id)}
                                    className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                                >
                                    <Trash2 size={12} /> Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                    {wf.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2 h-10">
                    {wf.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${wf.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-gray-300 dark:bg-gray-600'}`}></span>
                        <span className={`text-sm font-medium ${wf.status === 'Active' ? 'text-green-700 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                            {wf.status}
                        </span>
                    </div>
                    <button 
                        onClick={() => handleToggleStatus(wf.id)}
                        className={`p-2 rounded-full transition-colors ${wf.status === 'Active' ? 'hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-500 hover:text-red-600' : 'hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-500 hover:text-green-600'}`}
                        title={wf.status === 'Active' ? 'Pause Workflow' : 'Resume Workflow'}
                    >
                        {wf.status === 'Active' ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                </div>
            </div>
        ))}

        {/* Create New Card (Placeholder style) */}
        <button 
            onClick={() => setIsModalOpen(true)}
            className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all group min-h-[250px]"
        >
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
                <Plus size={24} />
            </div>
            <span className="font-semibold">Create Workflow</span>
        </button>
      </div>

      {/* New Workflow Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-700">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Zap size={18} className="text-indigo-600" /> New Automation
                    </h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleCreate} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Workflow Title</label>
                        <input 
                            required
                            type="text" 
                            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g. Order Confirmation"
                            value={newWorkflow.title}
                            onChange={(e) => setNewWorkflow({...newWorkflow, title: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea 
                            required
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                            placeholder="Describe what this automation does..."
                            value={newWorkflow.description}
                            onChange={(e) => setNewWorkflow({...newWorkflow, description: e.target.value})}
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button 
                            type="button" 
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default Automation;
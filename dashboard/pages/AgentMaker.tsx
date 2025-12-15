import React, { useState, useRef, useEffect } from 'react';
import { Bot, Save, Sparkles, Sliders, Globe, Code, FileText, Cpu, Play, Terminal, X, Send, MessageSquare } from 'lucide-react';
import { AgentService } from '../services/db';

const AgentMaker = () => {
  const [agentConfig, setAgentConfig] = useState({
    name: '',
    role: '',
    description: '',
    model: 'gemini-2.5-flash',
    temperature: 0.7,
    instructions: '',
    capabilities: {
      webSearch: true,
      codeInterpreter: false,
      fileAnalysis: false
    }
  });

  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [testMessages, setTestMessages] = useState<{role: 'user' | 'agent', content: string}[]>([]);
  const [testInput, setTestInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleCapabilityToggle = (key: keyof typeof agentConfig.capabilities) => {
    setAgentConfig(prev => ({
      ...prev,
      capabilities: {
        ...prev.capabilities,
        [key]: !prev.capabilities[key]
      }
    }));
  };

  useEffect(() => {
    if (isTestModalOpen) {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [testMessages, isTestModalOpen, isThinking]);

  const handleSaveAgent = () => {
    if (!agentConfig.name) {
        alert("Please provide an Agent Name.");
        return;
    }
    setIsSaving(true);
    // Here you would call AgentService.save(agentConfig)
    setTimeout(() => {
        setIsSaving(false);
        alert(`Agent "${agentConfig.name}" saved successfully!`);
    }, 1000);
  };

  const openTestRun = () => {
    if (!agentConfig.name) {
         alert("Please name your agent before testing.");
         return;
    }
    setTestMessages([
        { role: 'agent', content: `Hello! I am ${agentConfig.name}. ${agentConfig.role ? `I work as a ${agentConfig.role}.` : ''} How can I help you today?` }
    ]);
    setIsTestModalOpen(true);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testInput.trim()) return;

    // Add user message
    const newMessages = [...testMessages, { role: 'user' as const, content: testInput }];
    setTestMessages(newMessages);
    const userPrompt = testInput;
    setTestInput('');
    setIsThinking(true);

    try {
        // Connect to Real Backend or Mock via Service Layer
        const responseText = await AgentService.generateResponse(userPrompt, agentConfig);
        
        setTestMessages(prev => [...prev, { role: 'agent', content: responseText }]);
    } catch (error) {
        setTestMessages(prev => [...prev, { role: 'agent', content: "Error: Failed to generate response from backend." }]);
    } finally {
        setIsThinking(false);
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Custom Agent Maker <Sparkles size={20} className="text-purple-500" />
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Design, configure, and deploy specialized AI agents for your workflow.</p>
        </div>
        <div className="flex gap-3">
            <button 
                onClick={openTestRun}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
                <Play size={16} /> Test Run
            </button>
            <button 
                onClick={handleSaveAgent}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isSaving ? (
                    <>Saving...</>
                ) : (
                    <><Save size={16} /> Save Agent</>
                )}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Configuration */}
        <div className="lg:col-span-8 space-y-6">
            
            {/* Identity Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Bot size={20} className="text-indigo-500" /> Agent Identity
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Agent Name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Legal Eagle"
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white outline-none transition-all"
                                value={agentConfig.name}
                                onChange={(e) => setAgentConfig({...agentConfig, name: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Role / Title</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Senior Contract Reviewer"
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white outline-none transition-all"
                                value={agentConfig.role}
                                onChange={(e) => setAgentConfig({...agentConfig, role: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Short Description</label>
                        <textarea 
                            rows={4}
                            placeholder="Briefly describe what this agent does..."
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white outline-none transition-all resize-none"
                            value={agentConfig.description}
                            onChange={(e) => setAgentConfig({...agentConfig, description: e.target.value})}
                        />
                    </div>
                </div>
            </div>

            {/* Brain & Instructions */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Cpu size={20} className="text-purple-500" /> Intelligence Configuration
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Model</label>
                        <select 
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white outline-none transition-all"
                            value={agentConfig.model}
                            onChange={(e) => setAgentConfig({...agentConfig, model: e.target.value})}
                        >
                            <option value="gemini-2.5-flash">Gemini 2.5 Flash (Fast & Efficient)</option>
                            <option value="gemini-2.5-flash-thinking">Gemini 2.5 Flash Thinking (Reasoning)</option>
                            <option value="gemini-pro">Gemini Pro (Complex Tasks)</option>
                        </select>
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex justify-between">
                            <span>Creativity (Temperature)</span>
                            <span className="text-gray-500">{agentConfig.temperature}</span>
                         </label>
                         <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.1" 
                            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            value={agentConfig.temperature}
                            onChange={(e) => setAgentConfig({...agentConfig, temperature: parseFloat(e.target.value)})}
                         />
                         <div className="flex justify-between text-xs text-gray-400 mt-1">
                             <span>Precise</span>
                             <span>Balanced</span>
                             <span>Creative</span>
                         </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">System Instructions (The Prompt)</label>
                    <div className="relative">
                        <textarea 
                            rows={8}
                            placeholder="You are an expert legal assistant. Your goal is to review contracts for potential risks. Always cite specific clauses..."
                            className="w-full px-4 py-3 bg-gray-900 text-gray-300 font-mono text-sm border border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-y"
                            value={agentConfig.instructions}
                            onChange={(e) => setAgentConfig({...agentConfig, instructions: e.target.value})}
                        />
                        <div className="absolute top-3 right-3 text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                            Markdown Supported
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Tip: Be specific about the persona, tone, and constraints. Provide examples of inputs and desired outputs.
                    </p>
                </div>
            </div>

            {/* Capabilities */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Sliders size={20} className="text-orange-500" /> Capabilities & Tools
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div 
                        onClick={() => handleCapabilityToggle('webSearch')}
                        className={`cursor-pointer p-4 rounded-xl border transition-all ${agentConfig.capabilities.webSearch ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-lg ${agentConfig.capabilities.webSearch ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
                                <Globe size={18} />
                            </div>
                            <span className={`font-semibold text-sm ${agentConfig.capabilities.webSearch ? 'text-indigo-900 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300'}`}>Web Search</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Allows the agent to browse the internet for real-time information.</p>
                    </div>

                    <div 
                        onClick={() => handleCapabilityToggle('codeInterpreter')}
                        className={`cursor-pointer p-4 rounded-xl border transition-all ${agentConfig.capabilities.codeInterpreter ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}
                    >
                         <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-lg ${agentConfig.capabilities.codeInterpreter ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
                                <Terminal size={18} />
                            </div>
                            <span className={`font-semibold text-sm ${agentConfig.capabilities.codeInterpreter ? 'text-indigo-900 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300'}`}>Code Interpreter</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Execute Python code to analyze data, create charts, or solve math.</p>
                    </div>

                    <div 
                        onClick={() => handleCapabilityToggle('fileAnalysis')}
                        className={`cursor-pointer p-4 rounded-xl border transition-all ${agentConfig.capabilities.fileAnalysis ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}
                    >
                         <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-lg ${agentConfig.capabilities.fileAnalysis ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
                                <FileText size={18} />
                            </div>
                            <span className={`font-semibold text-sm ${agentConfig.capabilities.fileAnalysis ? 'text-indigo-900 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300'}`}>File Analysis</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Upload PDFs, CSVs, or images for the agent to process.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Column: Preview */}
        <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24">
                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Preview</h3>
                
                {/* Agent Card Preview */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 mb-6">
                    <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                        <div className="absolute -bottom-8 left-6">
                            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-800 p-1 shadow-md">
                                <div className="w-full h-full bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                    <Bot size={32} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-10 px-6 pb-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            {agentConfig.name || 'Untitled Agent'}
                        </h2>
                        <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-3">
                            {agentConfig.role || 'No Role Defined'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3">
                            {agentConfig.description || 'No description provided.'}
                        </p>
                        
                        <div className="flex gap-2 mb-6">
                            {agentConfig.capabilities.webSearch && (
                                <span className="p-1.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md" title="Web Search">
                                    <Globe size={14} />
                                </span>
                            )}
                            {agentConfig.capabilities.codeInterpreter && (
                                <span className="p-1.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md" title="Code Interpreter">
                                    <Terminal size={14} />
                                </span>
                            )}
                             {agentConfig.capabilities.fileAnalysis && (
                                <span className="p-1.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md" title="File Analysis">
                                    <FileText size={14} />
                                </span>
                            )}
                        </div>

                        <button 
                            onClick={openTestRun}
                            className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            <MessageSquare size={16} /> Start Chat
                        </button>
                    </div>
                </div>

                {/* Integration Info */}
                <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <Code size={18} className="text-indigo-600 dark:text-indigo-400 mt-0.5" />
                        <div>
                            <h4 className="font-bold text-sm text-indigo-900 dark:text-indigo-200 mb-1">API Integration</h4>
                            <p className="text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
                                Once saved, this agent can be accessed via the Nexus API using ID: <code className="bg-white/50 dark:bg-black/20 px-1 py-0.5 rounded">ag_8x92m...</code>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Test Run Modal */}
      {isTestModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-700">
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 shrink-0">
                    <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                            <Bot size={18} />
                         </div>
                         <div>
                             <h2 className="text-sm font-bold text-gray-900 dark:text-white">Test Run: {agentConfig.name}</h2>
                             <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Live Preview</p>
                         </div>
                    </div>
                    <button onClick={() => setIsTestModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <X size={20} />
                    </button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30 dark:bg-gray-900/50">
                    {testMessages.map((msg, idx) => (
                        <div key={idx} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                             <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600'}`}>
                                {msg.role === 'user' ? <UserIcon size={16} /> : <Bot size={18} />}
                             </div>
                             <div className={`p-3 rounded-2xl text-sm ${
                                msg.role === 'user' 
                                ? 'bg-indigo-600 text-white rounded-br-none' 
                                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm'
                            }`}>
                                <p className="whitespace-pre-wrap">{msg.content}</p>
                             </div>
                        </div>
                    ))}
                    {isThinking && (
                        <div className="flex gap-3 max-w-[85%]">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center shrink-0">
                                <Bot size={18} />
                            </div>
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-2xl rounded-bl-none shadow-sm">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 shrink-0">
                     <form onSubmit={handleSendMessage} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-2 border border-gray-200 dark:border-gray-600 focus-within:ring-2 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-900 focus-within:border-indigo-300 transition-all">
                        <input 
                            type="text" 
                            placeholder={`Message ${agentConfig.name || 'Agent'}...`}
                            className="flex-1 bg-transparent border-none focus:outline-none text-sm py-2 text-gray-900 dark:text-white"
                            value={testInput}
                            onChange={(e) => setTestInput(e.target.value)} 
                            autoFocus
                        />
                        <button 
                            type="submit" 
                            className={`p-2 rounded-lg transition-colors ${testInput.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-default'}`}
                            disabled={!testInput.trim()}
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

// Simple User Icon component for local use
const UserIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

export default AgentMaker;
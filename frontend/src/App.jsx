import React, { useState } from 'react';
import Upload from './components/Upload';
import Chat from './components/Chat';
import { MessageSquare, FileText } from 'lucide-react';

function App() {
    const [activeTab, setActiveTab] = useState('chat');

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm transition-all duration-300">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-600/20 group-hover:scale-105 transition-transform duration-300">
                            <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">
                            DocsBot <span className="font-light text-slate-400">Clone</span>
                        </h1>
                    </div>
                    <nav className="flex gap-1 bg-slate-100/50 p-1 rounded-xl border border-slate-200/50">
                        <button
                            onClick={() => setActiveTab('chat')}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'chat'
                                ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-black/5'
                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                                }`}
                        >
                            Chat
                        </button>
                        <button
                            onClick={() => setActiveTab('upload')}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'upload'
                                ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-black/5'
                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                                }`}
                        >
                            Upload & Train
                        </button>
                    </nav>
                </div>
            </header>

            <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
                    {activeTab === 'chat' ? <Chat /> : <Upload />}
                </div>
            </main>
        </div>
    );
}

export default App;

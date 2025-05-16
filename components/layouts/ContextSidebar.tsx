'use client';

import { useState } from "react";
import {
    Search,
    MessageSquare,
    Hash,
    MoreHorizontal,
    PenSquare,
    UserPlus,
    Book,
    BookOpen,
    Plus,
    FileUp,
    Download,
    Trash2,
    BookText,
    Paperclip, Send
} from "lucide-react";

function DynamicIcon({ iconName, size = 24 }) {
    // Map icon names to Lucide components or SVG elements
    const icons = {
        "book-open": <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>,
        "eye": <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>,
        "eye-off": <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>,
        "laptop": <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="12" x="3" y="4" rx="2" ry="2" /><line x1="2" x2="22" y1="20" y2="20" /></svg>,
        "book": <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>,
        "phone": <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
        "graduation-cap": <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" /></svg>,
        "mail": <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>,
        "file-text": <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></svg>,
        "calendar": <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
    };

    return icons[iconName] || null;
}

// Sample data for spaces
const INITIAL_SPACES = [
    { id: 1, name: "General", icon: <MessageSquare size={16} />, unread: 3 },
    { id: 2, name: "Resources", icon: <Book size={16} />, unread: 0 },
    { id: 3, name: "Discussion", icon: <Hash size={16} />, unread: 5 }
];

// Empty state component for chat area
function EmptySpaceState({ contextName, onCreateSpace }) {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-zinc-800 rounded-full p-4 mb-4">
                <BookOpen size={32} className="text-zinc-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Welcome to {contextName}</h2>
            <p className="text-zinc-400 text-center max-w-md mb-6">
                Create spaces to organize your chats and resources. Each space can have its own topic or purpose.
            </p>
            <button
                onClick={onCreateSpace}
                className="px-4 py-2 bg-white text-black rounded-md flex items-center gap-2"
            >
                <MessageSquare size={16} />
                Create your first space
            </button>
        </div>
    );
}

// Chat bubble component
function ChatMessage({ message }) {
    return (
        <div className={`flex mb-4 ${message.isUser ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] px-4 py-2 rounded-lg ${message.isUser ? "bg-blue-600 text-white" : "bg-zinc-800 text-white"}`}>
                <p>{message.content}</p>
                <div className="text-xs mt-1 text-gray-300">{message.time}</div>
            </div>
        </div>
    );
}

// Space chat interface
function SpaceChat({ space }) {
    const [messages, setMessages] = useState([
        { id: 1, content: "Hello! How can I help you with this space today?", isUser: false, time: "10:30 AM" },
        { id: 2, content: "I need to organize my research notes.", isUser: true, time: "10:32 AM" },
        { id: 3, content: "Sure! I can help you categorize and structure your research notes. Would you like to create sections or use tags?", isUser: false, time: "10:33 AM" }
    ]);
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const newMsg = {
            id: messages.length + 1,
            content: newMessage,
            isUser: true,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMsg]);
        setNewMessage("");

        setTimeout(() => {
            const aiResponse = {
                id: messages.length + 2,
                content: "I've noted your message. How would you like to proceed with this task?",
                isUser: false,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, aiResponse]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="p-4  flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {space.icon}
                    <h2 className="font-semibold text-white">{space.name}</h2>
                </div>
                <button className="text-gray-400 hover:text-white">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 pl-72 pr-72">
                {messages.map(message => (
                    <ChatMessage key={message.id} message={message} />
                ))}
            </div>

            <form onSubmit={sendMessage} className="p-4 pl-72 pr-72">
                <div className="flex items-center bg-zinc-800 rounded-xl">
                    <button
                        type="button"
                        className="px-3 text-gray-400 hover:text-gray-300"
                    // define this if needed
                    >
                        <Paperclip size={20} />
                    </button>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Message..."
                        className="flex-1 bg-transparent border-none p-3 focus:outline-none text-white"
                    />
                    <button
                        type="submit"
                        className="flex items-center gap-1 px-4 py-2 text-blue-400 hover:text-blue-300"
                        disabled={!newMessage.trim()}
                    >
                        <Send size={18} />
                    </button>
                </div>
            </form>
        </div>
    );
}

// Create Space Modal
function CreateSpaceModal({ onClose, onCreateSpace }) {
    const [spaceName, setSpaceName] = useState("");

    const handleCreateSpace = () => {
        if (spaceName.trim()) {
            onCreateSpace({
                id: Date.now(),
                name: spaceName,
                icon: <Hash size={16} />,
                unread: 0
            });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-zinc-900 rounded-lg w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-white">Create Space</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-400 mb-2">Space Name</label>
                    <input
                        type="text"
                        value={spaceName}
                        onChange={(e) => setSpaceName(e.target.value)}
                        placeholder="e.g., Research Notes, Questions, Resources"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 text-white"
                    />
                </div>

                <button
                    onClick={handleCreateSpace}
                    disabled={!spaceName.trim()}
                    className={`w-full py-2 rounded-md ${spaceName.trim() ? "bg-white text-black" : "bg-zinc-700 text-gray-400"}`}
                >
                    Create Space
                </button>
            </div>
        </div>
    );
}

// Knowledge component
function KnowledgeView() {
    const [documents, setDocuments] = useState([
        { id: 1, name: 'project-report.pdf', size: '2.4 MB', date: 'Apr 28, 2025' },
        { id: 2, name: 'research-data.docx', size: '1.7 MB', date: 'Apr 25, 2025' }
    ]);
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // Handle files
            const newFiles = Array.from(e.dataTransfer.files).map(file => ({
                id: Date.now() + Math.random(),
                name: file.name,
                size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            }));

            setDocuments([...documents, ...newFiles]);
        }
    };

    const handleFileUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const newFiles = Array.from(e.target.files).map(file => ({
                id: Date.now() + Math.random(),
                name: file.name,
                size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            }));

            setDocuments([...documents, ...newFiles]);
        }
    };

    const deleteDocument = (id) => {
        setDocuments(documents.filter(doc => doc.id !== id));
    };

    return (
        <div className="flex flex-col h-full bg-gray-300 m-16 rounded-xl">
            <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BookText size={20} color='black' />
                    <h2 className="font-semibold text-gray-900">Knowledge Base</h2>
                </div>
                <button className="text-gray-400 hover:text-white">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
                <div
                    className={`border-2 border-dashed rounded-lg p-6 mb-6 flex flex-col items-center justify-center
                        ${dragActive ? 'border-blue-500 bg-blue-500 bg-opacity-10' : 'border-zinc-700'}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <FileUp size={36} className="text-zinc-500 mb-3" />
                    <p className="text-zinc-400 text-center mb-4">Drag and drop files here or click to upload</p>
                    <label className="px-4 py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 cursor-pointer">
                        <input
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                        Browse Files
                    </label>
                </div>

                <div className="bg-gray-800 rounded-lg">
                    <div className="grid grid-cols-3 p-3 border-b border-zinc-900 text-sm text-zinc-400">
                        <div>Name</div>
                        <div>Size</div>
                        <div>Date Added</div>
                    </div>

                    {documents.length > 0 ? (
                        <div className="divide-y divide-zinc-900">
                            {documents.map(doc => (
                                <div key={doc.id} className="grid grid-cols-3 p-3 items-center text-white hover:bg-zinc-800">
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        <Book size={16} className="text-zinc-400 flex-shrink-0" />
                                        <span className="truncate">{doc.name}</span>
                                    </div>
                                    <div>{doc.size}</div>
                                    <div className="flex items-center justify-between">
                                        <span>{doc.date}</span>
                                        <div className="flex gap-2">
                                            <button className="text-zinc-400 hover:text-white">
                                                <Download size={16} />
                                            </button>
                                            <button
                                                className="text-zinc-400 hover:text-red-400"
                                                onClick={() => deleteDocument(doc.id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-6 text-center text-zinc-500">
                            No documents uploaded yet
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Final Dashboard component
export default function ContextDashboard({ context }) {
    const [spaces, setSpaces] = useState(INITIAL_SPACES);
    const [activeSpace, setActiveSpace] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [activeView, setActiveView] = useState('spaces'); // 'spaces' or 'knowledge'

    const handleCreateSpace = (newSpace) => {
        setSpaces([...spaces, newSpace]);
        setActiveSpace(newSpace);
        setActiveView('spaces');
    };

    return (
        <div className="flex h-screen bg-gray-700 text-white p-6 rounded-lg m-4">
            {/* Sidebar */}
            <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col rounded-xl">
                <div className="p-4 border-b border-zinc-800">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded flex items-center justify-center ${context.theme.color}`}>
                                <DynamicIcon iconName={context.icon.icon} size={16} />
                            </div>
                            <h2 className="font-semibold">{context.name}</h2>
                        </div>
                    </div>

                </div>

                <div className="flex-1 overflow-y-auto">

                    <div className="p-4 border-b border-zinc-800">
                        <button
                            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md ${activeView === 'knowledge' ? "bg-zinc-800" : "hover:bg-zinc-800"}`}
                            onClick={() => setActiveView('knowledge')}
                        >
                            <BookText size={16} />
                            <span>Knowledge</span>
                        </button>
                    </div>

                    {/* Spaces Section */}
                    <div className="p-4 border-b border-zinc-800">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-400">SPACES</h3>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="text-gray-400 hover:text-white"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        <div className="space-y-1">
                            {spaces.map(space => (
                                <button
                                    key={space.id}
                                    onClick={() => {
                                        setActiveSpace(space);
                                        setActiveView('spaces');
                                    }}
                                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md ${activeView === 'spaces' && activeSpace?.id === space.id ? "bg-zinc-800" : "hover:bg-zinc-800"}`}
                                >
                                    <div className="flex items-center gap-2">
                                        {space.icon}
                                        <span>{space.name}</span>
                                    </div>
                                    {space.unread > 0 && (
                                        <span className="bg-blue-500 text-white rounded-full px-1.5 py-0.5 text-xs">
                                            {space.unread}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Knowledge Section */}

                </div>

                <div className="p-4 border-t border-zinc-800">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-white w-full px-2 py-1.5 rounded-md hover:bg-zinc-800">
                        <UserPlus size={16} />
                        <span>Invite Members</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {activeView === 'spaces' ? (
                    activeSpace ? (
                        <SpaceChat space={activeSpace} />
                    ) : (
                        <EmptySpaceState
                            contextName={context.name}
                            onCreateSpace={() => setShowCreateModal(true)}
                        />
                    )
                ) : (
                    <KnowledgeView />
                )}
            </div>

            {showCreateModal && (
                <CreateSpaceModal
                    onClose={() => setShowCreateModal(false)}
                    onCreateSpace={handleCreateSpace}
                />
            )}
        </div>
    );
}
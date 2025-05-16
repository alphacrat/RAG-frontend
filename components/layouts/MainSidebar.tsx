'use client';

import { useState } from "react";
import { Home, Plus, Settings, User } from "lucide-react";

// Theme colors options
const THEME_COLORS = [
    { name: "Lychee", color: "bg-pink-500" },
    { name: "Ocean", color: "bg-blue-500" },
    { name: "Forest", color: "bg-green-500" },
    { name: "Sunset", color: "bg-orange-500" },
    { name: "Lavender", color: "bg-purple-500" },
    { name: "Slate", color: "bg-gray-500" }
];

// Available icons for contexts
const AVAILABLE_ICONS = [
    { name: "Book Pages", icon: "book-open" },
    { name: "Eye", icon: "eye" },
    { name: "Eye Slash", icon: "eye-off" },
    { name: "Laptop Computer", icon: "laptop" },
    { name: "Book", icon: "book" },
    { name: "Phone", icon: "phone" },
    { name: "Graduation Cap", icon: "graduation-cap" },
    { name: "Mail", icon: "mail" },
    { name: "File", icon: "file-text" },
    { name: "Calendar", icon: "calendar" }
];

// Icon component to render dynamic icons
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

// Modal component for creating new contexts
function CreateContextModal({ onClose, onCreateContext }) {
    const [contextName, setContextName] = useState("");
    const [selectedTheme, setSelectedTheme] = useState(THEME_COLORS[0]);
    const [selectedIcon, setSelectedIcon] = useState(AVAILABLE_ICONS[0]);
    const [isPublic, setIsPublic] = useState(false);
    const [showThemeDropdown, setShowThemeDropdown] = useState(false);
    const [showIconDropdown, setShowIconDropdown] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleCreateContext = () => {
        if (contextName.trim()) {
            onCreateContext({
                id: Date.now(),
                name: contextName,
                theme: selectedTheme,
                icon: selectedIcon,
                isPublic
            });
            onClose();
        }
    };

    const handlePublicToggle = () => {
        const newValue = !isPublic;
        setIsPublic(newValue);
        if (newValue) {
            setShowAlert(true);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-zinc-900 rounded-lg w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-white">Create Context</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-400 mb-2">Name</label>
                    <input
                        type="text"
                        value={contextName}
                        onChange={(e) => setContextName(e.target.value)}
                        placeholder="eg: CHEM 120-A, MCAT, Marketing Strategies"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 text-white"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-gray-400 mb-2">Theme</label>
                        <div className="relative">
                            <button
                                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                                className={`w-full flex items-center gap-2 ${selectedTheme.color} text-white rounded-md py-2 px-3`}
                            >
                                {selectedTheme.name}
                            </button>
                            {showThemeDropdown && (
                                <div className="absolute top-full left-0 mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-md py-1 z-10">
                                    {THEME_COLORS.map((theme) => (
                                        <button
                                            key={theme.name}
                                            onClick={() => {
                                                setSelectedTheme(theme);
                                                setShowThemeDropdown(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 hover:bg-zinc-700 flex items-center gap-2`}
                                        >
                                            <div className={`w-4 h-4 rounded-full ${theme.color}`}></div>
                                            <span className="text-white">{theme.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-2">Icon</label>
                        <div className="relative">
                            <button
                                onClick={() => setShowIconDropdown(!showIconDropdown)}
                                className="w-full flex items-center justify-between bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 text-white"
                            >
                                <div className="flex items-center gap-2">
                                    <DynamicIcon iconName={selectedIcon.icon} size={20} />
                                    <span>{selectedIcon.name}</span>
                                </div>
                            </button>
                            {showIconDropdown && (
                                <div className="absolute top-full left-0 mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-md py-1 max-h-48 overflow-y-auto z-10">
                                    <div className="px-3 py-2">
                                        <input
                                            type="text"
                                            placeholder="Search icons..."
                                            className="w-full bg-zinc-700 border border-zinc-600 rounded-md py-1 px-2 text-white text-sm"
                                        />
                                    </div>
                                    {AVAILABLE_ICONS.map((icon) => (
                                        <button
                                            key={icon.name}
                                            onClick={() => {
                                                setSelectedIcon(icon);
                                                setShowIconDropdown(false);
                                            }}
                                            className="w-full text-left px-3 py-2 hover:bg-zinc-700 flex items-center gap-2"
                                        >
                                            <DynamicIcon iconName={icon.icon} size={20} />
                                            <span className="text-white">{icon.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400">Public</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isPublic}
                            onChange={handlePublicToggle}
                        />
                        <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                {showAlert && (
                    <div className="bg-zinc-800 border-l-4 border-yellow-500 p-4 mb-6">
                        <div className="flex items-start">
                            <div className="ml-3">
                                <p className="text-sm text-yellow-400">
                                    If made public, the shared knowledge may be respectfully used to support public operations.
                                </p>
                            </div>
                            <button
                                onClick={() => setShowAlert(false)}
                                className="ml-auto pl-3"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>
                    </div>
                )}

                <button
                    onClick={handleCreateContext}
                    disabled={!contextName.trim()}
                    className={`w-full py-2 rounded-md ${contextName.trim() ? "bg-white text-black" : "bg-zinc-700 text-gray-400"
                        }`}
                >
                    Create
                </button>
            </div>
        </div>
    );
}

export default function MainSidebar({ contexts, onContextSelect, onCreateContext, onHomeClick, activeContext }) {
    const [showCreateModal, setShowCreateModal] = useState(false);

    return (
        <div className="w-20 bg-zinc-950 flex flex-col items-center py-6 pl-4">
            <div className="flex flex-col items-center gap-6 flex-1">
                <button
                    className={`w-12 h-12 flex items-center justify-center rounded-lg ${activeContext === null ? 'bg-zinc-800' : 'hover:bg-zinc-800'} text-white`}
                    onClick={onHomeClick}
                >
                    <Home size={24} />
                </button>

                {contexts.map((context, index) => (
                    <button
                        key={context.id}
                        className={`w-12 h-12 flex items-center justify-center rounded-lg ${activeContext && activeContext.id === context.id ? 'bg-zinc-800' : 'hover:bg-zinc-800'}`}
                        onClick={() => onContextSelect(context)}
                    >
                        <div className={`w-8 h-8 rounded flex items-center justify-center ${context.theme.color}`}>
                            <DynamicIcon iconName={context.icon.icon} size={20} />
                        </div>
                    </button>
                ))}

                <button
                    className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-zinc-800 mt-2"
                    onClick={() => setShowCreateModal(true)}
                >
                    <Plus size={24} />
                </button>
            </div>

            <div className="mt-auto">
                <button className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-zinc-800">
                    <Settings size={24} />
                </button>
            </div>

            {showCreateModal && (
                <CreateContextModal
                    onClose={() => setShowCreateModal(false)}
                    onCreateContext={onCreateContext}
                />
            )}
        </div>
    );
}
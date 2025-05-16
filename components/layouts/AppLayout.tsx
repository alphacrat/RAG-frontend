'use client';

import { useState } from 'react';
import MainSidebar from './MainSidebar';
import HomeDashboard from './HomeDashboard';
import ContextDashboard from './ContextSidebar';

export default function AppLayout() {
    // State to track active context and all contexts
    const [activeContext, setActiveContext] = useState(null);
    const [contexts, setContexts] = useState([]);

    // Handler for creating a new context
    const handleCreateContext = (newContext) => {
        const updatedContexts = [...contexts, newContext];
        setContexts(updatedContexts);
        setActiveContext(newContext); // Automatically activate the new context
    };

    // Handler for selecting an existing context
    const handleSelectContext = (context) => {
        setActiveContext(context);
    };

    // Handler for returning to home screen
    const handleHomeClick = () => {
        setActiveContext(null);
    };

    return (
        <div className="flex h-screen bg-zinc-950 text-gray-300">
            <MainSidebar
                contexts={contexts}
                onContextSelect={handleSelectContext}
                onCreateContext={handleCreateContext}
                onHomeClick={handleHomeClick}
                activeContext={activeContext}
            />

            {/* Main Content */}
            <div className="flex-1">
                {activeContext ? (
                    <ContextDashboard
                        context={activeContext}
                    />
                ) : (
                    <HomeDashboard userName='Alphacrat' />
                )}
            </div>
        </div>
    );
}
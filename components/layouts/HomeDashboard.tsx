'use client';

import { useEffect, useState } from 'react';
import {
    BookOpen,
    MessageSquare,
    Users,
    PlusCircle,
    Info,
} from 'lucide-react';

export default function HomeDashboard({ userName = "User", stats = null }) {
    const [dashboardStats, setDashboardStats] = useState({
        totalSpaces: 2,
        unreadMessages: 8,
        members: 5,
        ...stats,
    });

    return (
        <div className="h-full p-64 text-white bg-zinc-950 overflow-y-auto  ">
            <div className="mb-8 ml-24 mr-24">
                <h1 className="text-2xl font-bold">Welcome back, {userName} 👋</h1>
                <p className="text-zinc-400 mt-1">
                    Here’s what’s going on in your workspace today.
                </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <StatCard
                    icon={<BookOpen size={20} />}
                    title="Total Spaces"
                    value={dashboardStats.totalSpaces}
                    bg="bg-blue-500"
                />
                <StatCard
                    icon={<MessageSquare size={20} />}
                    title="Unread Messages"
                    value={dashboardStats.unreadMessages}
                    bg="bg-purple-500"
                />
                <StatCard
                    icon={<Users size={20} />}
                    title="Team Members"
                    value={dashboardStats.members}
                    bg="bg-green-500"
                />
            </div>

            {/* Tips or Getting Started */}
            <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
                <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
                <p className="text-zinc-400 mb-4">
                    Use the menu to the left to explore or create new spaces. Each space helps you organize chats and resources for different topics or teams.
                </p>
                <ul className="list-disc list-inside text-zinc-300 space-y-2">
                    <li><PlusCircle size={16} className="inline mr-1" /> Create a new space to start collaborating.</li>
                    <li><Users size={16} className="inline mr-1" /> Invite team members to join your context.</li>
                    <li><Info size={16} className="inline mr-1" /> View and respond to unread messages in each space.</li>
                </ul>
            </div>
        </div>
    );
}

function StatCard({ icon, title, value, bg }) {
    return (
        <div className="bg-zinc-900 p-5 rounded-lg border border-zinc-800 flex items-center gap-4">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${bg} text-white`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-zinc-400">{title}</p>
                <p className="text-xl font-bold text-white">{value}</p>
            </div>
        </div>
    );
}

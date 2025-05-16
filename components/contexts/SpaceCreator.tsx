import { useState } from "react";


interface SpaceCreatorProps {
    onCreateSpace: (spaceName: string) => void;
    onCancel: () => void;
}

export default function SpaceCreator({ onCreateSpace, onCancel }: SpaceCreatorProps) {
    const [newSpaceName, setNewSpaceName] = useState("");

    const handleCreateSpace = () => {
        onCreateSpace(newSpaceName);
        setNewSpaceName("");
    };

    return (
        <div className="mt-2">
            <input
                type="text"
                className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-sm"
                placeholder="Space name"
                value={newSpaceName}
                onChange={(e) => setNewSpaceName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateSpace()}
                autoFocus
            />
            <div className="flex gap-2 mt-2">
                <button
                    className="px-2 py-1 bg-blue-600 rounded text-xs hover:bg-blue-500"
                    onClick={handleCreateSpace}
                >
                    Create
                </button>
                <button
                    className="px-2 py-1 bg-zinc-700 rounded text-xs hover:bg-zinc-600"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
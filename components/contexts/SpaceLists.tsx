import { FileText } from "lucide-react";

interface SpacesListProps {
    spaces: string[];  // Define spaces as an array of strings
}

export default function SpacesList({ spaces }: SpacesListProps) {
    return (
        <div>
            {spaces.map((space, index) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded hover:bg-zinc-800">
                    <FileText size={16} />
                    <span className="text-sm">{space}</span>
                </div>
            ))}
        </div>
    );
}
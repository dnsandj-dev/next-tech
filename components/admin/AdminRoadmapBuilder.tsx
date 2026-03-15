import React from 'react';
import { Plus, Trash2, Calendar, LayoutList, Save } from 'lucide-react';

// 1. Define the shape of a Client
interface Client {
  id: string;
  name: string | null;
  email: string;
  company?: string | null;
}

// 2. Define the props for the component
interface AdminRoadmapBuilderProps {
  clients: Client[];
}

// 3. Apply the interface to the props
const AdminRoadmapBuilder = ({ clients }: AdminRoadmapBuilderProps) => {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        {/* ... rest of your code */}
      </header>
    </div>
  );
};

export default AdminRoadmapBuilder;
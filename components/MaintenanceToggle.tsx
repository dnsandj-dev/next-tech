'use client';

import { setCategoryMaintenance } from "@/app/inventory/actions";
import { toast } from "sonner";
import { useState } from "react";

export default function MaintenanceToggle({ categories }: { categories: string[] }) {
  const [selected, setSelected] = useState(categories[0] || "");

  const handleMaintenance = async () => {
    if (!selected) return;
    const confirm = window.confirm(`Set all ${selected} assets to Maintenance?`);
    if (!confirm) return;

    await setCategoryMaintenance(selected);
    toast.warning(`All ${selected} assets are now in Maintenance mode.`);
  };

  return (
    <div className="flex items-center gap-2 p-4 bg-orange-50 border border-orange-200 rounded-xl shadow-sm">
      <div className="text-orange-800">
        <p className="text-xs font-bold uppercase tracking-tight">Bulk Action</p>
        <p className="text-[10px] leading-tight opacity-80">Set category to Maintenance</p>
      </div>
      <select 
        value={selected} 
        onChange={(e) => setSelected(e.target.value)}
        className="text-xs p-1 border rounded bg-white"
      >
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
      <button 
        onClick={handleMaintenance}
        className="px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded hover:bg-orange-700 transition"
      >
        Execute
      </button>
    </div>
  );
}
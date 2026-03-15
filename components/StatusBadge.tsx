'use client';

import { updateProductStatus } from "@/app/inventory/actions";
import { toast } from "sonner";

const statuses = ["Available", "In Use", "Broken", "Maintenance"];

export default function StatusBadge({ id, currentStatus }: { id: string, currentStatus: string }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-700 border-green-200";
      case "In Use": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Broken": return "bg-red-100 text-red-700 border-red-200";
      case "Maintenance": return "bg-orange-100 text-orange-700 border-orange-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleStatusChange = async () => {
    const currentIndex = statuses.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statuses.length;
    const nextStatus = statuses[nextIndex];
    
    await updateProductStatus(id, nextStatus);
    toast.info(`Status updated to ${nextStatus}`);
  };

  return (
    <button 
      onClick={handleStatusChange}
      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-tighter transition-all hover:scale-105 ${getStatusColor(currentStatus)}`}
    >
      {currentStatus}
    </button>
  );
}
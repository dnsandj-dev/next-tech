import React from 'react';
import { Factory, Truck, Star, AlertCircle } from 'lucide-react';
import VendorCard from "@/components/admin/VendorCard";

// 1. Define the props for the table row
interface TRowProps {
  id: string;
  vendor: string;
  items: string;
  date: string;
  status: 'In Transit' | 'Pending' | 'Delivered' | 'Cancelled';
}

// 2. Create the TRow helper component
const TRow = ({ id, vendor, items, date, status }: TRowProps) => (
  <tr className="hover:bg-slate-50 transition-colors">
    <td className="px-6 py-4 font-mono text-xs text-slate-500">{id}</td>
    <td className="px-6 py-4 font-medium text-slate-900">{vendor}</td>
    <td className="px-6 py-4 text-sm text-slate-600">{items}</td>
    <td className="px-6 py-4 text-sm text-slate-500">{date}</td>
    <td className="px-6 py-4">
      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
        status === 'In Transit' ? 'bg-blue-100 text-blue-700' : 
        status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
        'bg-green-100 text-green-700'
      }`}>
        {status}
      </span>
    </td>
  </tr>
);

const VendorManagement = () => {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Vendor Ecosystem</h1>
        <p className="text-slate-500">Manage suppliers, track performance, and monitor incoming stock.</p>
      </header>

      {/* Vendor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <VendorCard 
          name="Dell Technologies" 
          category="Hardware" 
          reliability={5} 
          activePOs={4} 
          status="Operational"
        />
        <VendorCard 
          name="Cisco Systems" 
          category="Networking" 
          reliability={4} 
          activePOs={1} 
          status="Delayed" 
          alert="Global chip shortage affecting switch lead times."
        />
        <VendorCard 
          name="Ingram Micro" 
          category="Distributor" 
          reliability={5} 
          activePOs={12} 
          status="Operational"
        />
      </div>

      {/* Active Supply Chain Table */}
      <div className="mt-12 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">Incoming Shipments (Inventory Restock)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-4 text-left">PO Number</th>
                <th className="px-6 py-4 text-left">Vendor</th>
                <th className="px-6 py-4 text-left">Items</th>
                <th className="px-6 py-4 text-left">Expected Date</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <TRow id="PO-9921" vendor="Dell" items="25x Latitude 5440" date="Oct 14" status="In Transit" />
              <TRow id="PO-9925" vendor="Cisco" items="4x Catalyst 9300" date="Nov 02" status="Pending" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorManagement;
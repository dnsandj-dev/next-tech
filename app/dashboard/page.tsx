import React from 'react';
import { LayoutDashboard, Package, ShieldCheck, CreditCard, Settings, Plus } from 'lucide-react';
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <div>Dashboard</div>;
}
// --- INTERFACES FOR TYPE SAFETY ---
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

interface StatCardProps {
  title: string;
  value: string;
  detail: string;
  highlight?: boolean;
}

interface OrderRowProps {
  name: string;
  sku: string;
  category: string;
  status: 'Shipped' | 'Delivered' | 'Processing';
  price: string;
}

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 text-xl font-bold tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">N</div>
          Nexus IT
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Overview" active />
          <NavItem icon={<Package size={20}/>} label="Procurement" />
          <NavItem icon={<ShieldCheck size={20}/>} label="Asset Inventory" />
          <NavItem icon={<CreditCard size={20}/>} label="Billing & Quotes" />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <NavItem icon={<Settings size={20}/>} label="Settings" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Infrastructure Overview</h1>
            <p className="text-slate-500 text-sm">Welcome back. Here is your current tech footprint.</p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-medium">
            <Plus size={18} /> New Procurement Request
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Active Assets" value="124" detail="+12 this month" />
          <StatCard title="Pending Orders" value="3" detail="Estimated delivery: Friday" />
          <StatCard title="Critical Warranties" value="8" detail="Expiring within 30 days" highlight />
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-semibold text-lg">Recent Procurements</h3>
            <button className="text-indigo-600 text-sm font-medium hover:underline">View All</button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Item / SKU</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <OrderRow name="MacBook Pro M3 (16-inch)" sku="MBP-M3-16" category="Workstation" status="Shipped" price="$2,499.00" />
              <OrderRow name="Cisco C9200L Switch" sku="CS-9200-48P" category="Networking" status="Processing" price="$4,120.00" />
              <OrderRow name="Dell PowerEdge R760" sku="PE-R760-24" category="Server" status="Delivered" price="$12,850.00" />
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

// --- TYPED SUB-COMPONENTS ---

const NavItem = ({ icon, label, active = false }: NavItemProps) => (
  <div className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors ${active ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}>
    {icon}
    <span className="font-medium">{label}</span>
  </div>
);

const StatCard = ({ title, value, detail, highlight = false }: StatCardProps) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
    <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
    <h2 className={`text-3xl font-bold ${highlight ? 'text-red-600' : 'text-slate-900'}`}>{value}</h2>
    <p className="text-xs text-slate-400 mt-2">{detail}</p>
  </div>
);

const OrderRow = ({ name, sku, category, status, price }: OrderRowProps) => (
  <tr className="hover:bg-slate-50 transition-colors">
    <td className="px-6 py-4">
      <div className="font-medium">{name}</div>
      <div className="text-xs text-slate-400">{sku}</div>
    </td>
    <td className="px-6 py-4 text-sm text-slate-600">{category}</td>
    <td className="px-6 py-4">
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
        status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 
        status === 'Delivered' ? 'bg-green-100 text-green-700' : 
        'bg-amber-100 text-amber-700'
      }`}>
        {status}
      </span>
    </td>
    <td className="px-6 py-4 text-right font-medium">{price}</td>
  </tr>
);


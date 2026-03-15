import React from 'react';
import { LayoutDashboard, Package, ShieldCheck, CreditCard, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Fixed Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 text-xl font-bold tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white">N</div>
          Nexus IT
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <SidebarLink href="/dashboard" icon={<LayoutDashboard size={20}/>} label="Overview" />
          <SidebarLink href="/dashboard/procurement" icon={<Package size={20}/>} label="Procurement" />
          <SidebarLink href="/dashboard/roadmap" icon={<ShieldCheck size={20}/>} label="Strategic Roadmap" />
          <SidebarLink href="/dashboard/billing" icon={<CreditCard size={20}/>} label="Invoices & ROI" />
        </nav>

        {/* Clerk User Button & Settings */}
        <div className="p-4 border-t border-slate-800 space-y-4">
          <SidebarLink href="/dashboard/settings" icon={<Settings size={20}/>} label="Settings" />
          <div className="flex items-center gap-3 px-3 py-2">
            <UserButton />
            <span className="text-sm font-medium text-slate-400">Account</span>
          </div>
        </div>
      </aside>

      {/* Dynamic Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-50">
        {children}
      </main>
    </div>
  );
}

// Sub-component for clean navigation
function SidebarLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-slate-800 text-slate-400 hover:text-white group"
    >
      <span className="group-hover:text-indigo-400 transition-colors">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
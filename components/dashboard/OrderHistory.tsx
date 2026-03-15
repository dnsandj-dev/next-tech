import React from 'react';
import { FileText, Download, CheckCircle, ExternalLink, History } from 'lucide-react';

// 1. Define the shape of a single Order
interface Order {
  id: string;
  createdAt: Date | string;
  items: string;
  totalAmount: number;
  status: 'DELIVERED' | 'PROCESSING' | 'SHIPPED' | 'CANCELLED';
}

// 2. Define the props for the component
interface OrderHistoryProps {
  orders: Order[];
}

// 3. Apply the interface
const OrderHistory = ({ orders }: OrderHistoryProps) => {
  return (
    <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <History size={20} className="text-indigo-500" /> Procurement History
        </h2>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs">{order.id}</td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm font-medium">{order.items}</td>
                <td className="px-6 py-4 text-right font-bold">
                  ${order.totalAmount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
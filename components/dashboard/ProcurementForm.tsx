"use client"

import { createProcurementRequest } from "@/app/action/procurement";

// 1. Define the Product structure to match your Prisma model
interface Product {
  id: string;
  name: string;
  category?: string;
  price?: number;
}

interface ProcurementFormProps {
  products: Product[];
}

// 2. Apply the interface to the component
export default function ProcurementForm({ products }: ProcurementFormProps) {
  return (
    <form action={createProcurementRequest} className="space-y-4 p-6 bg-white rounded-lg border border-slate-200">
      <h3 className="text-lg font-bold">Request New Equipment</h3>
      
      <div className="space-y-2">
        <label htmlFor="productSelect" className="text-sm font-medium text-slate-700">
          Device / Asset
        </label>
        <select 
  id="productSelect"
  name="productId" 
  className="w-full p-2 border rounded-md bg-slate-50 text-sm"
  required
>
  <option value="">Select a product...</option>
  {products.map((product) => (
    <option key={product.id} value={product.id}>
      {product.name} 
      {/* Line 37: The extra "}" was here. It has been removed. */}
    </option>
  ))}
</select>
      </div>

      <button 
        type="submit" 
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-all font-medium"
      >
        Submit Procurement Request
      </button>
    </form>
  );
}
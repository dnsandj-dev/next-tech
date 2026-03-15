'use client';

import { createProduct } from "@/app/inventory/actions";
import { useRef } from "react";

export default function AddAssetForm({ vendors }: { vendors: any[] }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form 
      ref={formRef}
      action={async (formData) => {
        await createProduct(formData);
        formRef.current?.reset(); // Clear form after success
      }}
      className="bg-gray-50 p-6 rounded-xl border mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div className="space-y-1">
        <label className="text-sm font-medium">Product Name</label>
        <input name="name" required className="w-full p-2 border rounded" placeholder="e.g. iPad Pro" />
      </div>
      
      <div className="space-y-1">
        <label className="text-sm font-medium">Category</label>
        <select name="category" className="w-full p-2 border rounded">
          <option value="Workstations">Workstations</option>
          <option value="Networking">Networking</option>
          <option value="Peripherals">Peripherals</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Base Price ($)</label>
        <input name="basePrice" type="number" step="0.01" required className="w-full p-2 border rounded" />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">SKU</label>
        <input name="sku" className="w-full p-2 border rounded" placeholder="Optional" />
      </div>

      <div className="space-y-1 md:col-span-2">
        <label className="text-sm font-medium">Vendor</label>
        <select name="vendorId" required className="w-full p-2 border rounded">
          {vendors.map(v => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition">
        Add to Inventory
      </button>
    </form>
  );
}
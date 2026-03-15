import { prisma } from "@/lib/prisma";
import { createVendor } from "./actions";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function VendorsPage() {
  const vendors = await prisma.vendor.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: 'asc' },
  });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Vendor Management</h1>
        <p className="text-gray-500">Add and manage your supply chain partners</p>
      </header>

      {/* Add Vendor Form */}
      <form action={createVendor} className="bg-white p-6 rounded-xl border shadow-sm mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input name="name" placeholder="Vendor Name" required className="p-2 border rounded" />
        <input name="contactPerson" placeholder="Contact Name" className="p-2 border rounded" />
        <input name="email" type="email" placeholder="Email Address" className="p-2 border rounded" />
        <button type="submit" className="md:col-span-3 bg-black text-white py-2 rounded font-bold hover:bg-gray-800 transition">
          Register New Vendor
        </button>
      </form>

      {/* Vendor List */}
      <div className="grid gap-4">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="border rounded-lg p-4 flex justify-between items-center bg-white">
            <div>
              <h2 className="text-lg font-bold">{vendor.name}</h2>
              <p className="text-sm text-gray-500">{vendor.contactPerson} • {vendor.email}</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded mb-2">
                {vendor._count.products} Assets
              </span>
            </div>
            <div key={vendor.id} className="border rounded-lg p-4 flex justify-between items-center bg-white hover:border-blue-300 transition-colors">
          <div>
       <Link href={`/vendors/${vendor.id}`} className="text-lg font-bold text-blue-600 hover:underline">
      {vendor.name}
       </Link>
      <p className="text-sm text-gray-500">{vendor.contactPerson} • {vendor.email}</p>
          </div>
          {/* ... count badge ... */}
         </div>
          </div>
        ))}
      </div>
    </div>
  );
}
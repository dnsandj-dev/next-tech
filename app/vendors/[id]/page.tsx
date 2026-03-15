import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function VendorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch the specific vendor and all their products
  const vendor = await prisma.vendor.findUnique({
    where: { id },
    include: {
      products: {
        orderBy: { name: 'asc' },
      },
    },
  });

  if (!vendor) return notFound();

  const totalSpent = vendor.products.reduce((acc, p) => acc + p.basePrice, 0);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link href="/vendors" className="text-sm text-blue-600 hover:underline">
        ← Back to All Vendors
      </Link>
      
      <header className="mt-6 mb-10 pb-6 border-b flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{vendor.name}</h1>
          <p className="text-gray-500 mt-2">{vendor.contactPerson} • {vendor.email}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 uppercase font-semibold">Total Procurement</p>
          <p className="text-3xl font-bold text-blue-600">${totalSpent.toLocaleString()}</p>
        </div>
      </header>

      <h2 className="text-xl font-bold mb-4">Assigned Assets ({vendor.products.length})</h2>
      
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Product</th>
              <th className="p-4 font-semibold text-gray-600">SKU</th>
              <th className="p-4 font-semibold text-gray-600">Category</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {vendor.products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">{product.name}</td>
                <td className="p-4 text-gray-500 font-mono text-xs">{product.sku}</td>
                <td className="p-4 text-gray-500">{product.category}</td>
                <td className="p-4 text-right font-semibold">${product.basePrice.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {vendor.products.length === 0 && (
          <div className="p-10 text-center text-gray-500 italic">
            No assets currently assigned to this vendor.
          </div>
        )}
      </div>
    </div>
  );
}
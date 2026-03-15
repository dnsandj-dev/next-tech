import { prisma } from "@/lib/prisma";
import { inventoryUtils } from "@/lib/inventory-utils";
import SearchInventory from "@/components/SearchInventory";
import CategoryFilter from "@/components/CategoryFilter";
import DeleteButton from "@/components/DeleteButton";
import AddAssetForm from "@/components/AddAssetForm";
import ExportButton from "@/components/ExportButton";
import StatusBadge from "@/components/StatusBadge";
import MaintenanceToggle from "@/components/MaintenanceToggle";
import ServiceButton from "@/components/ServiceButton";
import PrintReportButton from "@/components/PrintReportButton";

export const dynamic = 'force-dynamic';

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.query || '';
  const category = resolvedParams.category || '';

  const [vendors, products] = await Promise.all([
    prisma.vendor.findMany({ orderBy: { name: 'asc' } }),
    prisma.product.findMany({
      where: {
        AND: [
          category ? { category } : {},
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { sku: { contains: query, mode: 'insensitive' } },
            ],
          },
        ],
      },
      include: { vendor: true },
      orderBy: { name: 'asc' },
    }),
  ]);

  const stats = inventoryUtils.calculateAnalytics(products);
  const avgPrice = products.length > 0 ? stats.totalValue / products.length : 0;

  const vendorBreakdown = products.reduce((acc, product) => {
    const vName = product.vendor.name;
    acc[vName] = (acc[vName] || 0) + product.basePrice;
    return acc;
  }, {} as Record<string, number>);

  const sortedVendors = Object.entries(vendorBreakdown).sort(([, a], [, b]) => b - a);

  const categoryTotals = products.reduce((acc, product) => {
    const cat = product.category;
    acc[cat] = (acc[cat] || 0) + product.basePrice;
    return acc;
  }, {} as Record<string, number>);

  const uniqueCategories = Array.from(new Set(products.map(p => p.category)));

  const lastUpdated = new Date().toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
  });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-8 flex flex-col items-center relative">
        <div className="absolute right-0 top-0 no-print">
          <PrintReportButton />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Analytics</h1>
        <p className="text-gray-500">Inventory overview and asset management</p>
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Live Data as of: {lastUpdated}
        </div>
      </header>

      {/* 2. Stat Cards Grid - High Density Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 text-center text-gray-800">
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-[10px] font-medium text-gray-500 uppercase">Total Value</p>
          <p className="text-lg font-bold text-blue-600">${stats.totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-[10px] font-medium text-gray-500 uppercase">Total Assets</p>
          <p className="text-lg font-bold text-gray-900">{products.length}</p> 
        </div>
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-[10px] font-medium text-gray-500 uppercase">Avg Cost</p>
          <p className="text-lg font-bold text-green-600">${avgPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-[10px] font-medium text-gray-500 uppercase">Maintenance</p>
          <p className={`text-lg font-bold ${stats.maintenanceCount > 0 ? 'text-orange-600' : 'text-gray-900'}`}>{stats.maintenanceCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-[10px] font-medium text-gray-500 uppercase">Unprotected Risk</p>
          <p className={`text-lg font-bold ${stats.totalRiskValue > 0 ? 'text-purple-600' : 'text-gray-900'}`}>${stats.totalRiskValue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border shadow-sm border-emerald-100">
          <p className="text-[10px] font-medium text-gray-500 uppercase">Book Value</p>
          <p className="text-lg font-bold text-emerald-600">${stats.totalBookValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>

        {/* New Replacement Forecast Card */}
        <div className="bg-white p-4 rounded-xl border-2 border-dashed border-red-100 shadow-sm col-span-1 md:col-span-3 lg:col-span-2 flex flex-col justify-center">
          <p className="text-[10px] font-black text-red-500 uppercase tracking-tighter">12-Month Budget Forecast</p>
          <p className="text-2xl font-bold text-gray-900">
            ${stats.replacementForecast.toLocaleString()}
          </p>
          <p className="text-[10px] text-gray-400 mt-1">Estimated cost to replace hardware hitting 0% life.</p>
        </div>
      </div>

      {/* 3. Category Breakdown */}
      <div className="mb-10 bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Value by Category</h2>
        <div className="space-y-3 text-gray-800">
          {Object.entries(categoryTotals).map(([cat, total]) => (
            <div key={cat} className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium">{cat}</div>
              <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: `${stats.totalValue > 0 ? (total / stats.totalValue) * 100 : 0}%` }} />
              </div>
              <div className="w-24 text-right text-sm font-bold">${total.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Vendor Portfolio Health */}
      <div className="mb-10 bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-6">Vendor Portfolio Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-800">
          <div className="space-y-4">
            {sortedVendors.map(([name, total], index) => (
              <div key={name} className="flex items-center gap-4 group">
                <div className="flex-none w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">{index + 1}</div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-gray-700">{name}</span>
                    <span className="font-mono text-gray-900">${total.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${stats.totalValue > 0 ? (total / stats.totalValue) * 100 : 0}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 rounded-xl p-6 border border-dashed border-gray-200 flex flex-col justify-center">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Portfolio Insight</h3>
            {sortedVendors.length > 0 ? (
              <p className="text-sm text-gray-600 leading-relaxed">
                Top vendor: <span className="font-bold text-gray-900">{sortedVendors[0][0]}</span> ({((sortedVendors[0][1] / stats.totalValue) * 100).toFixed(1)}%).
              </p>
            ) : <p className="text-sm text-gray-400 italic">No data available.</p>}
          </div>
        </div>
      </div>

      {/* 4. Input & Bulk Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <section className="bg-gray-50 p-6 rounded-xl border no-print">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Add New Asset</h2>
          <AddAssetForm vendors={vendors} />
        </section>
        <section className="flex flex-col justify-center gap-4 no-print">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Bulk Operations</h2>
          <MaintenanceToggle categories={uniqueCategories} />
        </section>
      </div>

      <hr className="my-10 border-gray-200" />

      {/* 5. Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-end no-print">
        <div className="flex-1 w-full"><SearchInventory /></div>
        <div className="flex gap-2 w-full md:w-auto">
          <CategoryFilter />
          <ExportButton data={products} />
        </div>
      </div>

      {/* 6. Product List */}
      <div className="grid gap-4">
        {products.map((product) => {
          const { isExpired, expiryDate } = inventoryUtils.getWarrantyInfo(product.createdAt);
          const { lifeRemaining } = inventoryUtils.getAssetLifeInfo(product.createdAt, product.basePrice);
          const isOverdue = inventoryUtils.isMaintenanceOverdue(product.lastMaintenance);

          return (
            <div key={product.id} className="border rounded-lg p-4 flex justify-between items-center bg-white shadow-sm hover:shadow-md transition-shadow text-gray-800">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <StatusBadge id={product.id} currentStatus={product.status} />
                  {isOverdue && (
                    <div className="flex items-center gap-2">
                      <span className="animate-pulse bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase">Overdue</span>
                      <ServiceButton id={product.id} />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {product.category} • <span className="font-mono text-xs text-gray-400">SKU: {product.sku || 'N/A'}</span>
                </p>
                {product.lastMaintenance && (
                  <p className="text-[10px] text-orange-600 font-medium mt-1">🔧 Last Service: {new Date(product.lastMaintenance).toLocaleDateString()}</p>
                )}
                <p className="text-xs text-blue-600 font-medium mt-1 italic">Vendor: {product.vendor.name}</p>
                
                <div className="mt-2 flex items-center gap-4">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase ${
                    isExpired ? 'bg-gray-100 text-gray-500 border-gray-300' : 'bg-purple-100 text-purple-700 border-purple-200'
                  }`}>
                    {isExpired ? 'Warranty Expired' : '🛡️ Under Warranty'}
                  </span>

                  <div className="w-32">
                    <div className="flex justify-between text-[8px] uppercase font-bold text-gray-400 mb-0.5">
                      <span>Life</span>
                      <span>{lifeRemaining.toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${lifeRemaining < 20 ? 'bg-red-400' : 'bg-emerald-400'}`} style={{ width: `${lifeRemaining}%` }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3 no-print">
                <p className="text-lg font-bold">${product.basePrice.toLocaleString()}</p>
                <DeleteButton productId={product.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
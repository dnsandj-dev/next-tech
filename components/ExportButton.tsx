'use client';

export default function ExportButton({ data }: { data: any[] }) {
  const exportToCSV = () => {
    // 1. Define CSV headers
    const headers = ["Product Name,Category,SKU,Price,Vendor\n"];
    
    // 2. Map data rows (ensuring we handle commas in names by wrapping in quotes)
    const rows = data.map(p => 
      `"${p.name}","${p.category}","${p.sku || 'N/A'}",${p.basePrice},"${p.vendor.name}"`
    );

    // 3. Combine and create a blob
    const csvContent = headers.concat(rows.join("\n")).join("");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // 4. Create a temporary link and trigger download
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `inventory_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={exportToCSV}
      className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition flex items-center gap-2"
    >
      <span>📥</span> Export to CSV
    </button>
  );
}
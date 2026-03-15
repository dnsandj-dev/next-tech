'use client';

export default function PrintReportButton() {
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `StudyUnlock_Inventory_Report_${new Date().toISOString().split('T')[0]}`;
    window.print();
    document.title = originalTitle;
  };

  return (
    <button
      onClick={handlePrint}
      className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors shadow-sm"
    >
      <span className="text-lg">📄</span>
      Download PDF Report
    </button>
  );
}
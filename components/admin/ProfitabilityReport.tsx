import React from 'react';
import { TrendingUp, DollarSign, Percent, ArrowUpRight } from 'lucide-react';

// 1. Define the structure of your financial data
interface ProfitabilityData {
  revenue: number;
  expenses: number;
  projections: number;
  margin?: number;
}

interface ProfitabilityReportProps {
  data: ProfitabilityData;
}

// 2. Apply the interface to the component
const ProfitabilityReport = ({ data }: ProfitabilityReportProps) => {
  // Now you can use data.revenue or data.expenses safely!
  const totalRevenue = data.revenue;
  const totalCost = data.expenses;
  const grossProfit = totalRevenue - totalCost;

  return (
    <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
      {/* Your UI Logic here */}
    </div>
  );
};

export default ProfitabilityReport;
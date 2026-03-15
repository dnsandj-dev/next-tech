export interface ProductWithVendor {
  createdAt: Date;
  basePrice: number;
  lastMaintenance: Date | null;
  status: string;
}

export const inventoryUtils = {
  getWarrantyInfo(createdAt: Date) {
    const expiryDate = new Date(createdAt);
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    const isExpired = new Date() > expiryDate;
    return { expiryDate, isExpired };
  },

  getAssetLifeInfo(createdAt: Date, basePrice: number) {
    const now = new Date();
    const purchaseDate = new Date(createdAt);
    const ageInMonths = (now.getFullYear() - purchaseDate.getFullYear()) * 12 + 
                        (now.getMonth() - purchaseDate.getMonth());
    const depreciationRate = Math.min(ageInMonths / 60, 1);
    const currentBookValue = basePrice * (1 - depreciationRate);
    const lifeRemaining = Math.max(0, 100 - (depreciationRate * 100));
    return { currentBookValue, lifeRemaining };
  },

  isMaintenanceOverdue(lastMaintenance: Date | null) {
    if (!lastMaintenance) return false;
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return new Date(lastMaintenance) < sixMonthsAgo;
  },

  calculateAnalytics(products: ProductWithVendor[]) {
    const now = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    const twelveMonthsFromNow = new Date();
    twelveMonthsFromNow.setMonth(twelveMonthsFromNow.getMonth() + 12);

    return products.reduce((acc, p) => {
      const { currentBookValue } = this.getAssetLifeInfo(p.createdAt, p.basePrice);
      const isOverdue = this.isMaintenanceOverdue(p.lastMaintenance);
      const isUnprotected = new Date(p.createdAt) < oneYearAgo;
      
      // Calculate end of 60-month life
      const endOfLifeDate = new Date(p.createdAt);
      endOfLifeDate.setMonth(endOfLifeDate.getMonth() + 60);

      acc.totalValue += p.basePrice;
      acc.totalBookValue += currentBookValue;
      
      if (isUnprotected) acc.totalRiskValue += p.basePrice;
      if (p.status === "Maintenance") acc.maintenanceCount++;
      if (isOverdue) acc.overdueCount++;
      
      // Forecast Logic: If life ends now or within the next 12 months
      if (endOfLifeDate <= twelveMonthsFromNow) {
        acc.replacementForecast += p.basePrice;
      }

      return acc;
    }, {
      totalValue: 0,
      totalBookValue: 0,
      totalRiskValue: 0,
      maintenanceCount: 0,
      overdueCount: 0,
      replacementForecast: 0
    });
  }
};
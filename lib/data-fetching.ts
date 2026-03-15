import { prisma } from "@/lib/prisma";

export async function getProfitabilityStats() {
  // 1. Get total revenue and item count from OrderItems
  const aggregateData = await prisma.orderItem.aggregate({
    _sum: {
      price: true, 
    },
    _count: {
      id: true,
    },
  });

  // 2. Fetch products with their related order items
  const products = await prisma.product.findMany({
    select: {
      category: true,
      basePrice: true,
      orderItems: { // Verified relation name
        select: {
          price: true,
          quantity: true,
        }
      }
    }
  });

  // 3. Process data for the UI
  // Removed the duplicate 'const categoryStats' and 'categoryData' references
  const categoryStats = products.reduce((acc, curr) => {
    const cat = curr.category || 'Uncategorized';
    
    if (!acc[cat]) {
      acc[cat] = { revenue: 0, cost: 0 };
    }
    
    // Changed 'curr.items' to 'curr.orderItems' to match the Prisma select above
    curr.orderItems.forEach(item => {
      acc[cat].revenue += item.price * item.quantity;
      acc[cat].cost += curr.basePrice * item.quantity;
    });
    
    return acc;
  }, {} as Record<string, { revenue: number, cost: number }>);

  // 4. Format for the "MarginBar" components
  const formattedCategories = Object.keys(categoryStats).map(key => ({
    label: key,
    margin: Math.round(((categoryStats[key].revenue - categoryStats[key].cost) / categoryStats[key].revenue) * 100) || 0,
    revenue: categoryStats[key].revenue
  }));

  return {
    totalRevenue: aggregateData._sum.price || 0,
    totalOrders: aggregateData._count.id,
    categories: formattedCategories
  };
}
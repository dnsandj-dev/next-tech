'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. Update Status
export async function updateProductStatus(id: string, status: string) {
  await prisma.product.update({
    where: { id },
    data: { status },
  });
  revalidatePath('/inventory');
}
export async function serviceAsset(id: string) {
  await prisma.product.update({
    where: { id },
    data: { 
      lastMaintenance: new Date(),
      status: "Available" // We assume if it's serviced, it's ready for use
    },
  });
  revalidatePath('/inventory');
}
// 2. Bulk Maintenance
export async function setCategoryMaintenance(category: string) {
  await prisma.product.updateMany({
    where: { category },
    data: { status: "Maintenance" },
  });
  revalidatePath('/inventory');
}

// 3. Create Product
export async function createProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const basePrice = parseFloat(formData.get("basePrice") as string);
    const sku = formData.get("sku") as string;
    const vendorId = formData.get("vendorId") as string;

    await prisma.product.create({
      data: { name, category, basePrice, sku, vendorId },
    });

    revalidatePath("/inventory");
  } catch (error) {
    console.error("Create failed:", error);
  }
}

// 4. Delete Product
export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id },
  });
  revalidatePath("/inventory");
}
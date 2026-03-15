"use server"

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Action to create a new procurement request
 */
export async function createProcurementRequest(formData: FormData) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("Unauthorized");
  }

  // 1. Extract data from form
  const productId = formData.get("productId") as string;
  const quantity = parseInt(formData.get("quantity") as string);

  // 2. Fetch product to get current price
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) throw new Error("Product not found");

  // 3. Create Order and OrderItem in a Transaction
  await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({ where: { clerkId } });
    if (!user) throw new Error("User record not found in DB");

    await tx.order.create({
      data: {
        userId: user.id,
        totalAmount: product.basePrice * quantity,
        status: "PENDING",
        items: {
          create: {
            productId: product.id,
            quantity: quantity,
            price: product.basePrice,
          },
        },
      },
    });
  });

  // 4. Update the UI cache
  revalidatePath("/dashboard");
} // <--- This closes createProcurementRequest correctly

/**
 * Action to delete a product/asset
 */
export async function deleteProduct(id: string) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("Unauthorized");
  }

  // 1. Perform the deletion in the database
  await prisma.product.delete({
    where: { id },
  });

  // 2. Update the UI cache for the inventory and dashboard
  revalidatePath("/inventory");
  revalidatePath("/dashboard");
}
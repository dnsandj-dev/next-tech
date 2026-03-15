'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createVendor(formData: FormData) {
  const name = formData.get('name') as string;
  const contactPerson = formData.get('contactPerson') as string;
  const email = formData.get('email') as string;

  await prisma.vendor.create({
    data: { name, contactPerson, email, rating: 5 },
  });

  revalidatePath('/vendors');
  revalidatePath('/inventory'); // Update inventory dropdown too
}

export async function deleteVendor(id: string) {
  await prisma.vendor.delete({ where: { id } });
  revalidatePath('/vendors');
}
export async function setCategoryMaintenance(category: string) {
  await prisma.product.updateMany({
    where: { category },
    data: { 
      status: "Maintenance",
      lastMaintenance: new Date() // Updates the timestamp to "now"
    },
  });
  revalidatePath('/inventory');
}
"use client"

import { deleteProduct } from "@/app/action/procurement"; // Ensure this matches the function name
import { toast } from "react-hot-toast";

interface DeleteButtonProps {
  productId: string;
}

export default function DeleteButton({ productId }: DeleteButtonProps) {
  return (
    <form
      action={async () => {
        try {
          await deleteProduct(productId);
          toast.success("Asset removed from inventory");
        } catch (error) {
          toast.error("Failed to delete asset");
        }
      }}
    >
      <input type="hidden" name="id" value={productId} />
      <button type="submit" className="text-red-600 hover:text-red-800">
        Delete
      </button>
    </form>
  );
}
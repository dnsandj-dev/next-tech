import Image from "next/image";
import type { Product } from "@prisma/client";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="relative h-48 w-full">
        <Image
          src="/placeholder-product.jpg"
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="mt-2 font-medium">${product.basePrice.toFixed(2)}</p>
        <p className="text-sm text-gray-600">SKU: {product.sku}</p>
        <p className="text-sm text-gray-600">Status: {product.status}</p>
      </div>
    </div>
  );
}
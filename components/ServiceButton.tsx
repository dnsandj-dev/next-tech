'use client';

import { serviceAsset } from "@/app/inventory/actions";
import { toast } from "sonner";
import { useTransition } from "react";

export default function ServiceButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleService = () => {
    startTransition(async () => {
      await serviceAsset(id);
      toast.success("Maintenance records updated!");
    });
  };

  return (
    <button
      onClick={handleService}
      disabled={isPending}
      className="text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-tighter disabled:opacity-50"
    >
      {isPending ? "Updating..." : "⚙️ Mark Serviced"}
    </button>
  );
}
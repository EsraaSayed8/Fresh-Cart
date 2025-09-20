import React from "react";
import Products from "@/components/products/Products";

export default async function CategoryProducts({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className='flex flex-col justify-between items-center py-2 min-h-[90vh]'>
      <Products pagination={true} params={{ type: "category", value: id }} />
    </div>
  );
}

import Products from "@/components/products/Products";
import React from "react";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const { page } = await searchParams;
  return (
    <div className='flex flex-col items-center justify-center py-2 min-h-[90vh]'>
      <Products
        pagination={true}
        {...(page && { params: { type: "page", value: page } })}
      />
    </div>
  );
}

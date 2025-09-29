import Brand from "@/components/brand/Brand";
import { BrandType } from "@/types/brand.type";
import { ResponseDataType } from "@/types/responseData.type";
import React from "react";

export default async function Brands() {
  const brandsRes = await fetch(`${process.env.API_BASEURL}/brands`);

  if (!brandsRes.ok) throw new Error("Failed to fetch brands");

  const payload: ResponseDataType<BrandType> = await brandsRes.json();
  const { data: brands } = payload;

  return (
    <div className="flex flex-col items-center justify-center py-12 min-h-[90vh] bg-gray-50">
      <div className="w-[95%] lg:w-[80%] mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
          Our Brands
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
          {brands.map((brand: BrandType) => (
            <Brand key={brand._id} brand={brand} />
          ))}
        </div>
      </div>
    </div>
  );
}

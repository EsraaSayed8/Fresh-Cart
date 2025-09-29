import Brand from "@/components/brand/Brand";
import { BrandType } from "@/types/brand.type";
import { ResponseDataType } from "@/types/responseData.type";
import React from "react";

export default async function Brands() {
  let brands: BrandType[] = [];

  try {
    const brandsRes = await fetch(`${process.env.API_BASEURL}/brands`);
    if (brandsRes.ok) {
      const payload: ResponseDataType<BrandType> = await brandsRes.json();
      brands = payload.data;
    }
  } catch (error) {
    console.warn("Failed to fetch brands, showing empty list.", error);
    // brands هتفضل فاضية لو حصل أي error
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 min-h-[90vh] bg-gray-50">
      <div className="w-[95%] lg:w-[80%] mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
          Our Brands
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
          {brands.length > 0 ? (
            brands.map((brand: BrandType) => <Brand key={brand._id} brand={brand} />)
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No brands available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

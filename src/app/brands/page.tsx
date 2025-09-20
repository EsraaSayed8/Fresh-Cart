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
    <div className='flex flex-col items-center justify-center py-2 min-h-[90vh]'>
      <div className='w-[90%] lg:w-[70%] mx-auto my-4'>
        <div className='flex flex-wrap'>
          {brands.map((brand: BrandType) => (
            <Brand key={brand._id} brand={brand} />
          ))}
        </div>
      </div>
    </div>
  );
}

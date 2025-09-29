import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { BrandType } from "@/types/brand.type";

export default function Brand({ brand }: { brand: BrandType }) {
  return (
    <div className="w-full sm:w-32 md:w-36 lg:w-40">
      <Link href={`/brands/${brand._id}`}>
        <Card className="group p-3 flex flex-col items-center justify-center shadow-sm rounded-2xl border border-gray-200 hover:shadow-lg hover:border-emerald-500 transition-all duration-300 bg-white">
          <div className="relative w-full aspect-square flex items-center justify-center">
            <Image
              src={brand.image}
              alt={`${brand.name} Logo`}
              fill
              className="object-contain p-4 rounded-xl"
            />
          </div>
          <p className="mt-3 text-emerald-600 font-semibold text-center text-sm sm:text-base truncate group-hover:text-emerald-700 transition-colors">
            {brand.name}
          </p>
        </Card>
      </Link>
    </div>
  );
}

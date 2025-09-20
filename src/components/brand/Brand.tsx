import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { BrandType } from "@/types/brand.type";

export default async function Brand({ brand }: { brand: BrandType }) {
  return (
    <div className='w-1/2 md:w-1/3 lg:w-1/4 xl:1/5'>
      <div className='p-2 lg:p-4'>
        <Link href={`/brands/${brand._id}`}>
          <Card className='gap-1 p-2'>
            <CardHeader className='px-2!'>
              <CardTitle>
                <Image
                  src={brand.image}
                  alt='Brand Image'
                  width={500}
                  height={500}
                  className='object-contain w-full'
                />
              </CardTitle>
              <CardDescription className='text-emerald-500 text-center font-semibold text-sm lg:text-lg line-clamp-1'>
                {brand.name}
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}

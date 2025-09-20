import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import WishlistBtn from "./WishlistBtn";
import CartBtn from "./CartBtn";
import { ProductType } from "@/types/product.type";

export default function Product({
  product,
  wishlist,
  updateParent,
}: {
  product: ProductType;
  wishlist?: string[];
  updateParent?: {
    update: boolean;
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  };
}) {
  return (
    <div className='w-1/2 md:w-1/3 lg:w-1/4 xl:1/5'>
      <div className='p-2 lg:p-4'>
        <Card className='gap-1 p-2 relative'>
          <div
            className='absolute'
            {...(updateParent
              ? { onClick: () => updateParent.setUpdate(!updateParent.update) }
              : {})}
          >
            <WishlistBtn
              productId={product._id}
              state={wishlist?.includes(product._id)}
            />
          </div>

          <Link href={`/products/${product._id}`}>
            <CardHeader className='px-2!'>
              <CardTitle>
                <Image
                  src={product.imageCover}
                  alt='Product Image'
                  width={500}
                  height={500}
                />
              </CardTitle>
              <CardDescription className='text-emerald-500 text-sm lg:text-lg'>
                {product.category.name}
              </CardDescription>
            </CardHeader>
            <CardContent className='px-2!'>
              <p className='font-semibold line-clamp-2 lg:line-clamp-1 text-sm lg:text-lg'>
                {product.title}
              </p>
            </CardContent>
            <CardFooter className='px-2!'>
              <div className='flex justify-between w-full'>
                <span className='text-sm lg:text-lg'>{product.price} EGP</span>
                <span className='text-sm lg:text-lg'>
                  {product.ratingsAverage}
                  <i className='fas fa-star text-yellow-500'></i>
                </span>
              </div>
            </CardFooter>
          </Link>

          <CartBtn productId={product._id} />
        </Card>
      </div>
    </div>
  );
}

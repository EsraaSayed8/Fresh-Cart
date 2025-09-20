"use client";
import Product from "@/components/products/Product";
import { ProductType } from "@/types/product.type";
import getLoggedUserWishlist from "@/utilities/Wishlist/getLoggedUserWishlist";
import React, { useEffect, useState } from "react";

export default function WishlistPage() {
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<{ data: ProductType[] }>();
  const wishlistProductsID = wishlist?.data.map((item) => item._id);

  async function init() {
    setWishlist(await getLoggedUserWishlist());
    setLoading(false);
  }

  useEffect(() => {
    init();
  }, [update]);

  if (loading)
    return (
      <div className='flex flex-col items-center justify-center py-8 min-h-[90vh]'>
        <span className='loader'></span>
      </div>
    );

  if (wishlist?.data.length === 0) {
    return (
      <div className='flex flex-col items-center py-2 min-h-[90vh]'>
        <div className='w-[90%] lg:w-[70%] mx-auto my-4'>
          <h1 className='w-full text-center text-gray-600 text-lg mt-8 lg:text-4xl'>
            You have no products currently wishlisted!
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center py-2 min-h-[90vh]'>
      <div className='w-[90%] lg:w-[70%] mx-auto my-4'>
        <div className='flex flex-wrap'>
          {wishlist?.data.map((item: ProductType) => (
            <Product
              key={item._id}
              product={item}
              wishlist={wishlistProductsID}
              updateParent={{ update, setUpdate }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

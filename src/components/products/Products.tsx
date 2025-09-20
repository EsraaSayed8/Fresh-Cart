import React from "react";
import Product from "./Product";
import Pages from "./Pages";
import Image from "next/image";
import image from "../../../public/error.png";
import { ProductType } from "@/types/product.type";
import { MetadataType } from "@/types/metadata.type";
import { ResponseDataType } from "@/types/responseData.type";
import getLoggedUserToken from "@/utilities/getLoggedUserToken";

export default async function Products({
  pagination = false,
  params,
}: {
  params?: { type: string; value: string };
  pagination?: boolean;
}) {
  let products: ProductType[], metadata: MetadataType;
  try {
    const productsRes = params
      ? await fetch(
          `${process.env.API_BASEURL}/products?${params.type}=${params.value}`
        )
      : await fetch(`${process.env.API_BASEURL}/products`);

    if (!productsRes.ok)
      throw new Error("We were unable to load our products!");

    const payload: ResponseDataType<ProductType> = await productsRes.json();

    products = payload.data;
    metadata = payload.metadata;

    if (products.length <= 0)
      throw new Error("No products available at the moment!");
  } catch (err) {
    if (err instanceof Error)
      return (
        <div className='w-[90%] lg:w-[70%] mx-auto p-4 flex flex-col items-center gap-2 mt-8'>
          <h1 className='text-gray-600 mb-0'>{err.message}</h1>
          <span>Please try again later.</span>
          <Image src={image} alt='404 Products Not Found!' width={800} />
        </div>
      );
  }

  const token = await getLoggedUserToken();

  let wishlist: ProductType[] | null = null;
  if (token) {
    const wishlistRes = await fetch(`${process.env.API_BASEURL}/wishlist`, {
      headers: {
        token,
      },
    });

    if (wishlistRes.ok) {
      wishlist = (await wishlistRes.json()).data;
      const wishlistProductsID = wishlist!.map((product) => product._id);

      return (
        <>
          <div className='w-[90%] lg:w-[70%] mx-auto my-4'>
            <div className='flex flex-wrap'>
              {products!.map((product: ProductType) => (
                <Product
                  key={product._id}
                  product={product}
                  wishlist={wishlistProductsID}
                />
              ))}
            </div>
          </div>
          {pagination && <Pages data={metadata!} />}
        </>
      );
    }
  }

  return (
    <>
      <div className='w-[90%] lg:w-[70%] mx-auto my-4'>
        <div className='flex flex-wrap'>
          {products!.map((product: ProductType) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
      {pagination && <Pages data={metadata!} />}
    </>
  );
}

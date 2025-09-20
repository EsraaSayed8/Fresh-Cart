"use client";
import removeCartItem from "@/actions/removeCartItem.action";
import updateCartItem from "@/actions/updateCartItem.action";
import { CartItemType } from "@/types/cartItem.type";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

export default function CartItem({
  cartItem,
  setNumberOfItems,
}: {
  cartItem: CartItemType;
  setNumberOfItems: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [actionsDisabled, setActionsDisabled] = useState(false);
  const { count, product, price } = cartItem;

  async function handleUpdate(incremental: boolean) {
    setActionsDisabled(true);
    const { status } = await updateCartItem(
      product._id,
      incremental ? count + 1 : count - 1
    );
    if (status === "success") {
      setNumberOfItems((prev) => (incremental ? prev + 1 : prev - 1));
      toast.success("Product was updated successfully!", {
        position: "bottom-right",
        duration: 2000,
      });
    }
    setActionsDisabled(false);
  }

  async function handleDelete() {
    setActionsDisabled(true);
    const { status } = await removeCartItem(product._id);
    if (status === "success") {
      setNumberOfItems((prev: number) => prev - count);
      toast.success("Product was removed successfully!", {
        position: "bottom-right",
        duration: 2000,
      });
    }
    setActionsDisabled(false);
  }

  return (
    <div className='overflow-hidden shadow-lg shadow-gray-300 flex flex-col md:flex-row rounded-lg'>
      <div className='w-full md:w-2/12 flex justify-center p-2'>
        <Image
          src={cartItem.product.imageCover}
          alt='Product Image'
          className='object-contain h-[200px] md:h-[150px] lg:h-[200px]'
          width={200}
          height={200}
        />
      </div>
      <div className='w-full md:w-6/12 flex items-center justify-center p-2'>
        <div>
          <h1 className='mt-4 mb-2 font-bold text-3xl'>
            <Link href={`/products/${product._id}`}>{product.title}</Link>
          </h1>
          <p className='text-gray-600'>
            <Link
              href={`/categories/${product.category._id}`}
              className='text-emerald-600'
            >
              {product.category.name}
            </Link>
            {" | "}
            <Link href={`/brands/${product.brand._id}`}>
              {product.brand.name}
            </Link>
          </p>
          <div className='flex justify-between'>
            <span>{price} EGP</span>
            <span>
              {product.ratingsAverage}{" "}
              <i className='fas fa-star text-amber-500'></i>
            </span>
          </div>
        </div>
      </div>
      <div className='w-full md:w-2/12 flex items-center justify-center pb-4 md:pt-4'>
        <span className='underline underline-offset-4'>
          {price * count} EGP
        </span>
      </div>
      <div className='w-full md:w-1/12 flex md:flex-col-reverse'>
        <button
          onClick={() => handleUpdate(false)}
          className='w-1/3 md:w-full h-full md:h-1/3 flex items-center p-4 justify-center bg-gray-100 hover:bg-gray-200 disabled:opacity-70 disabled:cursor-not-allowed'
          disabled={actionsDisabled}
        >
          {actionsDisabled ? (
            <i className='fas fa-spinner rotate-[360deg] animate-spin'></i>
          ) : (
            <i className='fas fa-minus'></i>
          )}
        </button>
        <div className='w-1/3 md:w-full h-full md:h-1/3 flex items-center p-4 justify-center bg-gray-100'>
          <span className='text-sm md:text-lg'>{count}</span>
        </div>
        <button
          onClick={() => handleUpdate(true)}
          className='w-1/3 md:w-full h-full md:h-1/3 flex items-center p-4 justify-center bg-gray-100 hover:bg-gray-200 disabled:opacity-70 disabled:cursor-not-allowed'
          disabled={actionsDisabled}
        >
          {actionsDisabled ? (
            <i className='fas fa-spinner rotate-[360deg] animate-spin'></i>
          ) : (
            <i className='fas fa-plus'></i>
          )}
        </button>
      </div>
      <button
        onClick={handleDelete}
        className='w-full md:w-1/12 bg--[#0c5a5cdc] text-white hover:bg-white hover:text-[#0c5a5cdc] cursor-pointer flex items-center justify-center p-4 text-sm md:text-lg disabled:opacity-70 disabled:cursor-not-allowed'
        disabled={actionsDisabled}
      >
        {actionsDisabled ? (
          <i className='fas fa-spinner rotate-[360deg] animate-spin'></i>
        ) : (
          <i className='fas fa-trash'></i>
        )}
      </button>
    </div>
  );
}

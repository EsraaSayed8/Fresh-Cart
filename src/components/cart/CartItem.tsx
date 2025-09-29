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
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="w-full md:w-2/12 flex justify-center p-2">
        <Image
          src={cartItem.product.imageCover}
          alt="Product Image"
          className="object-contain h-[180px] md:h-[150px] lg:h-[180px] rounded-xl"
          width={200}
          height={200}
        />
      </div>

      <div className="w-full md:w-6/12 flex flex-col justify-center p-2">
        <h1 className="mt-2 mb-1 font-bold text-xl md:text-2xl lg:text-3xl">
          <Link href={`/products/${product._id}`} className="hover:text-emerald-600 transition-colors">
            {product.title}
          </Link>
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          <Link href={`/categories/${product.category._id}`} className="text-emerald-600 hover:underline">
            {product.category.name}
          </Link>
          {" | "}
          <Link href={`/brands/${product.brand._id}`} className="hover:underline">
            {product.brand.name}
          </Link>
        </p>
        <div className="flex justify-between mt-2 text-gray-800 font-semibold">
          <span>{price} EGP</span>
          <span className="flex items-center gap-1">
            {product.ratingsAverage}
            <i className="fas fa-star text-amber-500"></i>
          </span>
        </div>
      </div>

      <div className="w-full md:w-2/12 flex items-center justify-center pb-2 md:pt-2">
        <span className="text-lg font-bold text-gray-800">{price * count} EGP</span>
      </div>

      <div className="w-full md:w-1/12 flex md:flex-col rounded-lg overflow-hidden border border-gray-200">
        <button
          onClick={() => handleUpdate(false)}
          className="flex-1 flex items-center justify-center p-3 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={actionsDisabled}
        >
          {actionsDisabled ? (
            <i className="fas fa-spinner animate-spin"></i>
          ) : (
            <i className="fas fa-minus"></i>
          )}
        </button>
        <div className="flex-1 flex items-center justify-center p-3 bg-gray-50 font-semibold">
          {count}
        </div>
        <button
          onClick={() => handleUpdate(true)}
          className="flex-1 flex items-center justify-center p-3 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={actionsDisabled}
        >
          {actionsDisabled ? (
            <i className="fas fa-spinner animate-spin"></i>
          ) : (
            <i className="fas fa-plus"></i>
          )}
        </button>
      </div>

 <button
  onClick={handleDelete}
className="w-full md:w-1/12 text-[#E5E7EB] hover:bg-white hover:text-[#0c5a5cdc] cursor-pointer flex items-center justify-center p-4 text-sm md:text-lg disabled:opacity-70 disabled:cursor-not-allowed"
  disabled={actionsDisabled}
>
  {actionsDisabled ? (
    <i className="fas fa-spinner rotate-[360deg] animate-spin"></i>
  ) : (
    <i className="fas fa-trash"></i>
  )}
</button>

    </div>
  );
}

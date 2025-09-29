"use client";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import addToCart from "@/actions/addToCart.action";
import { toast } from "sonner";
import { CartContext } from "@/context/CartContext";

type CartBtnProps = {
  productId: string;
  className?: string; // السماح بتمرير className من برّه
};

export default function CartBtn({ productId, className }: CartBtnProps) {
  const context = useContext(CartContext);

  if (!context) throw new Error("Not exist");

  const { setNumberOfItems } = context;

  async function handleClick() {
    toast.promise(async () => await addToCart(productId), {
      position: "bottom-right",
      loading: "Updating your cart...",
      success: (res) => {
        setNumberOfItems((p) => p! + 1);
        return res.message;
      },
      error: (err) => err.message,
    });
  }

  return (
   <Button
  onClick={handleClick}
  className={`bg-gray-800 text-white w-full rounded-2xl py-2 transition-colors duration-300 hover:bg-black ${className || ""}`}
>
  Add To Cart
</Button>

  );
}

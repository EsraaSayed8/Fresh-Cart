"use client";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import addToCart from "@/actions/addToCart.action";
import { toast } from "sonner";
import { CartContext } from "@/context/CartContext";

export default function CartBtn({ productId }: { productId: string }) {
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
      className='bg-black text-white cursor-pointer w-full'
      onClick={handleClick}
    >
      Add To Cart
    </Button>
  );
}

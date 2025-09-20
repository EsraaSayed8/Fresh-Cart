"use client";
import addToWishlist from "@/actions/addToWishlist.action";
import removeFromWishlist from "@/actions/removeFromWishlist.action";
import React, { useState } from "react";
import { toast } from "sonner";

export default function WishlistBtn({
  productId,
  state,
}: {
  productId: string;
  state?: boolean;
}) {
  /**
   * false -> not wishlisted
   * true -> wishlisted
   */
  const [wishlisted, setWishlisted] = useState(state);
  const [disabled, setDisabled] = useState(false);

  async function handleClick() {
    setDisabled(true);
    if (state === undefined) {
      setDisabled(false);
      return toast.error("You must be logged to add to wishlist!", {
        position: "bottom-right",
        duration: 2000,
      });
    }

    toast.promise(
      async () => {
        const payload = wishlisted
          ? await removeFromWishlist(productId)
          : await addToWishlist(productId);

        setWishlisted(!wishlisted);
        setDisabled(false);
        return payload;
      },
      {
        position: "bottom-right",
        loading: "Updating your wishlist...",
        success: (res) => res.message,
        error: (err) => err.message,
      }
    );
  }

  return (
    <button
      className='text-pink-700 cursor-pointer text-xl hover:scale-110 transition-all disabled:cursor-not-allowed disabled:opacity-70'
      onClick={handleClick}
      disabled={disabled}
    >
      {wishlisted ? (
        <i className='fas fa-heart text-sm lg:text-lg'></i>
      ) : (
        <i className='far fa-heart text-sm lg:text-lg'></i>
      )}
    </button>
  );
}

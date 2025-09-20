"use client";
import CartItem from "@/components/cart/CartItem";
import React, { useContext, useEffect, useState } from "react";
import getLoggedUserCart from "@/utilities/Cart/getLoggedUserCart";
import CartCheckoutBtn from "@/components/cart/CartCheckoutBtn";
import { CartItemType } from "@/types/cartItem.type";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";

export default function Cart() {
  const context = useContext(CartContext);

  if (!context) throw new Error("Cart Context does not exist");

  const { numberOfItems, setNumberOfItems } = context;
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<{
    _id: string;
    products: CartItemType[];
  }>();

  async function init() {
    const { data } = await getLoggedUserCart();
    setCart(data);
    setLoading(false);
  }

  useEffect(() => {
    init();
  }, [numberOfItems]);

  if (loading)
    return (
      <div className='flex flex-col items-center justify-center py-8 min-h-[90vh]'>
        <span className='loader'></span>
      </div>
    );

  let total = 0;
  return (
    <div className='w-[90%] lg:w-[70%] mx-auto p-4 min-h-[90vh]'>
      <div className='flex flex-col gap-4'>
        {cart!.products.length > 0 ? (
          cart!.products.map((cartItem: CartItemType) => {
            total += cartItem.count * cartItem.price;
            return (
              <CartItem
                key={cartItem._id}
                cartItem={cartItem}
                setNumberOfItems={setNumberOfItems}
              />
            );
          })
        ) : (
          <div className='mt-24 text-center'>
            <h1 className='text-3xl md:text-5xl'>Your cart is empty!</h1>
            <Link href='/products' className='text-gray-600 text-xl underline'>
              Ready to start shopping?
            </Link>
          </div>
        )}
      </div>
      {cart!.products.length > 0 && (
        <div className='flex w-full md:w-1/2 outline-1 outline-gray-300 p-2 rounded-lg mt-4 mx-auto justify-between items-center'>
          <div className='total'>Total Price: {total} EGP</div>
          <CartCheckoutBtn />
        </div>
      )}
    </div>
  );
}

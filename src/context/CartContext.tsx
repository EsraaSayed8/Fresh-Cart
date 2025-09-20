"use client";
import getLoggedUserCart from "@/utilities/Cart/getLoggedUserCart";
import { createContext, useEffect, useState, ReactNode } from "react";

type CartContextType = {
  numberOfItems: number;
  setNumberOfItems: React.Dispatch<React.SetStateAction<number>>;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

type CartContextProviderProps = {
  children: ReactNode;
};

export default function CartContextProvider({
  children,
}: CartContextProviderProps) {
  const [numberOfItems, setNumberOfItems] = useState<number>(-1);

  async function getUserCart() {
    try {
      const { data: cart } = await getLoggedUserCart();

      setNumberOfItems(
        cart.products.reduce(
          (acc: number, currVal: { count: number }) => acc + currVal.count,
          0
        )
      );
    } catch (_) {
      setNumberOfItems(-1);
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberOfItems, setNumberOfItems }}>
      {children}
    </CartContext.Provider>
  );
}

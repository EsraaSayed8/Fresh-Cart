"use server";
import { ProductType } from "@/types/product.type";
import getLoggedUserToken from "@/utilities/getLoggedUserToken";

export default async function checkWishlist(productId: string): Promise<boolean> {
  const token = await getLoggedUserToken();
  
  if (!token) return false;

  const wishlistRes = await fetch(`${process.env.API_BASEURL}/wishlist`, {
    headers: {
      token,
    },
  });

  let wishlist: string[] | undefined = undefined;
  if (wishlistRes.ok) {
    wishlist = 
      (await wishlistRes.json()).data!.map((product: ProductType) => product._id);
  }

  return wishlist?.includes(productId) || false;
}
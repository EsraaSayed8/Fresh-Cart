"use server";

import { AuthError } from "@/errors/AuthErrors";
import getLoggedUserToken from "@/utilities/getLoggedUserToken";

export default async function removeCartItem(productId: string) {
  const token = await getLoggedUserToken();

  if (!token) throw new AuthError("You must login first!");

  const res = await fetch(`${process.env.API_BASEURL}/cart/${productId}`, {
    method: "DELETE",
    headers: {
      token,
    },
  });

  if (!res.ok) throw new Error("Couldn't remove product form your cart!");

  const payload = await res.json();
  if (payload.statusMsg === "fail") throw new AuthError(payload.message.replace('Token', 'credentials'), 'InvalidToken');
  
  return payload;
}

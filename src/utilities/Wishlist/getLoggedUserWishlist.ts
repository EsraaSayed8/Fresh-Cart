"use server";
import { AuthError } from "@/errors/AuthErrors";
import getLoggedUserToken from "@/utilities/getLoggedUserToken";

export default async function getLoggedUserWishlist() {
  const token = await getLoggedUserToken();
  
  if (!token) throw new AuthError();

  const res = await fetch(`${process.env.API_BASEURL}/wishlist`, {
    headers: {
      token,
    },
  });

  if (!res.ok) throw new Error();

  const payload = await res.json();
  if (payload.statusMsg === "fail") 
    throw new AuthError(payload.message.replace('Token', 'credentials'), 'InvalidToken');

  return payload;
}
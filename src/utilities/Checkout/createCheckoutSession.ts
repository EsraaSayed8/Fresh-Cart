"use server";
import getLoggedUserToken from "@/utilities/getLoggedUserToken";
import { AuthError } from "@/errors/AuthErrors";
import { AddressType } from "@/types/addressType";

export default async function OnlineCheckout(
  cartId: string,
  address: AddressType,
) {
  const token = await getLoggedUserToken();
    
  if (!token) throw new AuthError();

  const res = await fetch(`${process.env.API_BASEURL}/orders/checkout-session/${cartId}?url=${process.env.NEXT_URL}`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress: address }),
    }
  );

  const payload = await res.json();
  return payload;
}

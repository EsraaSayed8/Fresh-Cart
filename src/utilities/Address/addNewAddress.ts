"use server";
import { AuthError } from "@/errors/AuthErrors";
import getLoggedUserToken from "@/utilities/getLoggedUserToken";
import { AddressSchemaType } from "@/schema/address.schema";

export default async function addNewAddress(values: AddressSchemaType) {
  const token = await getLoggedUserToken();
    
  if (!token) throw new AuthError();
  
  const res = await fetch(`${process.env.API_BASEURL}/addresses`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })

  if (!res.ok) throw new Error("Failed to add new address data");

  const payload = await res.json();
  if (payload.statusMsg === "fail") throw new AuthError(payload.message.replace('Token', 'credentials'), 'InvalidToken');
  
  return payload;
}
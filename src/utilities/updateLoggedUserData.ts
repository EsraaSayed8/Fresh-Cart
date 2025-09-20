"use server";
import { AuthError } from "@/errors/AuthErrors";
import getLoggedUserToken from "./getLoggedUserToken";

export default async function updateLoggedUserData(values: { 
  name?: string, 
  email?: string, 
  phone?: string 
}) {
  const token = await getLoggedUserToken();
    
  if (!token) throw new AuthError();
  
  const res = await fetch(`${process.env.API_BASEURL}/users/updateMe/`, {
    method: "PUT",
    headers: {
      token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  });

  if (!res.ok) throw new Error("Failed to fetch cart data");

  const payload = await res.json();
  if (payload.statusMsg === "fail") throw new AuthError(payload.message.replace('Token', 'credentials'), 'InvalidToken');
  
  return payload;
}
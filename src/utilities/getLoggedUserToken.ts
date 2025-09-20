"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getLoggedUserToken() {
  try {
    const encriptedToken =
      (await cookies()).get(`next-auth.session-token`)?.value ||
      (await cookies()).get(`__Secure-next-auth.session-token`)?.value;

    if (!encriptedToken) {
      return null;
    }

    const token = await decode({
      token: encriptedToken,
      secret: process.env.NEXTAUTH_SECRET!,
    });

    return token?.token;
  } catch (_) {
    return null;
  }
}

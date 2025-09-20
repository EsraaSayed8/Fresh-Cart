import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.API_BASEURL}/auth/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const payload = await res.json();

        if (payload.message === "success") {
          const decodedToken: { id: string } = jwtDecode(payload.token);
          return {
            id: decodedToken.id,
            user: payload.user,
            token: payload.token,
          };
        } else {
          throw new Error(payload.message || "can't login for now");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as unknown as { user?: unknown }).user = (user as unknown as { user?: unknown }).user;
        (token as unknown as { token?: string }).token = (user as unknown as { token?: string }).token;
      }
      return token;
    },
    async session({ session, token }) {
      (session as unknown as { user?: unknown }).user = (token as unknown as { user?: unknown }).user;
      return session;
    },
  },
};

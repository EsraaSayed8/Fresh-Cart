// LoginForm.tsx
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";
import { loginSchema, LoginSchemaType } from "@/schema/login.schema";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(values: LoginSchemaType) {
    try {
      const res = await signIn("credentials", {
        email: values?.email,
        password: values?.password,
        redirect: false,
        callbackUrl: "/",
      });

      if (res?.ok) {
        toast.success("Logged In Successfully!", {
          position: "bottom-right",
          duration: 2000,
        });
        window.location.href = "/";
      } else {
        toast.error(res?.error, {
          position: "bottom-right",
          duration: 2000,
        });
      }
    } catch (_) {
      toast.error("Failed to send request, you might be offline!", {
        position: "bottom-right",
        duration: 2000,
      });
    }
  }

  return (
    <div className="flex flex-col items-stretch justify-center">
      <h1 className="font-bold text-emerald-700 text-center text-3xl mb-8">
        LogIn
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-semibold text-gray-700">Email:</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    className="rounded-md border-gray-300 focus:border-emerald-700 focus:ring-emerald-700"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-semibold text-gray-700">Password:</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    className="rounded-md border-gray-300 focus:border-emerald-700 focus:ring-emerald-700"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col items-center gap-2 text-center mb-4">
            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline text-emerald-700 font-semibold hover:text-emerald-800">
                Signup!
              </Link>
            </p>
            <p>
              <Link
                href="/forget-password"
                className="underline text-emerald-700 font-semibold hover:text-emerald-800"
              >
                Forgot password?
              </Link>
            </p>
          </div>

          <Button
            type="submit"
            className="w-full py-2 rounded-lg bg-emerald-700 text-white hover:bg-white hover:text-emerald-700 border border-emerald-700 transition-colors duration-300"
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}

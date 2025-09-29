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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { registerSchema, RegisterSchemaType } from "@/schema/register.schema";

export default function RegisterForm() {
  const router = useRouter();
  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(values: RegisterSchemaType) {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = await res.json().catch(() => ({}));

      if (res.ok) {
        toast.success("You Registered Successfully 👌", { position: "bottom-right", duration: 2000 });
        router.push("/login");
      } else {
        const msg = payload?.message || payload?.error || payload?.errors?.[0] || "Request could not be made!";
        throw new Error(msg);
      }
    } catch (error) {
      if (error instanceof TypeError) {
        toast.error("Failed to send request, you might be offline!", { position: "bottom-right", duration: 2000 });
      } else if (error instanceof Error) {
        toast.error(error.message, { position: "bottom-right", duration: 2000 });
      }
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center text-emerald-600 mb-8">Sign Up</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)}>
          {["name", "email", "phone", "password", "rePassword"].map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName as keyof RegisterSchemaType}
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="font-semibold text-gray-700 capitalize">
                    {fieldName === "rePassword" ? "Confirm Password" : fieldName}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={fieldName.includes("password") ? "password" : fieldName === "email" ? "email" : fieldName === "phone" ? "tel" : "text"}
                      className="rounded-lg border-gray-300 focus:border-emerald-600 focus:ring-emerald-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <div className="text-gray-600 text-center mb-4">
            Already have an account?{" "}
            <Link href="/login" className="underline text-emerald-700 font-semibold hover:text-emerald-800">
              Login!
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full py-2 rounded-lg bg-emerald-700 text-white hover:bg-white hover:text-emerald-700 border border-emerald-700 transition-colors duration-300"
          >
            Register Now
          </Button>
        </form>
      </Form>
    </div>
  );
}

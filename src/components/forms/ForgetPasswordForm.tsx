"use client";
import React, { useEffect, useState } from "react";
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
import {
  codeSchema,
  CodeSchemaType,
  emailSchema,
  EmailSchemaType,
} from "@/schema/forgotPassword.schema";
import { AuthError } from "@/errors/AuthErrors";
import sendVerificationCode from "@/utilities/ForgetPassword/sendVerificationCode";
import verifyCode from "@/utilities/ForgetPassword/verifyCode";
import { useRouter } from "next/navigation";

export default function ForgetPasswordForm() {
  const router = useRouter();
  const [counter, setCounter] = useState(0);
  const [timerId, setTimerId] = useState(-1);
  const [email, setEmail] = useState("");

  useEffect(() => {
    return () => clearTimeout(timerId);
  }, [timerId]);

  const form1 = useForm({
    defaultValues: { email: "" },
    resolver: zodResolver(emailSchema),
  });

  const form2 = useForm({
    defaultValues: { newPassword: "", code: "" },
    resolver: zodResolver(codeSchema),
  });

  async function handleSendCode(values: EmailSchemaType) {
    setCounter(30);
    toast.promise(
      async () => {
        const { statusMsg } = await sendVerificationCode(values);
        if (statusMsg !== "success")
          throw new Error("Failed to send request, you might be offline!");
        setEmail(values.email);

        const timer = window.setInterval(() => setCounter((prev) => prev - 1), 1000);
        setTimerId(timer);
      },
      {
        loading: "Sending verification code...",
        success: "Please check your e-mail!",
        error: (error) => {
          setCounter(0);
          return error.message;
        },
      }
    );
  }

  async function handleVerifyCode(values: CodeSchemaType) {
    toast.promise(
      async () => {
        try {
          const ok = await verifyCode(values, { email });
          if (!ok) throw new Error("Server Error");
          router.replace("/login");
          return "Password updated successfully!";
        } catch (error) {
          if (error instanceof AuthError) return error.message;
          return "Failed to send request, you might be offline!";
        }
      },
      {
        loading: "Updating your password...",
        success: (msg) => msg,
        error: (error) => error.message,
      }
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-6">
      <div className="w-full md:w-[70%] lg:w-[50%] bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-emerald-700 mb-8">
          Change Password
        </h1>

        <Form {...form1}>
          <form onSubmit={form1.handleSubmit(handleSendCode)}>
            <FormField
              control={form1.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel className="font-semibold text-gray-700">Email:</FormLabel>
                  <FormControl>
                    <div className="flex gap-3">
                      <Input
                        type="email"
                        {...field}
                        className="flex-1 rounded-lg border-gray-300 focus:border-emerald-600 focus:ring-emerald-600"
                      />
                      <Button
                        type="submit"
                        className={`w-32 rounded-lg bg-emerald-700 text-white hover:bg-white hover:text-emerald-700 border border-emerald-600 transition-colors duration-300`}
                        disabled={counter > 0}
                      >
                        {counter <= 0 ? "Send" : counter}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <Form {...form2}>
          <form onSubmit={form2.handleSubmit(handleVerifyCode)}>
            <FormField
              control={form2.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="font-semibold text-gray-700">New Password:</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      className="rounded-lg border-gray-300 focus:border-emerald-600 focus:ring-emerald-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form2.control}
              name="code"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="font-semibold text-gray-700">Code:</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      className="rounded-lg border-gray-300 focus:border-emerald-600 focus:ring-emerald-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col items-center gap-2 text-center mb-4">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="underline text-emerald-700 font-semibold hover:text-emerald-800"
                >
                  Signup!
                </Link>
              </p>
            </div>

            <Button
              type="submit"
              className="w-full py-2 rounded-lg bg-emerald-700 text-white hover:bg-white hover:text-emerald-700 border border-emerald-700 transition-colors duration-300"
            >
              Update Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

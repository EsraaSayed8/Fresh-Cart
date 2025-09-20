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
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(emailSchema),
  });
  const form2 = useForm({
    defaultValues: {
      newPassword: "",
      code: "",
    },
    resolver: zodResolver(codeSchema),
  });

  async function handleSendCode(values: EmailSchemaType) {
    setCounter(30);
    toast.promise(
      async () => {
        const { statusMsg } = await sendVerificationCode(values);

        if (statusMsg !== "success")
          throw new Error("Faild to send request, you might be offline!");
        setEmail(values.email);

        const timer = window.setInterval(
          () => setCounter((prev) => prev - 1),
          1000
        );
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

          if (!ok) throw new Error("Sever Error");

          router.replace("/login");
          return "Password updated successfully!";
        } catch (error) {
          if (error instanceof AuthError) {
            return error.message;
          }
          return "Faild to send request, you might be offline!";
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
    <div className='h-full flex flex-col items-stretch px-10 justify-center'>
      <h1 className='font-bold text-center text-[#0c5a5cdc] text-3xl mb-8'>Change Password</h1>
      <Form {...form1}>
        <form onSubmit={form1.handleSubmit(handleSendCode)}>
          <FormField
            control={form1.control}
            name='email'
            render={({ field }) => (
              <FormItem className='mb-4 w-full'>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <div className='flex gap-4'>
                    <Input type='email' {...field} />
                    <Button
                      type='submit'
                      className='w-1/5 cursor-pointer bg-[#0c5a5cdc] hover:bg-white hover:text-[#0c5a5cdc]'
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
            name='newPassword'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>New Password:</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form2.control}
            name='code'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>Code:</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='text-gray-600 text-center w-full'>
            Don&apos;T have an account?{" "}
            <Link href='/register' className='underline text-[#0c5a5cdc] font-bold'>
              Signup!
            </Link>
          </div>
          <Button type='submit' className='my-4 w-full bg-[#0c5a5cdc] hover:bg-white hover:text-[#0c5a5cdc] cursor-pointer'>
            Update Password
          </Button>
        </form>
      </Form>
    </div>
  );
}

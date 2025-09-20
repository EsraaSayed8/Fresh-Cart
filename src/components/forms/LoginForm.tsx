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
      toast.error("Faild to send request, you might be offline!", {
        position: "bottom-right",
        duration: 2000,
      });
    }
  }

  return (
    <div className='h-full flex flex-col items-stretch px-10 justify-center'>
      <h1 className='font-bold text-[#0c5a5cdc] text-center text-3xl m-8 '>Log In</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)}>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
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
          <div className='text-[#0c5a5cdc] text-center w-full'>
            <Link
            
              href='/forget-password'
              className='underline text-[#0c5a5cdc] font-bold'
            >            Forgot password?{" "}

            </Link>
          </div>
          <Button type='submit' className=' bg-[#0c5a5cdc] hover:bg-white hover:text-[#0c5a5cdc] my-4 w-full cursor-pointer'>
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}

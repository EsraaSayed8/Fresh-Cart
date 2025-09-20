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
  const form = useForm({
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
      const res = await fetch(`${process.env.API_BASEURL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        toast.success("You Registerd Successfully 👌", {
          position: "bottom-right",
          duration: 2000,
        });
        router.push("/login");
      } else {
        throw new Error("Request could not be made!");
      }
    } catch (error) {
      if (error instanceof TypeError) {
        toast.error("Faild to send request, you might be offline!", {
          position: "bottom-right",
          duration: 2000,
        });
      } else if (error instanceof Error) {
        toast.error(error?.message, {
          position: "bottom-right",
          duration: 2000,
        });
      }
    }
  }

  return (
    <div className='m-10'>
      <h1 className='font-bold text-center text-[#0c5a5cdc] text-3xl my-8'>Sign Up</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)}>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>Name:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name='phone'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>Phone:</FormLabel>
                <FormControl>
                  <Input type='tel' {...field} />
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
          <FormField
            control={form.control}
            name='rePassword'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>Confirm Password:</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='text-gray-600 text-center w-full'>
            Already have an account?{" "}
            <Link href='/login' className='underline text-[#0c5a5cdc] font-bold'>
              Login!
            </Link>
          </div>
          <Button type='submit' className=' my-4 w-full bg-[#0c5a5cdc] hover:bg-white hover:text-[#0c5a5cdc] cursor-pointer'>
            Register Now
          </Button>
        </form>
      </Form>
    </div>
  );
}

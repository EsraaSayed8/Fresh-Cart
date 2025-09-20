"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema, PasswordSchemaType } from "@/schema/userDetails.shema";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import updateLoggedUserPassword from "@/utilities/updateLoggedUserPassword";
import { signOut } from "next-auth/react";

export default function UpdatePasswordForm() {
  const form = useForm({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(passwordSchema),
  });

  async function handleSubmit(values: PasswordSchemaType) {
    toast.promise(
      async () => {
        const { message, errors } = await updateLoggedUserPassword(values);
        if (message === "fail") throw new Error(errors.msg);
        signOut({ callbackUrl: "/login" });
      },
      {
        loading: "Updating your password...",
        success: "Password updated successfully!",
        error: (error) => error.message,
      }
    );
  }

  return (
    <div className='rounded-lg shadow-lg shadow-gray-200 py-4 px-8 w-full lg:w-1/2'>
      <h1 className='font-bold text-center text-3xl mb-8'>Update Password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name='currentPassword'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>Current Password:</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
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
                <FormLabel>New Password:</FormLabel>
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
                <FormLabel>Confirm New Password:</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='block mx-auto mt-8 mb-4 w-3/4 cursor-pointer'
          >
            Update Password
          </Button>
        </form>
      </Form>
    </div>
  );
}

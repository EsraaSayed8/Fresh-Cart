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
import {
  EmailSchemaType,
  NameSchemaType,
  PhoneSchemaType,
  updateEmailSchema,
  updateNameSchema,
  updatePhoneSchema,
} from "@/schema/userDetails.shema";
import { Input } from "@/components/ui/input";
import updateLoggedUserData from "@/utilities/updateLoggedUserData";
import { AuthError } from "@/errors/AuthErrors";
import { toast } from "sonner";

export default function UpdateDetailsForm() {
  const name = useForm({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(updateNameSchema),
  });
  const email = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(updateEmailSchema),
  });
  const phone = useForm({
    defaultValues: {
      phone: "",
    },
    resolver: zodResolver(updatePhoneSchema),
  });

  async function handleClick(
    values: NameSchemaType | EmailSchemaType | PhoneSchemaType
  ) {
    toast.promise(
      async () => {
        try {
          await updateLoggedUserData(values);
        } catch (error) {
          if (error instanceof AuthError) {
            return error.message;
          }
          return "Faild to send request, you might be offline!";
        }
      },
      {
        loading: "Updating your profile...",
        success: "Profile updated successfully!",
        error: (message) => message,
      }
    );
  }

  return (
    <div className='rounded-lg shadow-lg shadow-gray-200 py-4 px-8 w-full lg:w-1/2'>
      <h1 className='font-bold text-center text-3xl mb-8'>Update Details</h1>
      <Form {...name}>
        <form onSubmit={name.handleSubmit(handleClick)}>
          <FormField
            control={name.control}
            name='name'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>Name:</FormLabel>
                <FormControl className='flex gap-2'>
                  <div>
                    <Input className='w-3/4' type='text' {...field} />
                    <Button type='submit' className='w-1/4 cursor-pointer'>
                      Update
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Form {...email}>
        <form onSubmit={email.handleSubmit(handleClick)}>
          <FormField
            control={email.control}
            name='email'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>Email:</FormLabel>
                <FormControl className='flex gap-2'>
                  <div>
                    <Input className='w-3/4' type='email' {...field} />
                    <Button type='submit' className='w-1/4 cursor-pointer'>
                      Update
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Form {...phone}>
        <form onSubmit={phone.handleSubmit(handleClick)}>
          <FormField
            control={phone.control}
            name='phone'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>Phone:</FormLabel>
                <FormControl className='flex gap-2'>
                  <div>
                    <Input className='w-3/4' type='tel' {...field} />
                    <Button type='submit' className='w-1/4 cursor-pointer'>
                      Update
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

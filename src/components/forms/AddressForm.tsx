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
import { addressSchema, AddressSchemaType } from "@/schema/address.schema";
import { AddressType } from "@/types/addressType";
import addNewAddress from "@/utilities/Address/addNewAddress";
import { AuthError } from "@/errors/AuthErrors";

export default function AddressForm({
  setAddressess,
}: {
  setAddressess: React.Dispatch<React.SetStateAction<AddressType[]>>;
}) {
  const form = useForm({
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(addressSchema),
  });

  async function handleAddress(values: AddressSchemaType) {
    toast.promise(
      async () => {
        try {
          const { data: newAddresses } = await addNewAddress(values);
          setAddressess(newAddresses);
        } catch (error) {
          if (error instanceof AuthError) {
            return error.message;
          }
          return "Faild to send request, you might be offline!";
        }
      },
      {
        loading: "Updating your addresses...",
        success: "Address added successfully!",
        error: (msg) => msg,
      }
    );
  }

  return (
    <div className='h-full flex flex-col items-stretch px-10 py-15 justify-center'>
      <h1 className='font-bold text-center text-3xl mb-8'>Add New Address</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAddress)}>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>Alias:</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>City:</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='details'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>Details:</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
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

          <Button type='submit' className=' my-4 w-full cursor-pointer'>
            Add Address!
          </Button>
        </form>
      </Form>
    </div>
  );
}

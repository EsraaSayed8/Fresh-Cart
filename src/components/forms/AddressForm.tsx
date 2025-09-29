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
        success: "Address added successfully! 🎉",
        error: (msg) => msg,
      }
    );
  }

  return (
    <div className="h-full flex flex-col items-stretch px-6 py-10 justify-center bg-gray-50 rounded-xl shadow-md">
      <h1 className="font-bold text-center text-2xl mb-6 text-gray-700">
        ➕ Add New Address
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAddress)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">Alias</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="e.g. Home, Work"
                    className="rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">City</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="e.g. Cairo"
                    className="rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">Details</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Street, Building, Floor"
                    className="rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">Phone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="+20 100 123 4567"
                    className="rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 text-lg"
          >
            Save Address
          </Button>
        </form>
      </Form>
    </div>
  );
}

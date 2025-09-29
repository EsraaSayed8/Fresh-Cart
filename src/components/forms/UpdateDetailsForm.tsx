"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateNameSchema,
  updateEmailSchema,
  updatePhoneSchema,
  NameSchemaType,
  EmailSchemaType,
  PhoneSchemaType,
} from "@/schema/userDetails.shema";
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
import updateLoggedUserData from "@/utilities/updateLoggedUserData";
import { toast } from "sonner";
import { AuthError } from "@/errors/AuthErrors";

type UpdateDetailsType = NameSchemaType & EmailSchemaType & PhoneSchemaType;

const combinedSchema = updateNameSchema
  .merge(updateEmailSchema)
  .merge(updatePhoneSchema);

export default function UpdateDetailsForm() {
  const form = useForm<UpdateDetailsType>({
    resolver: zodResolver(combinedSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function handleSubmit(values: UpdateDetailsType) {
    toast.promise(
      async () => {
        try {
          await updateLoggedUserData(values);
        } catch (error) {
          if (error instanceof AuthError) {
            return error.message;
          }
          return "Failed to update details, you might be offline!";
        }
      },
      {
        loading: "Updating details...",
        success: "Details updated successfully!",
        error: (msg) => msg,
      }
    );
  }

  return (
    <div className="rounded-lg shadow-lg shadow-gray-200 py-6 px-8 w-full lg:w-1/2 bg-white">
      <h1 className="font-bold text-center text-2xl mb-6 text-emerald-700">
        Update Details
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" {...field} />
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
                <FormLabel className="text-sm font-medium">Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md"
          >
            Update Details
          </Button>
        </form>
      </Form>
    </div>
  );
}

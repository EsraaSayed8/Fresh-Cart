"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updatePasswordSchema,
  UpdatePasswordSchemaType,
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

export default function UpdatePasswordForm() {
  const form = useForm<UpdatePasswordSchemaType>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });

  async function handlePassword(values: UpdatePasswordSchemaType) {
    toast.promise(
      async () => {
        try {
          await updateLoggedUserData(values);
        } catch (error) {
          if (error instanceof AuthError) {
            return error.message;
          }
          return "Failed to send request, you might be offline!";
        }
      },
      {
        loading: "Updating your password...",
        success: "Password updated successfully!",
        error: (msg) => msg,
      }
    );
  }

  return (
    <div className="rounded-lg shadow-lg shadow-gray-200 py-6 px-8 w-full lg:w-1/2 bg-white">
      <h1 className="font-bold text-center text-2xl mb-6 text-emerald-700">
        Update Password
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handlePassword)}
          className="flex flex-col gap-4"
        >
          {/* Current Password */}
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Current Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter current password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  New Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button
            type="submit"
            className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md"
          >
            Update Password
          </Button>
        </form>
      </Form>
    </div>
  );
}

"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import updateLoggedUserPassword from "@/utilities/updateLoggedUserPassword"; 
import { toast } from "sonner";
import { AuthError } from "@/errors/AuthErrors";

type UpdatePasswordType = {
  currentPassword: string;
  password: string;
  rePassword: string;
};

export default function UpdatePasswordForm() {
  const form = useForm<UpdatePasswordType>({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });

  async function handleSubmit(values: UpdatePasswordType) {
    toast.promise(
      async () => {
        try {
          await updateLoggedUserPassword(values); 
        } catch (error) {
          if (error instanceof AuthError) return error.message;
          return "Failed to update password!";
        }
      },
      {
        loading: "Updating password...",
        success: "Password updated successfully!",
        error: (msg) => msg,
      }
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex flex-col gap-4 w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg"
    >
      <input
        type="password"
        placeholder="Current Password"
        {...form.register("currentPassword")}
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="New Password"
        {...form.register("password")}
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        {...form.register("rePassword")}
        className="border p-2 rounded"
      />
      <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
        Update Password
      </Button>
    </form>
  );
}

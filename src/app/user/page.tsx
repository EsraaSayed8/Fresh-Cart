"use client";
import UpdateDetailsForm from "@/components/forms/UpdateDetailsForm";
import UpdatePasswordForm from "@/components/forms/UpdatePasswordForm";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

export default function UserPage() {
  return (
    <div className='flex flex-col items-center py-2 min-h-[90vh]'>
      <div className='w-[90%] lg:w-[70%] mx-auto my-4'>
        <Button
          className='w-full md:w-1/2 lg:w-1/4 ml-auto block mb-4'
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </Button>
        <div className='flex flex-col lg:flex-row gap-4'>
          <UpdateDetailsForm />
          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
}

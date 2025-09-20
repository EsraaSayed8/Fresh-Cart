"use client";
import AddressForm from "@/components/forms/AddressForm";
import { AddressType } from "@/types/addressType";
import getLoggedUserAddresses from "@/utilities/Address/getLoggedUserAddresses";
import removeAddress from "@/utilities/Address/removeAddress";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AddressManagmentPage() {
  const [loading, setLoading] = useState(true);
  const [addressess, setAddressess] = useState<AddressType[]>([]);

  async function init() {
    const { data: userAddresses }: { data: AddressType[] } =
      await getLoggedUserAddresses();
    setAddressess(userAddresses);
    setLoading(false);
  }

  async function handleDelete(addressId: string) {
    toast.promise(
      async () => {
        const { status } = await removeAddress(addressId);
        if (status === "success") {
          await init();
          return "Address was removed successfully!";
        } else {
          throw new Error("Couldn't remove address, you might be offline!");
        }
      },
      {
        position: "bottom-right",
        loading: "Removing address...",
        success: (msg) => msg,
        error: (err) => err.message,
      }
    );
  }

  useEffect(() => {
    init();
  }, []);

  if (loading)
    return (
      <div className='flex flex-col items-center justify-center py-8 min-h-[90vh]'>
        <span className='loader'></span>
      </div>
    );

  return (
    <div className='w-full lg:w-[70%] mx-auto flex items-center py-8 min-h-[90vh]'>
      <div className='w-full flex flex-wrap mx-4 rounded-md overflow-hidden shadow-gray-300 shadow-lg justify-items-stretch'>
        <div className='w-full lg:w-full'>
          <h2 className='text-3xl text-white text-center border-2 p-2'>
                You haven&apos;t added any addresses yet!
              </h2>
          <AddressForm setAddressess={setAddressess} />
        </div>
      </div>
    </div>
  );
}

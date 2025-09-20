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
        <div className='bg-gray-100 w-full lg:w-1/2 lg:order-2 lg:h-full overflow-y-scroll flex flex-col items-center lg:min-h-[600px] gap-2 p-4'>
          {addressess.length > 0 ? (
            addressess.map((address: AddressType) => (
              <div
                key={address._id}
                className='w-full flex bg-white text-[#0c5a5cdc] rounded-lg shadow-gray-400 shadow-md overflow-hidden'
              >
                <div className='p-4 flex flex-col w-10/12'>
                  <div className='h-1/3'></div>
                  <div className='p-2'>
                    <h3 className='text-3xl'>{address.name}</h3>
                    <div className='flex justify-between w-full'>
                      <span>{address.city}</span>
                      <span>{address.phone}</span>
                    </div>
                    <p>{address.details}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(address._id)}
                  className='w-2/12 bg-black hover:bg-primary/90'
                >
                  <i className='fas fa-trash text-white text-xl'></i>
                </button>
              </div>
            ))
          ) : (
            <div className='w-full h-full flex items-center justify-center my-4 lg:mt-16'>
              <h2 className='text-3xl text-center'>
                You haven&apos;t added any addresses yet!
              </h2>
            </div>
          )}
        </div>
        <div className='w-full lg:w-1/2'>
          <AddressForm setAddressess={setAddressess} />
        </div>
      </div>
    </div>
  );
}

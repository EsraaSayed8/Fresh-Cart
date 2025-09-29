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
      <div className="flex flex-col items-center justify-center py-8 min-h-[90vh]">
        <span className="loader"></span>
      </div>
    );

  return (
    <div className="w-full lg:w-[70%] mx-auto py-12 min-h-[90vh]">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {addressess.length === 0 ? (
          <h2 className="text-2xl font-semibold text-center text-gray-600 mb-6">
            You haven&apos;t added any addresses yet 🚚
          </h2>
        ) : (
          <div className="grid gap-6 mb-8">
            {addressess.map((address) => (
              <div
                key={address._id}
                className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition"
              >
                <div>
                  <h3 className="font-semibold text-lg">{address.name}</h3>
                  <p className="text-sm text-gray-600">{address.city}</p>
                  <p className="text-sm text-gray-500">{address.details}</p>
                  <p className="text-sm text-gray-500">{address.phone}</p>
                </div>
                <button
                  onClick={() => handleDelete(address._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <AddressForm setAddressess={setAddressess} />
      </div>
    </div>
  );
}

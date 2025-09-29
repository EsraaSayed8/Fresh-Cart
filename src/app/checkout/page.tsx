"use client";
import getLoggedUserAddresses from "@/utilities/Address/getLoggedUserAddresses";
import getLoggedUserCart from "@/utilities/Cart/getLoggedUserCart";
import React, { useContext, useEffect, useState } from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useRouter } from "next/navigation";
import { AddressType } from "@/types/addressType";
import { toast } from "sonner";
import OnlineCheckout from "@/utilities/Checkout/createCheckoutSession";
import OfflineCheckout from "@/utilities/Checkout/createCashOrder";
import { CartContext } from "@/context/CartContext";

export default function CheckoutPage() {
  const context = useContext(CartContext);
  if (!context) throw new Error("Cart Context does not exist");
  const { setNumberOfItems } = context;

  const [loading, setLoading] = useState(true);
  const [cartId, setCartId] = useState();
  const [addressess, setAddressess] = useState<AddressType[]>([]);
  const [method, setMethod] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();

  async function load() {
    const { data: userAddresses, results } = await getLoggedUserAddresses();
    if (!results) return router.replace("/address");
    setAddressess(userAddresses);
    setValue(`${userAddresses[0]?._id}`);

    const { cartId } = await getLoggedUserCart();
    if (!cartId) return router.replace("/cart");
    setCartId(cartId);

    setLoading(false);
  }

  async function handleSubmit() {
    if (value == "")
      return toast.error("Please select a shipping address!", {
        position: "bottom-right",
        duration: 2000,
      });

    if (!cartId)
      return toast.error("Couldn't complete your purchase, please refresh!", {
        position: "bottom-right",
        duration: 2000,
      });

    if (method == "card") {
      toast.promise(
        async () => {
          const { status, session } = await OnlineCheckout(
            cartId,
            addressess.find((address) => address._id === value)!
          );

          if (status !== "success")
            throw new Error("Couldn't validate purchase!");
          window.location.href = session.url;
          return "Order complete!";
        },
        {
          position: "bottom-right",
          loading: "Validating your purchase...",
          success: (msg) => msg,
          error: (err) => err.message,
        }
      );
    } else if (method === "cash") {
      toast.promise(
        async () => {
          const { status } = await OfflineCheckout(
            cartId,
            addressess.find((address) => address._id === value)!
          );
          if (status !== "success")
            throw new Error("Couldn't validate purchase!");

          router.replace("/cart");
          setNumberOfItems(0);
          return "Order complete!";
        },
        {
          position: "bottom-right",
          loading: "Validating your purchase...",
          success: (msg) => msg,
          error: (err) => err.message,
        }
      );
    } else {
      return toast.error("Please select a payment method!", {
        position: "bottom-right",
        duration: 2000,
      });
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-8 min-h-[90vh]">
        <span className="loader"></span>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center py-10 min-h-[90vh] bg-gray-50">
      <div className="w-full lg:w-[70%] p-6 lg:p-12 bg-white rounded-2xl shadow-lg space-y-8">
        <h1 className="text-2xl lg:text-4xl font-bold text-center text-gray-800">
          Checkout
        </h1>
        <p className="text-center text-gray-500">
          Please choose a payment option and an address
        </p>

        {/* Address Selector */}
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-between w-full rounded-lg px-4 py-6 text-lg"
              >
                {value
                  ? addressess.find((address) => address._id === value)?.name
                  : "Select an address..."}
                <ChevronsUpDownIcon className="ml-2 h-5 w-5 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
              <Command>
                <CommandInput placeholder="Search address..." />
                <CommandList>
                  <CommandEmpty>No address found.</CommandEmpty>
                  <CommandGroup>
                    {addressess.map((address) => (
                      <CommandItem
                        key={address._id}
                        value={address._id}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === address._id
                              ? "opacity-100 text-emerald-500"
                              : "opacity-0"
                          )}
                        />
                        {address.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center justify-around gap-6 flex-wrap">
          <button
            onClick={() => setMethod("cash")}
            className={cn(
              "w-40 h-40 sm:w-48 sm:h-48 flex flex-col items-center justify-center rounded-2xl border-2 shadow-md transition-all duration-300",
              method === "cash"
                ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                : "border-gray-200 bg-gray-50 hover:border-emerald-300"
            )}
          >
            <i className="text-5xl fas fa-money-bills"></i>
            <h2 className="mt-2 font-semibold">Cash</h2>
          </button>

          <button
            onClick={() => setMethod("card")}
            className={cn(
              "w-40 h-40 sm:w-48 sm:h-48 flex flex-col items-center justify-center rounded-2xl border-2 shadow-md transition-all duration-300",
              method === "card"
                ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                : "border-gray-200 bg-gray-50 hover:border-emerald-300"
            )}
          >
            <i className="text-5xl fas fa-credit-card"></i>
            <h2 className="mt-2 font-semibold">Card</h2>
          </button>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full md:w-1/2 lg:w-1/3 mx-auto block py-6 text-lg rounded-xl bg-emerald-600 hover:bg-emerald-700"
        >
          Confirm Order
        </Button>
      </div>
    </div>
  );
}

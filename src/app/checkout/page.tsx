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
      return toast.error("Please select a shiping address!", {
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
  }, [load]);

  if (loading)
    return (
      <div className='flex flex-col items-center justify-center py-8 min-h-[90vh]'>
        <span className='loader'></span>
      </div>
    );

  return (
    <div className='flex flex-col items-center py-2 min-h-[90vh]'>
      <div className='w-full lg:w-[70%] p-4'>
        <h1 className='text-xl lg:text-3xl font-semibold text-center m-4'>
          Please choose a payment option and an address!
        </h1>
        <div className='w-full flex flex-col shadow-lg shadow-gray-200 p-8 lg:p-16 rounded-lg gap-8'>
          <div className='addresses'>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={open}
                  className='justify-between w-full'
                >
                  {value
                    ? addressess.find((address) => address._id === value)?.name
                    : "Select an address..."}
                  <ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-[200px] p-0'>
                <Command>
                  <CommandInput placeholder='Search framework...' />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {addressess.map((address) => (
                        <CommandItem
                          key={address._id}
                          value={address._id}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === address._id
                                ? "opacity-100"
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
          <div className='flex items-center justify-around'>
            <button
              onClick={() => setMethod("cash")}
              className='size-[100px] md:size-[150px] lg:size-[250px] xl:size-[400px] shadow-gray-300 shadow-lg rounded-2xl flex flex-col items-center justify-center gap-3 lg:gap-6 disabled:bg-gray-100 cursor-pointer'
              disabled={method === "cash"}
            >
              <i className='text-4xl lg:text-9xl fas fa-money-bills'></i>
              <h2>Cash</h2>
            </button>
            <button
              onClick={() => setMethod("card")}
              className='size-[100px] md:size-[150px] lg:size-[250px] xl:size-[400px] shadow-gray-300 shadow-lg rounded-2xl flex flex-col items-center justify-center gap-3 lg:gap-6 disabled:bg-gray-100 cursor-pointer'
              disabled={method === "card"}
            >
              <i className='text-4xl lg:text-9xl fas fa-credit-card'></i>
              <h2>Card</h2>
            </button>
          </div>
          <Button
            onClick={handleSubmit}
            className='w-full md:w-1/2 lg:w-1/4 mx-auto block lg:mt-6'
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

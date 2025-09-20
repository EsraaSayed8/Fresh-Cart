"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Input } from "./ui/input";

import amazon from "../../public/amazonpay.svg";
import express from "../../public/american_express.svg";
import mastercard from "../../public/mc_symbol.svg";
import paypal from "../../public/paypal.svg";
import appstore from "../../public/applestore.svg";
import googleplay from "../../public/googleplay.svg";

export default function Footer() {
  function handleEmail() {}
  return (
    <div className='bg-gray-100 p-8 lg:p-16'>
      <h1 className='text-4xl mb-2'>Get the FreshCart app</h1>
      <p className='text-gray-600 mb-4'>
        We will send you the link, open it on your phone to download the app.
      </p>
      <div className='p-4'>
        <div className='flex flex-col lg:flex-row items-center gap-4 mb-4'>
          <div className='w-full lg:w-3/4'>
            <Input type='email' placeholder='Email' />
          </div>
          <div className='w-full lg:w-1/4'>
            <button
              onClick={handleEmail}
              className='block bg-green-600 text-white text-lg w-2/4 md:w-1/4 lg:w-full mx-auto p-1 rounded-md'
            >
              Share App Link
            </button>
          </div>
        </div>
        <div className='flex flex-col lg:flex-row items-center justify-between border-y-2 border-gray-200 py-4'>
          <div className='flex justify-between lg:justify-start items-center gap-2 w-full'>
            <h2 className='text-sm'>Payment Partners</h2>
            <ul className='flex items-center gap-4'>
              <li>
                <Link href='#'>
                  <Image
                    className='object-center'
                    src={amazon}
                    alt='Amazon Pay Icon'
                    width={50}
                    height={50}
                  />
                </Link>
              </li>
              <li>
                <Link href='#'>
                  <Image
                    className='object-center'
                    src={express}
                    alt='American Express Icon'
                    width={50}
                    height={50}
                  />
                </Link>
              </li>
              <li>
                <Link href='#'>
                  <Image
                    className='object-center'
                    src={mastercard}
                    alt='Mastercard Icon'
                    width={50}
                    height={50}
                  />
                </Link>
              </li>
              <li>
                <Link href='#'>
                  <Image
                    className='object-center'
                    src={paypal}
                    alt='PayPal Icon'
                    width={50}
                    height={50}
                  />
                </Link>
              </li>
            </ul>
          </div>
          <div className='flex justify-between lg:justify-end items-center gap-2 w-full'>
            <span className='text-sm'>Get deliveries with FreshCart</span>
            <ul className='flex gap-2'>
              <li>
                <Link href='#'>
                  <Image
                    className='object-center'
                    src={appstore}
                    alt='App Store Icon'
                    width={100}
                  />
                </Link>
              </li>
              <li>
                <Link href='#'>
                  <Image
                    className='object-center'
                    src={googleplay}
                    alt='Google Play Icon'
                    width={100}
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

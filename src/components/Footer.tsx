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
    <footer className="bg-gradient-to-r from-gray-100 to-gray-200 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        {/* Section 1: Email App Link */}
        <div className="text-center lg:text-left mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            Get the FreshCart App
          </h1>
          <p className="text-gray-600 mb-6">
            We’ll send you the link — open it on your phone to download the app.
          </p>

          <div className="flex flex-col lg:flex-row items-center gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full lg:w-3/4 p-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleEmail}
              className="bg-green-600 hover:bg-green-700 text-white text-lg font-medium w-full lg:w-1/4 px-4 py-2 rounded-lg transition-all duration-300"
            >
              Share App Link
            </button>
          </div>
        </div>

        {/* Section 2: Payment & Apps */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-t border-gray-300 pt-6">
          {/* Payment Partners */}
          <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
            <h2 className="text-sm font-medium text-gray-700">
              Payment Partners:
            </h2>
            <ul className="flex items-center gap-6">
              {[amazon, express, mastercard, paypal].map((icon, idx) => (
                <li key={idx}>
                  <Link href="#">
                    <Image
                      src={icon}
                      alt="Payment Icon"
                      width={45}
                      height={45}
                      className="opacity-80 hover:opacity-100 transition duration-200"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* App Store Links */}
          <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
            <span className="text-sm text-gray-700">
              Get deliveries with FreshCart:
            </span>
            <ul className="flex gap-4">
              <li>
                <Link href="#">
                  <Image
                    src={appstore}
                    alt="App Store Icon"
                    width={120}
                    className="hover:scale-105 transition-transform duration-200"
                  />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Image
                    src={googleplay}
                    alt="Google Play Icon"
                    width={120}
                    className="hover:scale-105 transition-transform duration-200"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

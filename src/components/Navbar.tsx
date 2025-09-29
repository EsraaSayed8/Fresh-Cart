"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import logo from "../../public/freshcart-logo.svg";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "@/context/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuToggle, setMenuToggle] = useState(false);
  const { data: session } = useSession();
  const context = useContext(CartContext);

  if (!context) throw new Error("Not exist");

  const { numberOfItems } = context;

  return (
    <nav className="fixed z-50 w-full bg-white shadow-sm shadow-gray-300 transition-all duration-300">
      <div className="w-full lg:w-[90%] mx-auto p-4 flex gap-4 items-center">
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src={logo}
              alt="Fresh Cart Logo"
              width={200}
              className="transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </div>

        <div className="grow hidden md:flex gap-4 h-full">
          <div className="grow flex justify-between h-full">
            <ul className="flex gap-6 items-center text-gray-700 font-medium">
              <li>
                <Link
                  href="/"
                  className={`transition-colors duration-200 hover:text-gray-900 ${
                    pathname === "/" ? "underline underline-offset-4 text-gray-900" : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              {session && (
                <li className="relative">
                  <Link
                    href="/cart"
                    className={`transition-colors duration-200 hover:text-gray-900 ${
                      pathname === "/cart" ? "underline underline-offset-4 text-gray-900" : ""
                    }`}
                  >
                    Cart
                    {numberOfItems! > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gray-800 text-white w-5 h-5 flex items-center justify-center text-xs rounded-full shadow-sm">
                        {numberOfItems}
                      </span>
                    )}
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href="/products"
                  className={`transition-colors duration-200 hover:text-gray-900 ${
                    pathname === "/products" ? "underline underline-offset-4 text-gray-900" : ""
                  }`}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className={`transition-colors duration-200 hover:text-gray-900 ${
                    pathname === "/categories" ? "underline underline-offset-4 text-gray-900" : ""
                  }`}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/brands"
                  className={`transition-colors duration-200 hover:text-gray-900 ${
                    pathname === "/brands" ? "underline underline-offset-4 text-gray-900" : ""
                  }`}
                >
                  Brands
                </Link>
              </li>
            </ul>

            <ul className='hidden lg:flex gap-2 text-lg items-center'>
                <li>
                  <Link href='#'>
                    <i className='hover:text-xl hover:mx-0.5 mx-1 hover:text-pink-500 fab fa-instagram'></i>
                  </Link>
                </li>
                <li>
                  <Link href='#'>
                    <i className='hover:text-xl hover:mx-0.5 mx-1 hover:text-blue-600 fab fa-facebook'></i>
                  </Link>
                </li>
                <li>
                  <Link href='#'>
                    <i className='hover:text-xl hover:mx-0.5 mx-1 fab fa-tiktok'></i>
                  </Link>
                </li>
                <li>
                  <Link href='#'>
                    <i className='hover:text-xl hover:mx-0.5 mx-1 fab fa-x-twitter'></i>
                  </Link>
                </li>
                <li>
                  <Link href='#'>
                    <i className='hover:text-xl hover:mx-0.5 mx-1 hover:text-blue-900 fab fa-linkedin'></i>
                  </Link>
                </li>
                <li>
                  <Link href='#'>
                    <i className='hover:text-xl hover:mx-0.5 mx-1 hover:text-red-600 fab fa-youtube'></i>
                  </Link>
                </li>
              </ul>
          </div>

          <ul className="flex gap-4 items-center text-gray-700">
            {!session ? (
              <>
                <li>
                  <Link className="hover:text-gray-900 transition-colors" href="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-gray-900 transition-colors" href="/register">
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="hover:text-gray-900 cursor-pointer transition-colors">
                    Profile
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white text-gray-800 shadow-md rounded-lg">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.replace("/user")}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.replace("/address")}>
                      Addresses
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.replace("/wishlist")}>
                      Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            )}
          </ul>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuToggle(!menuToggle)}
            className="hover:bg-gray-100 rounded-md p-2 transition-colors"
          >
            <i className="fas fa-bars text-2xl text-gray-700 cursor-pointer"></i>
            {numberOfItems! > 0 && (
              <span className="absolute -top-1 -right-1 bg-gray-800 text-white w-5 h-5 flex items-center justify-center text-xs rounded-full shadow-sm">
                {numberOfItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {menuToggle && (
        <div className="absolute w-full z-50 md:hidden bg-white shadow-md rounded-b-lg p-4 transition-all">
          <ul className="flex flex-col gap-2 text-center text-gray-700 font-medium">
            {["/", "/products", "/categories", "/brands"].map((path) => (
              <li
                key={path}
                onClick={() => setMenuToggle(false)}
                className="rounded-md hover:bg-gray-100 transition-colors"
              >
                <Link className="block p-2" href={path}>
                  {path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                </Link>
              </li>
            ))}
            {session && (
              <li
                onClick={() => setMenuToggle(false)}
                className="rounded-md hover:bg-gray-100 transition-colors"
              >
                <Link className="flex items-center justify-center gap-2 p-2" href="/cart">
                  Cart
                  {numberOfItems! > 0 && (
                    <span className="block bg-gray-800 text-white w-5 h-5 text-xs rounded-full flex items-center justify-center">
                      {numberOfItems}
                    </span>
                  )}
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

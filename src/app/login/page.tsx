import Image from "next/image";
import React from "react";
import logo from "../../../public/freshcart-logo.svg";
import LoginForm from "@/components/forms/LoginForm";

export default function Login() {
  return (
    <div className="flex items-center justify-center mx-6 my-12 lg:my-0 lg:min-h-[90vh]">
      <div className="w-full md:w-[70%] lg:w-[50%] min-h-[450px] mx-auto flex flex-col items-stretch shadow-lg rounded-xl overflow-hidden bg-white">
        <div className="flex justify-center items-center py-6 bg-gray-50">
          <Image
            src={logo}
            alt="FreshCart Logo"
            width={180}
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="w-full px-8 py-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

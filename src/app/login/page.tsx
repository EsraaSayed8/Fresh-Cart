import Image from "next/image";
import React from "react";
import logo from "../../../public/freshcart-logo.svg";
import LoginForm from "@/components/forms/LoginForm";

export default function Login() {
  return (
<div className='flex items-center justify-center mx-6 my-12 lg:my-0 lg:min-h-[90vh]'>
  <div className='w-full md:w-[70%] min-h-[400px] mx-auto m-4 flex flex-col items-stretch shadow-gray-400 shadow-md rounded-md overflow-hidden'>
    <div className='w-full bg-gray-100'>
      <LoginForm />
    </div>
  </div>
</div>

  );
}

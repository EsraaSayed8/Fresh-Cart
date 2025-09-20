import RegisterForm from "@/components/forms/RegisterForm";
import React from "react";

export default function Register() {
  return (
<div className="flex items-center justify-center h-[90vh] m-6 lg:m-0">
  <div className="w-full md:w-[70%] mx-auto m-4 flex flex-col items-stretch shadow-gray-400 shadow-md rounded-md overflow-hidden">
    <div className="w-full bg-gray-100">
      <RegisterForm />
    </div>
  </div>
</div>

  );
}

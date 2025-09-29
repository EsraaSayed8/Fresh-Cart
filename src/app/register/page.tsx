import RegisterForm from "@/components/forms/RegisterForm";
import React from "react";

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-[90vh] px-6 bg-gray-50">
      <div className="w-full md:w-[70%] lg:w-[50%] mx-auto flex flex-col shadow-lg rounded-xl overflow-hidden bg-white">
        <RegisterForm />
      </div>
    </div>
  );
}

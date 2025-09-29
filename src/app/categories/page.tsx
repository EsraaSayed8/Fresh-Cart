import Image from "next/image";
import React from "react";
import image from "../../../public/error.svg";
import { ResponseDataType } from "@/types/responseData.type";
import { CategoryType } from "@/types/category.type";
import Category from "@/components/category/Category";

export default async function Categories() {
  let categories: CategoryType[];
  try {
    const categoriesRes = await fetch(`${process.env.API_BASEURL}/categories`);

    if (!categoriesRes.ok) throw new Error("Failed to fetch categories");

    const payload: ResponseDataType<CategoryType> = await categoriesRes.json();

    categories = payload.data;
  } catch (_) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[90%]">
        <div className="w-[90%] lg:w-[70%] mx-auto p-4 flex flex-col items-center gap-2 mt-8">
          <h1 className="text-gray-600 mb-0">
            We were unable to load our categories!
          </h1>
          <span>Please try again later.</span>
          <Image src={image} alt="404 Categories Not Found!" width={800} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-[90vh]">
      <div className="w-[90%] lg:w-[70%] mx-auto my-4">
        <div className="flex flex-wrap">
          {categories.map((category: CategoryType) => (
            <Category key={category._id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}

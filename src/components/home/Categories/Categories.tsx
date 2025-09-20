import React from "react";
import CategoriesSlider from "./CategoriesSlider";

export default async function Categories() {
  let categories;
  try {
    const res = await fetch(`${process.env.API_BASEURL}/categories`);
    const { data } = await res.json();
    categories = data;
  } catch (_) {
    return (
      <div className='w-full lg:w-[80%] mx-auto h-[200px] flex flex-col bg-red-400 items-center justify-center'>
        <h1>
          <i className='fa-solid fa-circle-exclamation'></i> Failed to load
          categories!
        </h1>
        <span className='text-gray-600'>
          Try reloading the page or try again later!
        </span>
      </div>
    );
  }

  return <CategoriesSlider categories={categories} />;
}

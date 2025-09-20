"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { CategoryType } from "@/types/category.type";

export default function CategoriesSlider({
  categories,
}: {
  categories: CategoryType[];
}) {
  return (
    <div className='w-full lg:w-[80%] mx-auto'>
      <Swiper
        spaceBetween={0}
        slidesPerView={7}
        breakpoints={{
          320: {
            slidesPerView: 3,
          },
          480: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 6,
          },
          1280: {
            slidesPerView: 6,
          },
          1536: {
            slidesPerView: 7,
          },
        }}
        modules={[Autoplay]}
        autoplay={{ delay: 2000 }}
      >
        {categories.map((category: CategoryType) => (
          <SwiperSlide key={category._id}>
            <Link href={`/category/${category._id}`}>
              <div className='relative'>
                <Image
                  src={category.image}
                  width={500}
                  height={500}
                  className='w-full h-[120px] lg:h-[200px] object-center'
                  alt='category cover image'
                />
                <div className='absolute bottom-0 w-full bg-black opacity-55 z-10 py-1'>
                  <p className='text-center text-white opacity-100 font-bold line-clamp-1'>
                    {category.name}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

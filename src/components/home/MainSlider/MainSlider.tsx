"use client";
import React from "react";
import img1 from "../../../../public/slider-image-1.jpeg";
import img2 from "../../../../public/slider-image-2.jpeg";
import img3 from "../../../../public/slider-image-3.jpeg";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function MainSlider() {
  return (
    <div className="w-full lg:w-[70%] mx-auto lg:my-12 flex gap-6 bg-transparent">
      <div className="w-full xl:w-3/4 rounded-3xl overflow-hidden shadow-lg">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{ delay: 2500 }}
          loop={true}
        >
          {[img1, img2, img3].map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[220px] sm:h-[450px] rounded-2xl overflow-hidden transition-transform duration-700 hover:scale-105">
                <Image
                  priority
                  src={img}
                  className="w-full h-full object-cover"
                  alt="sponsered deal"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden xl:flex flex-col gap-6 w-1/4">
        {[img2, img3].map((img, index) => (
          <div
            key={index}
            className="relative w-full h-[210px] rounded-2xl overflow-hidden shadow-md transition-transform duration-500 hover:scale-105"
          >
            <Image
              priority
              src={img}
              className="w-full h-full object-cover"
              alt="sponsered deal"
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

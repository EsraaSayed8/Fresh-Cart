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
    <>
      <div className='w-full lg:w-[70%] mx-auto lg:my-12 flex'>
        <div className='w-full xl:w-3/4'>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay]}
            autoplay={{ delay: 2000 }}
          >
            <SwiperSlide>
              <Image
                priority
                src={img1}
                className='w-full h-[200px] sm:h-[400px] object-cover'
                alt='sponsered deal'
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                priority
                src={img2}
                className='w-full h-[200px] sm:h-[400px] object-cover'
                alt='sponsered deal'
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                priority
                src={img3}
                className='w-full h-[200px] sm:h-[400px] object-cover'
                alt='sponsered deal'
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className='hidden xl:block w-1/4'>
          <Image
            priority
            src={img2}
            className='w-full h-[200px] object-cover'
            alt='sponsered deal'
          />
          <Image
            priority
            src={img3}
            className='w-full h-[200px] object-cover'
            alt='sponsered deal'
          />
        </div>
      </div>
    </>
  );
}

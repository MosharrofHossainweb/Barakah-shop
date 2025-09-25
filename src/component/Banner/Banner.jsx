// Banner.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = () => {
  const images = [
    "/images/fourwemen.png",
    "/images/threewemen.png",
    "/images/fourwemen.png",
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:px-4 lg:px-6 py-4 h-[200px] sm:h-[300px] md:h-[400px] lg:h-[600px]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="rounded-2xl shadow-lg h-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="h-full">
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover rounded-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;

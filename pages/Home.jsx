"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import CategoryHome from "@/components/CategoryHome";

// Custom arrow components
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="next-arrow absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 md:p-3 hover:bg-gray-600 transition-all z-10"
  >
    <FaChevronRight className="w-4 h-4 md:w-5 md:h-5" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="prev-arrow absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 md:p-3 hover:bg-gray-600 transition-all z-10"
  >
    <FaChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
  </button>
);

const Home = () => {
  const settings = {
    dots: false,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      <div className="slider-container relative">
        <Slider {...settings}>
          <div>
            <img
              src="/img/hero/slider1.webp"
              alt="Slide 1"
              className="w-full"
            />
          </div>
          <div>
            <img
              src="/img/hero/slider2.webp"
              alt="Slide 2"
              className="w-full"
            />
          </div>
          <div>
            <img
              src="/img/hero/slider3.webp"
              alt="Slide 3"
              className="w-full"
            />
          </div>
        </Slider>
      </div>

      <CategoryHome />
    </>
  );
};

export default Home;

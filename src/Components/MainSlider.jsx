import React, { useState, useEffect } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import books from "../DataUtils/books";

const MainSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bannerIndex, setBannerIndex] = useState(0);
  const itemsPerSlide = 3;

  const banners = [
    "https://d34a0mln2492j4.cloudfront.net/unsigned/resize:fit:1872:455:0/gravity:sm/plain/https%3A%2F%2Fbookscape-s3-bucket.s3-ap-south-1.amazonaws.com%2F6CC448506Cng_hero_banner_d.jpg",
    "https://d34a0mln2492j4.cloudfront.net/unsigned/resize:fit:1872:455:0/gravity:sm/plain/https%3A%2F%2Fbookscape-s3-bucket.s3-ap-south-1.amazonaws.com%2F33A86475ABHero_Banner_D_3.jpg",
  ];

  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(bannerInterval);
  }, []);

  useEffect(() => {
    const bookInterval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + itemsPerSlide) % books.length
      );
    }, 3000);
    return () => clearInterval(bookInterval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerSlide) % books.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - itemsPerSlide + books.length) % books.length
    );
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white mt-2">
      {/* Banner Section */}
      <div className="w-full h-56 md:h-80 lg:h-96 overflow-hidden relative">
        <img
          src={banners[bannerIndex]}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default MainSlider;

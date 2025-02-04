import React from "react";
import Slider from "react-slick";

// Custom Previous Button
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 rounded-full"
    style={{ zIndex: 10 }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-gray-800"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>
);

// Custom Next Button
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 rounded-full"
    style={{ zIndex: 10 }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-gray-800"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
);

const ImageCarousel = ({ book }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const images = book.image.split(" ");

  return (
    <div className="w-full md:w-1/2 relative">
      <Slider {...settings}>
        {images.map((img) => (
          <img
            src={img}
            alt={book.title}
            className="rounded-lg object-contain h-96 w-full"
          />
        ))}
        {/* <img
          src={book.imgUrl || undefined}
          alt="Book Cover 1"
          className="rounded-lg object-contain h-96 w-full"
        />
        <img
          src="https://www.crossword.in/cdn/shop/products/51TinqWWxpL_460x@2x.jpg?v=1685185758"
          alt="Book Cover 2"
          className="rounded-lg object-contain h-96 w-full"
        /> */}
      </Slider>
    </div>
  );
};

export default ImageCarousel;

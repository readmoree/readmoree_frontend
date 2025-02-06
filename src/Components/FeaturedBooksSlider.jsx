import React, { useEffect, useState } from "react";
import { getFeaturedBooks } from "../services/book";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookCard from "./BookCard"; // Reusing existing BookCard component

const FeaturedBooksSlider = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    async function fetchFeaturedBooks() {
      try {
        const books = await getFeaturedBooks();
        setFeaturedBooks(books);
      } catch (error) {
        console.error("Failed to load featured books", error);
      }
    }

    fetchFeaturedBooks();
  }, []);

  //   const settings = {
  //     dots: false,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 5,
  //     slidesToScroll: 1,
  //     responsive: [
  //       { breakpoint: 1024, settings: { slidesToShow: 3 } },
  //       { breakpoint: 768, settings: { slidesToShow: 2 } },
  //       { breakpoint: 480, settings: { slidesToShow: 1 } },
  //     ],
  //   };

  // Custom Prev Button
  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-[-30px] transform -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hover:bg-gray-200 transition"
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
      className="absolute top-1/2 right-[-30px] transform -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hover:bg-gray-200 transition"
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="relative px-8 md:px-10">
      <Slider {...settings}>
        {featuredBooks.map((book) => (
          <div key={book.id} className="flex gap-2">
            <BookCard book={book} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedBooksSlider;

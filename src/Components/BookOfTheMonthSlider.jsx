import React, { useEffect, useState } from "react";
import { getFeaturedBooks } from "../services/book";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookCard from "./BookCard";

const BookOfTheMonthSlider = () => {
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

  // Custom Prev Button
  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white shadow-lg p-3 rounded-full hover:bg-gray-200 transition"
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
      className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white shadow-lg p-3 rounded-full hover:bg-gray-200 transition"
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
    slidesToShow: 3, // Display 3 books per slide
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="relative w-full px-8 md:px-10">
      <Slider {...settings}>
        {featuredBooks.slice(0, 3).map((book, index) => (
          <div key={index} className="flex justify-center">
            <BookCard book={book} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BookOfTheMonthSlider;

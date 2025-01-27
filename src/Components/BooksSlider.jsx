import React from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import books from "../DataUtils/books";
import BookCard from "./BookCard";

const BooksSlider = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + books.length) % books.length
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
  };

  const visibleBooks = books
    .slice(currentIndex, currentIndex + 5)
    .concat(books.slice(0, Math.max(0, currentIndex + 5 - books.length)));

  return (
    <>
      <div className="flex items-center justify-center py-10 w-full">
        <button onClick={handlePrevClick} className="text-2xl mx-2">
          <i className="fas fa-chevron-left">
            <SlArrowLeft />
          </i>
        </button>
        <div className="overflow-hidden w-full max-w-7xl">
          <div className="flex transition-transform duration-700 ease-in-out">
            {visibleBooks.map((book, index) => (
              <BookCard key={index} book={book} />
            ))}
          </div>
        </div>
        <button onClick={handleNextClick} className="text-2xl mx-2">
          <i className="fas fa-chevron-right">
            <SlArrowRight />
          </i>
        </button>
      </div>
    </>
  );
};

export default BooksSlider;

import React, { useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import books from "../DataUtils/books";

const MainSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + books.length) % books.length
    );
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center  bg-white ml-2 mr-2 mt-3">
        <div className=" bg-[url('https://storage.googleapis.com/a1aa/image/5CJRzImrtObyNJj7nB5oX0C6W9jZuLty9VeHt5OOKqTxaCfTA.jpg')] bg-cover bg-center flex flex-col md:flex-row items-center p-6 rounded-lg shadow-xl w-full max-w-screen-2xl h-96">
          <button onClick={prevSlide} className="text-2xl">
            <i className="fas fa-chevron-left">
              <SlArrowLeft />
            </i>
          </button>
          <div className="flex flex-col items-start md:items-start md:mr-6 flex-grow pl-8">
            <h1 className="text-3xl font-bold mb-2">
              {books[currentIndex].bookName}
            </h1>
            <h2 className="text-lg mb-4">By {books[currentIndex].author}</h2>
            <div className="flex justify-center items-center mt-10">
              <button className="bg-lilac text-black px-4 py-2 rounded-full flex items-center">
                SHOP NOW <i className="fas fa-play ml-2"></i>
              </button>
              <button className="ml-2 bg-lilac text-black px-4 py-2 rounded-full flex items-center">
                AT 50% OFF<i className="fas fa-play ml-2"></i>
              </button>
            </div>
          </div>
          <div className="flex items-center mt-6 md:mt-0 rounded-lg">
            <img
              src={books[currentIndex].imageURL}
              alt={`Book cover of '${books[currentIndex].bookName}' by ${books[currentIndex].author}`}
              className="w-40 h-auto mr-6"
            />
          </div>
          <button onClick={nextSlide} className="text-2xl p-2">
            <i className="fas fa-chevron-right">
              <SlArrowRight />
            </i>
          </button>
        </div>
        <div className="flex mt-4">
          {books.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${
                index === currentIndex ? "bg-gray-800" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainSlider;

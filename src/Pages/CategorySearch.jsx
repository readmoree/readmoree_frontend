import { CiHeart } from "react-icons/ci";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Dropdown from "../Components/Dropdown";
import Books from "../DataUtils/books";
import Navbar from "../Components/Navbar";
const CategorySearch = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sortParameters = [
    { name: "Price: Low To High" },
    { name: "Price: High To Low" },
    { name: "Newest To Oldest" },
    { name: "Oldest To Newest" },
  ];
  const filterNames = [
    { name: "Category" },
    { name: "Subcategory" },
    { name: "Genre" },
    { name: "Format" },
    { name: "Author" },
    { name: "Language" },
    { name: "Price" },
  ];

  const maxLength = 30;
  return (
    <>
      <Navbar />
      <div className="font-mont mx-20 mb-20">
        <div className="heading text-center mt-20 text-2xl">
          <h1>Fiction Top 50</h1>
        </div>
        <div className="sortDropdown mt-14 flex justify-end">
          <div className="w-64 border border-gray-300 rounded px-5 py-3 mb-1 relative">
            {/* Dropdown Header */}
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <h2 className="font-semibold text-md">Sort By : Relevance</h2>
              <span className={`transform ${isOpen ? "rotate-180" : ""}`}>
                <MdKeyboardArrowDown />
              </span>
            </div>

            {/* Dropdown Options */}
            {isOpen && (
              <div className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-300 rounded shadow-md z-10">
                {sortParameters.map((sortParameter, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 text-gray-700 hover:bg-gray-00"
                  >
                    <h1 className="text-md py-1">{sortParameter.name}</h1>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="content">
          <div className="mt-0">
            <h2 className="text-xl mb-2 ml-1">Filters</h2>
          </div>
          <div className="flex items-centre">
            <div className="filters mr-10 mt-4">
              {filterNames.map((filterName, index) => (
                <Dropdown key={index} filterName={filterName} />
              ))}
            </div>
            <div className="books-list flex flex-wrap gap-3">
              {Books.map((book, index) => (
                <div className="p-4 pb-5 w-64 mb-5">
                  {/* Book Image */}
                  <div className="mb-4">
                    <img
                      src={book.imageURL}
                      alt={book.bookName}
                      className="w-fit"
                    />
                  </div>

                  {/* Book Name */}
                  <h1 className="font-mont text-md text-center m-0">
                    {book.bookName.length > maxLength
                      ? `${book.bookName.substring(0, maxLength)}...`
                      : book.bookName}
                  </h1>

                  {/* Book Author */}
                  <p className=" text-gray-500 text-sm text-center m-0">
                    {book.author}
                  </p>

                  {/* Book Price */}
                  <div className="flex items-center mb-4 justify-center mt-2 font-mont">
                    <h2 className="text-lg font-normal mr-2">₹{book.price}</h2>
                    <h3 className="text-sm line-through text-gray-400 mr-2">
                      ₹{book.originalPrice}
                    </h3>
                    <p className="text-sm text-green-600">({book.discount}%)</p>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-center gap-6">
                    <div className="border border-black px-4 py-1 rounded-md hover:bg-black hover:text-white">
                      <button>Add to Bag</button>
                    </div>
                    <div className="hover:text-black">
                      <CiHeart className="w-6 h-8" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CategorySearch;

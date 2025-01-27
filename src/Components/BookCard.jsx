import React from "react";
import { FaHeart } from "react-icons/fa";

const BookCard = ({ book }) => {
  return (
    <div>
      <div className="flex flex-col items-center w flex-shrink-0 mr-5">
        <div className="border-4 border-white p-4 rounded-lg shadow-md">
          <img
            src={book.imageURL}
            alt={`Book cover of ${book.bookName}`}
            className="w-48 h-72 object-cover mb-4"
          />
        </div>
        <h3 className="text-center text-lg font-semibold">{book.title}</h3>
        <p className="text-center text-purple-600">{book.author}</p>
        <p className="text-center">
          <span className="text-lg font-semibold">{book.price}</span>
          <span className="line-through text-gray-500 ml-2">
            {book.originalPrice}
          </span>
          <span className="text-green-600 ml-2">({book.discount})</span>
        </p>
        <div className="flex items-center mt-2">
          <button className="px-4 py-2 border border-gray-400 rounded hover:bg-slate-500 hover:text-black">
            ADD TO BAG
          </button>
          <button className="text-2xl text-gray-500 hover:text-red-500 ml-2">
            <i className="far fa-heart">
              <FaHeart />
            </i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

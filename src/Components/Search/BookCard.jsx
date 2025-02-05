import React from "react";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";

const BookCard = ({ book }) => {
  return (
    <div className="p-4 pb-5 w-48 mb-5 border border-gray-300 rounded-md">
      <div className="mb-4">
        <img
          src={book.image.split(" ")[0]}
          alt={book.title}
          className="w-fit"
        />
      </div>
      <Link to={`/book-details/${book.id}`}>
        <h1 className="font-mont text-sm text-center m-0">
          {book.title.length > 20
            ? `${book.title.substring(0, 20)}...`
            : book.title}
        </h1>
      </Link>
      <p className="text-gray-500 text-xs text-center m-0">
        {book.author.firstName} {book.author.lastName}
      </p>
      <div className="flex items-center mb-4 justify-center mt-2 font-mont">
        <h2 className="text-md font-normal mr-2">
          ₹{book.price - (book.discount / 100) * book.price}
        </h2>
        <p className="text-xs text-gray-400 font-normal mt-[1px] mr-1 line-through">
          ₹{book.price}
        </p>
        <p className="text-xs mt-[1px] text-green-600">
          ({book.discount}% OFF)
        </p>
      </div>
      <div className="flex items-center justify-center gap-6">
        <div className="border border-black px-2 py-0.5 rounded-md hover:bg-black hover:text-white">
          <button className="text-sm">Add to Bag</button>
        </div>
        <div className="hover:text-black">
          <CiHeart className="w-6 h-8" />
        </div>
      </div>
    </div>
  );
};

export default BookCard;

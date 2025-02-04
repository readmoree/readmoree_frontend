import React from "react";
import PincodeChecker from "./PincodeChecker";

const BookDetails = ({ book }) => {
  return (
    <div className="w-full md:w-1/2 flex flex-col">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p className="text-gray-500 mb-4">
        By {book.author.firstName} {book.author.lastName}
      </p>
      <p className="text-sm text-gray-600">
        Release date: <span className="font-semibold">30 April 2022</span>
      </p>
      <div className="my-4">
        <span className="text-2xl font-bold text-green-600">
          ₹{(book.price - (book.discount / 100) * book.price).toFixed(2)}
        </span>
        <span className="line-through text-gray-400 ml-2">₹{book.price}</span>
        <span className="text-green-600 ml-2">({book.discount}% OFF)</span>
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <label htmlFor="quantity" className="font-medium text-gray-600">
          Quantity:
        </label>
        <select
          id="quantity"
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div className="flex gap-4">
        <button className="bg-purple-600 text-white py-2 px-6 rounded hover:bg-purple-700">
          Add to Bag
        </button>
        <button className="bg-gray-100 text-gray-700 py-2 px-6 rounded hover:bg-gray-200">
          Buy It Now
        </button>
      </div>
      <PincodeChecker />
    </div>
  );
};

export default BookDetails;

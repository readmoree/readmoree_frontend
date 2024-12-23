import React, { useState } from "react";
import Navbar from "./Navbar";
import ImageCarousel from "./ImageCarousel";
const ProductDes = () => {
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");

  return (
    <>
      <Navbar />
      <div className="flex">
        <ImageCarousel />
        <div className="max-w-lg mx-auto p-6">
          {/* Book Title */}
          <h1 className="text-2xl font-semibold mb-2">
            Revenge of the Tipping Point
          </h1>

          {/* Author Name */}
          <p className="text-purple-600 mb-4">Malcolm Gladwell</p>

          {/* Release Date */}
          <p className="text-gray-500 mb-2">Release date: 1 October 2024</p>

          {/* Price Section */}
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-3xl font-bold text-black">₹679</h2>
            <h3 className="text-gray-400 line-through text-lg">₹799</h3>
            <p className="text-green-600 text-lg font-medium">(15% OFF)</p>
          </div>
          <p className="text-gray-500 text-sm mb-4">(Inclusive of all taxes)</p>

          {/* Quantity Selector */}
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-600 mb-1">
              Quantity
            </label>
            <select
              id="quantity"
              className="border border-gray-300 rounded px-4 py-2 w-20"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mb-6">
            <button className="border border-black rounded px-6 py-2 font-semibold hover:bg-black hover:text-white">
              ADD TO BAG
            </button>
            <button className="bg-purple-300 text-black rounded px-6 py-2 font-semibold hover:bg-purple-400">
              BUY IT NOW
            </button>
            <button className="text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21l-1.45-1.05a9 9 0 112.9 0L12 21z"
                />
              </svg>
            </button>
          </div>

          {/* Delivery Pincode */}
          <div>
            <label htmlFor="pincode" className="block text-gray-600 mb-1">
              Enter Your Delivery Pincode
            </label>
            <div className="flex items-center gap-2">
              <input
                id="pincode"
                type="text"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none"
              />
              <button className="bg-black text-white rounded px-4 py-2 font-semibold hover:bg-gray-800">
                CHECK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDes;

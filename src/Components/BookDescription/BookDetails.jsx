import React, { useState } from "react";
import PincodeChecker from "./PincodeChecker";
import axios from "axios";
import { toast } from "react-toastify";

const BookDetails = ({ book }) => {
  const [quantity, setQuantity] = useState("1"); // Initialize state

  const handleChange = (event) => {
    setQuantity(event.target.value); // Update state on change
  };
  const addToBag = async (bookId) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.warning("Please Login");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_CART_SERVICE_URL}/cart/${bookId}/${quantity}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        toast.success("Book Added to Cart!");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const addToWishlist = async (bookId) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.warning("Please Login");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_CART_SERVICE_URL}/wishlist/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.error);
      if (response.status == 200) {
        toast.success("Book Added to Wishlist!");
      }
    } catch (error) {
      toast.warning("Book Already in Wishlist");
    }
  };
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
        <span className="text-2xl font-bold ">
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
          value={quantity} // Bind state to select element
          onChange={handleChange} // Handle change event
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div className="flex gap-4">
        <button
          className="bg-lilac_dark text-white py-2 px-6 rounded-lg hover:bg-purple-700"
          onClick={() => {
            addToBag(book.id);
          }}
        >
          Add to Bag
        </button>
        <button
          className="bg-gray-100 border border-black py-2 px-6 rounded-lg hover:bg-gray-200"
          onClick={() => {
            addToWishlist(book.id);
          }}
        >
          Move to Wishlist
        </button>
      </div>
      <PincodeChecker />
    </div>
  );
};

export default BookDetails;

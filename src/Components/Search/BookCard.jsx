import React from "react";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import axios from "axios";
import { toast } from "react-toastify";

const BookCard = ({ book }) => {
  const addToBag = async (bookId) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.warning("Please Login");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_CART_SERVICE_URL}/cart/${bookId}/1`,
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
    <div className="p-4 w-48 mb-5 border border-gray-300 rounded-md">
      <div className="mb-4 w-full h-[250px] overflow-hidden">
        <img
          src={book.image.split(" ")[0]}
          alt={book.title}
          className="w-full h-full object-cover"
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
      <div className="flex items-center mb-4 justify-center mt-3 font-mont">
        <h2 className="text-md font-normal mr-2">
          ₹{(book.price - (book.discount / 100) * book.price).toFixed(2)}
        </h2>
        <p className="text-xs text-gray-400 font-normal mt-[1px] mr-1 line-through">
          ₹{book.price}
        </p>
        <p className="text-xs mt-[1px] text-green-600">
          ({book.discount}% OFF)
        </p>
      </div>
      <div className="flex items-center justify-center gap-6">
        <div
          className="border border-black px-2 py-0.5 rounded-md hover:bg-black hover:text-white flex items-center justify-center"
          onClick={() => addToBag(book.id)}
        >
          <button className="text-sm mb-1 pt-1">Add to Bag</button>
        </div>
        <div
          className="hover:text-black"
          onClick={() => addToWishlist(book.id)}
        >
          <CiHeart className="w-6 h-8" />
        </div>
      </div>
    </div>
  );
};

export default BookCard;

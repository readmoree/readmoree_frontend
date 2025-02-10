import React from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const handleClick = (bookId) => {
    navigate(`/book-details/${bookId}`);
  };

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
    <div className="p-3">
      <div className="p-4 pb-5 mb-5 border border-gray-300 rounded-md">
        <div className="mb-4 text-center flex items-center justify-center">
          <img
            src={
              book.image?.split(" ")[0] || // Safely access book.image
              "https://www.crossword.in/cdn/shop/files/81jKG6s76HL._SL1500_1080x@2x.jpg?v=1734676485"
            }
            alt={book.title}
            className="w-fit h-64"
          />
        </div>
        <Link to={`/book-details/${book.id}`}>
          <h1 className="font-mont text-md text-center m-0">
            {book.title.length > 20
              ? `${book.title.substring(0, 20)}...`
              : book.title}
          </h1>
        </Link>
        <p className="text-lilac_dark text-sm text-center m-0">
          {book.author.firstName} {book.author.lastName}
        </p>
        <div className="flex items-center mb-4 justify-center mt-2 font-mont">
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
          {" "}
          <div
            className="bg-black text-white border border-black px-4 py-1 rounded-md hover:bg-white hover:text-black"
            onClick={() => addToBag(book.id)}
          >
            <button className="text-sm">Add to Bag</button>{" "}
          </div>{" "}
          <div className="" onClick={() => addToWishlist(book.id)}>
            <CiHeart className="w-6 h-8 hover:text-red-500" />{" "}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default BookCard;

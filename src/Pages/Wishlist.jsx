import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react"; // Importing delete icon
import BookCard from "../Components/BookCard";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
const Wishlist = () => {
  const [wishlistBooks, setWishlistBooks] = useState([]);

  const getWishlistBooks = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.get("http://localhost:4000/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.data) setWishlistBooks(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error fetching cart books:",
        error.response?.data || error.message
      );
    }
  };

  const deleteBook = async (bookId) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("Token not found. Please log in.");
        return;
      }

      const response = await axios.delete(
        `http://localhost:4000/api/wishlist/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        handleRemove(bookId); // Remove from UI
        toast.success("Book deleted successfully");
      }
    } catch (error) {
      console.error(
        "Error deleting item:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data || error.message);
    }
  };

  const addBookToCart = async (bookId) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("Token not found. Please log in.");
        return;
      }

      const response = await axios.post(
        `http://localhost:4000/api/transfer-to-cart/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Book Added to Bag");
      }
    } catch (error) {
      console.error(
        "Error deleting item:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data || error.message);
    }
  };

  const handleRemove = (id) => {
    setWishlistBooks(wishlistBooks.filter((book) => book.id !== id));
  };

  useEffect(() => {
    getWishlistBooks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold mb-6">My Wishlist</h2>
        <div className="flex flex-wrap items-start mx-32 justify-center">
          {wishlistBooks.map((book) => (
            <div
              key={book.id}
              className="border m-4 p-6 rounded-lg text-center flex items-center flex-col"
            >
              <img
                src={
                  book.imageURL ||
                  "https://www.crossword.in/cdn/shop/files/71OUTeaNQBL._SL1500_1080x@2x.jpg?v=1724907752"
                }
                alt={book.title}
                className="h-48 w-fit mb-2"
              />
              <h3 className="text-md font-semibold">
                {" "}
                {book.title.length > 20
                  ? `${book.title.substring(0, 20)}...`
                  : book.title}
              </h3>
              <p className="text-sm text-lilac_dark">
                {book.author.firstName} {book.author.lastName}
              </p>
              <p className="text-sm mt-1">
                <span className="font-bold"> ₹ {book.price}</span> &nbsp;
                <span className="line-through text-gray-400">
                  ₹ {(book.price / (1 - book.discount / 100)).toFixed(2)}
                </span>{" "}
                &nbsp;
                <span className="text-green-600">{`(${book.discount})`}%</span>
              </p>
              <div className="flex flex-row mt-3 items-center">
                <button
                  className="border border-black text-sm px-4 py-1 mt-2 rounded-md hover:bg-black hover:text-white"
                  onClick={() => addBookToCart(book.id)}
                >
                  Add To Bag
                </button>
                <button
                  onClick={() => deleteBook(book.id)}
                  className="ml-2 mt-1 text-black hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;

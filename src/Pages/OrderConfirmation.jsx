import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  return (
    <>
      <div className="flex flex-col items-center my-20 bg-white text-center justify-center mt-40">
        <div className="bg-white p-6 rounded-lg ">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-pink-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10 text-lilac_dark"
              >
                <path
                  fillRule="evenodd"
                  d="M20.285 6.91a1 1 0 00-1.57-1.242l-8.488 9.39-4.242-4.243a1 1 0 10-1.414 1.414l5 5a1 1 0 001.487-.06l9.227-10.259z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold mt-6">Your Order is Confirmed!</h1>
          <p className=" mt-2 text-sm">
            We’ll send you a shipping confirmation email
          </p>
          <p className="text-sm">as soon as your order ships.</p>
          <div className="mt-8 bg-lilac_dark text-black px-6 py-2 rounded-lg font-medium hover:bg-lilac transition">
            <Link to={"/"}>Continue Shopping</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;

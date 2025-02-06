import React from "react";
import { ImBooks } from "react-icons/im";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
const Unauthorized = () => {
  return (
    <>
      <div className="overflow-hidden flex flex-col justify-center items-center h-screen bg-gray-100 text-center">
        <div className="text-9xl font-bold text-lilac_dark text-center">
          <ImBooks />
        </div>
        <div className="border border-black rounded lg flex items-center justify-center w-fit px-3 py-0.5 mb-2">
          <h1 className="text-md font-semibold text-black">401 Un</h1>
        </div>
        <div>
          <p className="text-3xl text-black font-extrabold my-3">
            You’re Not Allowed Here
          </p>
          <p className="text-sm mb-1">
            Sorry, you don’t have permission to access this page.
          </p>
          <p className="text-sm ">
            If you think this is a mistake, please check your login credentials
            or contact support.
          </p>
        </div>
        <div className="mt-3">
          <Link
            to="/"
            className="mt-4 inline-block px-6 py-1.5 bg-lilac_dark text-black font-bold rounded-lg hover:bg-lilac"
          >
            Return Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;

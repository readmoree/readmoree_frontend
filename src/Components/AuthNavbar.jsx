import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AuthNavbar = () => {
  return (
    <div className="font-sans">
      {/* Navigation Bar */}
      <div className="bg-lilac flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center py-2">
          <span className="ml-2 font-bold text-2xl">READMOREE</span>
        </div>
      </div>
    </div>
  );
};

export default AuthNavbar;

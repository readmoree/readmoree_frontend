import { FiSearch } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="font-sans">
      {/* Yellow Navigation Bar */}
      <div className="bg-lilac flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center py-4">
          <span className="ml-2 font-bold text-2xl">READMOREE</span>
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-md w-1/2">
          <input
            type="text"
            placeholder="Search by Title, Author, ISBN"
            className="w-full px-4 py-2 rounded-l-md focus:outline-none"
          />
          <button className="bg-black text-white px-4 py-3 rounded-r-md">
            <FiSearch />
          </button>
        </div>

        {/* Icons */}

        <div className="flex items-center gap-6  mr-10">
          <div className="text-md font-medium	">
            <button className="bg-white px-5 py-2 rounded flex items-center gap-2 hover:bg-black hover:text-white">
              {/* <IoPersonOutline /> */}
              Login
            </button>
          </div>
          <div className="relative text-2xl font-semibold">
            <HiOutlineShoppingBag />
          </div>
          <div className="relative text-xl font-normal">
            <FaRegHeart />
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="bg-white border-t border-gray-300 py-3">
        <div className="flex items-center justify-center gap-10 text-black text-sm font-semibold">
          <a href="#" className="hover:text-lilac">
            ACADEMICS
          </a>
          <a>|</a>
          <a href="#" className="hover:text-lilac">
            FICTION
          </a>
          <a>|</a>
          <a href="#" className="hover:text-lilac">
            NON FICTION
          </a>
          <a>|</a>
          <a href="#" className="hover:text-lilac">
            CHILDREN
          </a>
          <a>|</a>
          <a href="#" className="hover:text-lilac">
            YOUNG & ADULTS
          </a>
          <a>|</a>
          <a href="#" className="hover:text-lilac">
            COMICS & GRAPHICS
          </a>
          <a>|</a>
          <a href="#" className="hover:text-lilac">
            LANGUAGES
          </a>
          <a>|</a>
          <a href="#" className="text-red-500">
            OFFERS
          </a>
        </div>
      </div>
    </div>
  );
};
export default Navbar;

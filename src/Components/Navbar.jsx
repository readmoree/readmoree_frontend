import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { ImBooks } from "react-icons/im";
import Children from "./NavLinks/Children";
import ComicsGraphicNovels from "./NavLinks/ComicsGraphicNovels";
import Fiction from "./NavLinks/Fiction";
import YoungAdults from "./NavLinks/YoungAdults";
import Languages from "./NavLinks/Languages";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "ACADEMICS", component: <Fiction /> },
    { name: "FICTION", component: <Fiction /> },
    { name: "NON FICTION", component: <Fiction /> },
    { name: "CHILDREN", component: <Children /> },
    { name: "YOUNG ADULTS", component: <YoungAdults /> },
    { name: "COMICS & GRAPHICS", component: <ComicsGraphicNovels /> },
    { name: "LANGUAGES", component: <Languages /> },
    { name: "OFFERS", component: <Fiction /> },
  ];
  // Simulated authentication state (replace with real auth logic)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Store user details
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isCategoriesDivOpen, setIsCategoriesDivOpen] = useState(false);

  // Check if user is logged in (from localStorage, API, etc.)
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setUser({ name: "Vishal", email: "borsev662@gmail.com" }); // Replace with real user data
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  const handleCartClick = () => {
    if (isAuthenticated) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  const handleWishlistClick = () => {
    if (isAuthenticated) {
      navigate("/wishlist");
    } else {
      navigate("/login");
    }
  };
  const renderHoveredComponent = () => {
    switch (hoveredCategory) {
      case "ACADEMICS":
        return <Fiction />;
      case "FICTION":
        return <Fiction />;
      case "NON FICTION":
        return <Fiction />;
      case "CHILDREN":
        return <Children />;
      case "YOUNG ADULTS":
        return <YoungAdults />;
      case "COMICS & GRAPHICS":
        return <ComicsGraphicNovels />;
      case "LANGUAGES":
        return <Languages />;
      case "OFFERS":
        return <Fiction />;
    }
  };

  return (
    <div className="font-sans">
      {/* Navigation Bar */}
      <div className="bg-lilac_dark flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div
          className="flex items-center py-4 ml-2"
          onClick={() => navigate("/")}
        >
          <ImBooks className="text-black text-5xl" />
          <span className="ml-1 font-bold text-2xl">READMOREE</span>
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

        {/* Right Icons */}
        <div className="flex justify-between items-center">
          {/* Conditionally render Login or My Account */}
          {isAuthenticated ? (
            <div className="relative font-semibold bg-white rounded-md mr-3">
              <button
                className="flex items-center gap-2 px-3 py-2 rounded"
                onMouseEnter={() => setIsDropdownOpen(true)}
                // onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <IoPersonOutline className="text-2xl font-semibold" />
                <span>My Account</span>
              </button>

              {/* Profile Dropdown */}
              {isDropdownOpen && (
                <div
                  className="absolute mt-2 w-64 bg-white shadow-lg rounded-md p-4"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  {/* User Name */}
                  <div className="flex items-center gap-3 border-b pb-3">
                    <div className="bg-gray-200 rounded-full p-2">
                      <IoPersonOutline className="text-3xl" />
                    </div>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  {/* Profile Links */}
                  <div className="mt-3 space-y-2">
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                      onClick={() => navigate("/profile")}
                    >
                      View Profile
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                      onClick={() => navigate("/orders")}
                    >
                      My Orders
                    </button>

                    {/* Account Details */}
                    <div className="border-t pt-3 text-gray-600">
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                        onClick={() => navigate("/reviews")}
                      >
                        My Reviews
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                        onClick={() => navigate("/addresses")}
                      >
                        Saved Addresses
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                        onClick={() => navigate("/reading-profile")}
                      >
                        Reading Profile
                      </button>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button
                    className="block w-full text-left px-4 py-2 mt-3 text-red-500 hover:bg-gray-100 rounded"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="bg-black text-white px-5 py-2 mr-3 rounded-md flex items-center gap-2 hover:bg-black hover:text-white"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
          {/* <a className="text-gray-500">|</a> */}

          {/* Shopping Bag Icon */}
          <div
            className="relative border border-black rounded-md"
            onClick={handleWishlistClick}
          >
            <button className="flex items-center gap-2 px-3 py-2 rounded">
              <FaRegHeart className="text-xl" />
              <span className="font-semibold">Bookshelf</span>
            </button>
          </div>
          {/* <a className="text-gray-500">|</a> */}
          {/* Heart Icon */}
          <div
            className="relative font-semibold border border-black rounded-md ml-3 "
            onClick={handleCartClick}
          >
            <button className="flex items-center gap-2 px-3 py-2 rounded">
              <HiOutlineShoppingBag className="text-2xl font-semibold" />
              <span>Cart</span>
            </button>
          </div>
        </div>
      </div>

      <div className="text-sm font-semibold py-3 mt-1 flex flex-row items-center justify-center gap-16 w-full">
        {/* Navigation Links */}

        {categories.map((item, index) => (
          <div key={index} onMouseEnter={() => setHoveredCategory(item.name)}>
            <span
              className="hover:text-lilac_dark cursor-pointer"
              onClick={() => {
                setHoveredCategory(null);
                navigate(
                  `/search/${item.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`
                );
              }}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
      <hr />

      {/* component of categories*/}
      <div className="flex items-center justify-center">
        <div
          className="absolute top-40 bg-white shadow-lg border border-black z-50"
          onMouseLeave={() => setHoveredCategory(null)}
        >
          {renderHoveredComponent()}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

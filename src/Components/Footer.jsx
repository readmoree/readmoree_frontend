import React from "react";
import {
  RiTwitterXFill,
  RiInstagramLine,
  RiFacebookFill,
  RiMailFill,
  RiMailLine,
} from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="w-full bg-white mx-4 px-4">
      {/* Newsletter Section */}
      <div className="w-full px-0 py-8 border-b ">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">
              Stay In The Know
            </h2>
            <p className="text-gray-600">
              Subscribe to our newsletter and stay updated on latest offers,
              discounts and events near you.
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <input
              type="email"
              placeholder="Email Id"
              className="w-full md:w-80 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">Follow us</span>
            <a href="#" className="text-pink-500 hover:text-pink-600">
              <RiInstagramLine size={24} />
            </a>
            <a href="#" className="text-black hover:text-gray-700">
              <RiTwitterXFill size={24} />
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-700">
              <RiFacebookFill size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full px-0 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold">READ MORE</span>
            </div>
            <p className="text-gray-600 mb-4">
              Crossword Bookstores draws book lovers of all ages into a
              community where they can discover great books, engage with
              booklovers and meet their favourite literary personalities.
            </p>
            <div className="space-y-2">
              <a
                href="mailto:readmoree@gmail.com"
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                {/* <Mail className="mr-2" size={18} /> */}
                <RiMailLine className="mr-2" size={18} />
                readmoree@gmail.com
              </a>
              <p className="flex items-center text-gray-600">
                {/* <Phone className="mr-2" size={18} /> */}
                +917666045526
              </p>
            </div>
          </div>

          {/* Category Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Category</h3>
            <ul className="space-y-2">
              {[
                "New & Noteworthy",
                "Top 50",
                "Crossword Recommends",
                "Books",
                "Kids Books",
                "Toys & Games",
                "Stationery & Gifts",
                "Crossword Gift Card",
                "The Write Place",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              {[
                "Secure Shopping",
                "Privacy Policy",
                "Terms of Use",
                "Shipping Policy",
                "Returns Policy",
                "Payment Option",
                "Crossword Gift Card T&C",
                "Crossword Events",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              {["About us", "Store Locator", "Kids Club", "Blogs"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-gray-800">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-2">
              {["Careers", "Become a Franchisee", "Contact Us"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-purple-200 py-4">
        <div className="w-full px-0">
          <p className="text-center text-gray-600">
            © 2024 ReadMore Bookstores Pvt. Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

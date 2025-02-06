import React from "react";
import {
  RiTwitterXFill,
  RiInstagramLine,
  RiFacebookFill,
  RiMailFill,
  RiMailLine,
} from "react-icons/ri";
import { ImBooks } from "react-icons/im";

const Footer = () => {
  return (
    <>
      <hr />
      <footer className="w-full bg-white mx-4 px-14">
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
              <div className="bg-lilac_dark text-black border  px-4 py-2 rounded-md hover:bg-lilac hover:text-black">
                <button className="text-sm font-semibold">Subscribe</button>{" "}
              </div>
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
        <hr />
        {/* Main Footer Content */}
        <div className="w-full px-0 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {/* Logo and Description */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <ImBooks className="text-black text-5xl" />
                <span className="text-2xl font-bold">READMOREE</span>
              </div>
              <p className="text-gray-600 mb-4 max-w-[300px] leading-relaxed">
                ReadMoree Bookstores welcomes book lovers to explore a vibrant
                community, discover great books, and meet their favorite
                authors.
              </p>
              <div className="space-y-2">
                <a
                  href="mailto:readmoree@gmail.com"
                  className="flex items-center text-gray-600 hover:text-gray-800"
                >
                  <RiMailLine className="mr-2" size={18} />
                  readmoree@gmail.com
                </a>
                <p className="flex items-center text-gray-600">+917666045526</p>
              </div>
            </div>

            {/* Category, Useful Links, About Us, Get In Touch - Moved Closer & Right */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-1 lg:col-span-3">
              <div>
                <h3 className="text-lg font-semibold mb-4">Explore</h3>
                <ul className="space-y-2">
                  {[
                    "Academics",
                    "Fiction",
                    "Non fiction",
                    "Children",
                    "Young Adults",
                    "Comic Graphics",
                    "Languages",
                  ].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-600 hover:text-gray-800">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
                <ul className="space-y-2">
                  {[
                    "Privacy Policy",
                    "Terms of Use",
                    "Shipping Policy",
                    "Returns & Refunds",
                    "Payment Option",
                    "Readmoree Gift Card T&C",
                  ].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-600 hover:text-gray-800">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">About Us</h3>
                <ul className="space-y-2">
                  {["About us", "Store Locator", "Blogs"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-600 hover:text-gray-800">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
                <ul className="space-y-2">
                  {["Become a Franchisee", "Contact Us"].map((item) => (
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
        </div>
      </footer>
      <hr />
      {/* Copyright */}
      <div className="py-10 flex items-center px-12">
        <div className="container mx-auto px-4">
          <p className=" text-gray-600 font-bold">
            © {new Date().getFullYear()} ReadMore Bookstores Pvt. Ltd. All
            Rights Reserved.
          </p>
        </div>
        <div>
          <img src="https://cdn.shopify.com/s/files/1/0648/3066/9017/files/Footer_image.jpg?v=1735813292"></img>
        </div>
      </div>
    </>
  );
};

export default Footer;

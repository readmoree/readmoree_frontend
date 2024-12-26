import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReviewComponent from "../Components/Review";

// Custom Previous Button
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 rounded-full"
    style={{ zIndex: 10 }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-gray-800"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>
);

// Custom Next Button
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 rounded-full"
    style={{ zIndex: 10 }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-gray-800"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
);

const BookComponent = () => {
  const [activeTab, setActiveTab] = useState("description"); // State for active tab

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const tabStyle = {
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.5s ease, visibility 0s 0.5s", // Delay visibility change
  };

  const activeTabStyle = {
    opacity: 1,
    visibility: "visible",
    transition: "opacity 0.5s ease, visibility 0s 0s", // No delay for visibility change
  };

  return (
    <>
      <div className="max-w-6xl my-10 mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Carousel */}
          <div className="w-full md:w-1/2 relative">
            <Slider {...settings}>
              <img
                src="https://www.crossword.in/cdn/shop/products/71sru2dKW4L_460x@2x.jpg?v=1685185758"
                alt="Book Cover 1"
                className="rounded-lg object-contain h-96 w-full"
              />
              <img
                src="https://www.crossword.in/cdn/shop/products/51TinqWWxpL_460x@2x.jpg?v=1685185758"
                alt="Book Cover 2"
                className="rounded-lg object-contain h-96 w-full"
              />
            </Slider>
          </div>

          {/* Book Details */}
          <div className="w-full md:w-1/2 flex flex-col">
            <h1 className="text-2xl font-bold">How To Kill Your Family</h1>
            <p className="text-gray-500 mb-4">By Bella Mackie</p>
            <p className="text-sm text-gray-600">
              Release date: <span className="font-semibold">30 April 2022</span>
            </p>
            <div className="my-4">
              <span className="text-2xl font-bold text-green-600">₹679</span>
              <span className="line-through text-gray-400 ml-2">₹799</span>
              <span className="text-green-600 ml-2">(15% OFF)</span>
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <label htmlFor="quantity" className="font-medium text-gray-600">
                Quantity:
              </label>
              <select
                id="quantity"
                className="border border-gray-300 rounded px-2 py-1"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="flex gap-4">
              <button className="bg-purple-600 text-white py-2 px-6 rounded hover:bg-purple-700">
                Add to Bag
              </button>
              <button className="bg-gray-100 text-gray-700 py-2 px-6 rounded hover:bg-gray-200">
                Buy It Now
              </button>
            </div>
            <div className="mt-6">
              <label
                htmlFor="pincode"
                className="block font-medium text-gray-600 mb-2"
              >
                Enter Your Delivery Pincode
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  id="pincode"
                  placeholder="Enter Pincode"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                />
                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Check
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Tabs Section */}
        <div className="mt-8">
          <div className="flex border-b">
            <button
              className={`py-2 ${
                activeTab === "description"
                  ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("description")}
            >
              Product Description
            </button>
            <button
              className={`py-2 mx-6 ${
                activeTab === "author"
                  ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("author")}
            >
              About Author
            </button>
          </div>

          {/* Tab Content with Inline Fade Animation */}
          <div
            style={activeTab === "description" ? activeTabStyle : tabStyle}
            className="mt-4"
          >
            {activeTab === "description" && (
              <div>
                <h2 className="text-xl font-bold mb-4">Product Description</h2>
                <p className="text-gray-700">
                  THE #1 SUNDAY TIMES BESTSELLER 'I loved this book' RICHARD
                  OSMAN 'An antiheroine able to best villainous male
                  protagonists such as Patrick Bateman any day' OBSERVER
                  'Chilling, but also laugh-out-loud funny. Another corker'
                  SUNDAY TELEGRAPH
                </p>
              </div>
            )}
          </div>
          <div
            style={activeTab === "author" ? activeTabStyle : tabStyle}
            className="mt-4"
          >
            {activeTab === "author" && (
              <div>
                <h2 className="text-xl font-bold mb-4">About Author</h2>
                <p className="text-gray-700">
                  Héctor García and Francesc Miralles are the coauthors of
                  Ikigai: The Japanese Secret to a Long and Happy Life, an
                  international bestseller published in more than forty
                  languages. Héctor is a citizen of Japan, where he has lived
                  for over a decade, and is the author of A Geek in Japan, a #1
                  bestseller in Japan. Francesc is the author of a number of
                  bestselling self-help and inspirational books and of the novel
                  Love in Lowercase, which has been translated into twenty
                  languages.
                </p>
              </div>
            )}
          </div>
        </div>
        <br /> <br />
        <hr />
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Product Details</h2>
          <table className="w-4/5 text-sm text-gray-700 text-left ml-0">
            <tbody>
              <tr className="odd:bg-gray-50 border-b">
                <td className="py-2 font-medium text-gray-600">Publisher</td>
                <td className="py-2">Bella Mackie</td>
              </tr>
              <tr className="odd:bg-gray-50 border-b">
                <td className="w-1/3 py-2 font-medium text-gray-600">ISBN</td>
                <td className="py-2">97800083659430</td>
              </tr>
              <tr className="odd:bg-gray-50 border-b">
                <td className="py-2 font-medium text-gray-600">SKU</td>
                <td className="py-2">BK0475781</td>
              </tr>
              <tr className="odd:bg-gray-50 border-b">
                <td className="w-1/3 py-2 font-medium text-gray-600">EAN</td>
                <td className="py-2">97800083659430</td>
              </tr>
              <tr className="odd:bg-gray-50 border-b">
                <td className="py-2 font-medium text-gray-600">Language</td>
                <td className="py-2">English</td>
              </tr>
              <tr className="odd:bg-gray-50 border-b">
                <td className="py-2 font-medium text-gray-600">Binding</td>
                <td className="py-2">Paperback</td>
              </tr>
              <tr className="odd:bg-gray-50">
                <td className="py-2 font-medium text-gray-600">Pages</td>
                <td className="py-2">368 Pages</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <br />
        <hr />
        <ReviewComponent />
      </div>
    </>
  );
};

export default BookComponent;

// import React, { useState, useEffect } from "react";

// const BookComponent = () => {
//   // State to manage the active image and animation
//   const [activeImage, setActiveImage] = useState(0);
//   const [fade, setFade] = useState(false);

//   // Image data
//   const images = [
//     "https://www.crossword.in/cdn/shop/files/71cCWEA7hjL_900x@2x.jpg?v=1683175049",
//     "https://www.crossword.in/cdn/shop/products/getimage_32208b63-e9d4-439d-8e41-49c888d103b7_1512x@2x.jpg?v=1678516135",
//     "https://www.crossword.in/cdn/shop/products/getimage_32208b63-e9d4-439d-8e41-49c888d103b7_1512x@2x.jpg?v=1678516135",
//   ];

//   // Automatically change the image every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       handleNextImage();
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [activeImage]);

//   // Handle image change with animation
//   const handleNextImage = () => {
//     setFade(true); // Trigger fade-out
//     setTimeout(() => {
//       setActiveImage((prev) => (prev + 1) % images.length);
//       setFade(false); // Trigger fade-in
//     }, 300); // Duration of fade-out before switching image
//   };

//   const handleThumbnailClick = (index) => {
//     setFade(true); // Trigger fade-out
//     setTimeout(() => {
//       setActiveImage(index);
//       setFade(false); // Trigger fade-in
//     }, 300);
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Thumbnails on the left */}
//         <div
//           className="flex flex-row md:flex-col items-center md:items-start space-x-4 md:space-x-0 md:space-y-4"
//           style={{ height: "24rem" }} // Match main image height
//         >
//           {images.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt={`Thumbnail ${index + 1}`}
//               className={`h-1/3 w-20 rounded-lg cursor-pointer object-contain border-2 ${
//                 activeImage === index ? "border-purple-600" : "border-gray-300"
//               }`}
//               onClick={() => handleThumbnailClick(index)}
//             />
//           ))}
//         </div>

//         {/* Main Image with Animation */}
//         <div className="w-full md:w-1/2 relative">
//           <img
//             src={images[activeImage]}
//             alt={`Main Display ${activeImage + 1}`}
//             className={`rounded-lg object-contain h-96 w-full transition-opacity duration-500 ${
//               fade ? "opacity-0" : "opacity-100"
//             }`}
//           />
//         </div>

//         {/* Book Details */}
//         <div className="w-full md:w-1/2 flex flex-col">
//           <h1 className="text-2xl font-bold">Revenge of the Tipping Point</h1>
//           <p className="text-gray-500 mb-4">By Malcolm Gladwell</p>
//           <p className="text-sm text-gray-600">
//             Release date: <span className="font-semibold">1 October 2024</span>
//           </p>
//           <div className="my-4">
//             <span className="text-2xl font-bold text-green-600">₹679</span>
//             <span className="line-through text-gray-400 ml-2">₹799</span>
//             <span className="text-green-600 ml-2">(15% OFF)</span>
//           </div>
//           <div className="flex items-center space-x-4 mb-4">
//             <label htmlFor="quantity" className="font-medium text-gray-600">
//               Quantity:
//             </label>
//             <select
//               id="quantity"
//               className="border border-gray-300 rounded px-2 py-1"
//             >
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//             </select>
//           </div>
//           <div className="flex gap-4">
//             <button className="bg-purple-600 text-white py-2 px-6 rounded hover:bg-purple-700">
//               Add to Bag
//             </button>
//             <button className="bg-gray-100 text-gray-700 py-2 px-6 rounded hover:bg-gray-200">
//               Buy It Now
//             </button>
//           </div>
//           <div className="mt-6">
//             <label
//               htmlFor="pincode"
//               className="block font-medium text-gray-600 mb-2"
//             >
//               Enter Your Delivery Pincode
//             </label>
//             <div className="flex items-center space-x-4">
//               <input
//                 type="text"
//                 id="pincode"
//                 placeholder="Enter Pincode"
//                 className="border border-gray-300 rounded px-4 py-2 w-full"
//               />
//               <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
//                 Check
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <br />
//       <hr />
//     </div>
//   );
// };

// export default BookComponent;

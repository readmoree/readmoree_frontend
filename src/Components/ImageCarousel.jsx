import React, { useState } from "react";

const ImageCarousel = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    "https://www.crossword.in/cdn/shop/files/81SYRLxHbtL._SL1500_ecea9005-2ded-4365-a4d7-bb31b100ab09_1080x@2x.jpg?v=1730962547",
    "https://www.crossword.in/cdn/shop/files/81SYRLxHbtL._SL1500_ecea9005-2ded-4365-a4d7-bb31b100ab09_1080x@2x.jpg?v=1730962547",
    "https://www.crossword.in/cdn/shop/files/81SYRLxHbtL._SL1500_ecea9005-2ded-4365-a4d7-bb31b100ab09_1080x@2x.jpg?v=1730962547",
    "https://www.crossword.in/cdn/shop/files/81SYRLxHbtL._SL1500_ecea9005-2ded-4365-a4d7-bb31b100ab09_1080x@2x.jpg?v=1730962547",
  ];

  const handlePrev = () => {
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        className="text-2xl text-gray-500 hover:text-black"
      >
        &lt;
      </button>

      {/* Main Image */}
      <div className="flex flex-col items-center">
        <img
          src={images[selectedImage]}
          alt="Book Cover"
          className="w-96 h-auto rounded-md shadow-md"
        />

        {/* Thumbnail List */}
        <div className="flex flex-col items-center mt-4 space-y-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setSelectedImage(index)}
              className={`w-20 h-auto rounded-md border-2 cursor-pointer ${
                selectedImage === index
                  ? "border-purple-500"
                  : "border-transparent"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="text-2xl text-gray-500 hover:text-black"
      >
        &gt;
      </button>
    </div>
  );
};

export default ImageCarousel;

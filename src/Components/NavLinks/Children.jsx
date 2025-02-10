import React from "react";
import { Link } from "react-router-dom";

const bookImages = [
  "https://s3-ap-south-1.amazonaws.com/bookscape-s3-bucket/13584AEA4DFiction1.png",
  "https://s3-ap-south-1.amazonaws.com/bookscape-s3-bucket/478492BDD6Fiction2.png",
];

const Children = () => {
  return (
    <div className="flex flex-row justify-between px-10 py-8 shadow-sm gap-60">
      {/* Categories (First 3 columns) */}
      <div className="flex flex-row gap-8">
        <div className="flex flex-col gap-1">
          <Link
            to="/search/children/early-learning"
            className="text-md font-semibold text-black hover:text-gray-600"
          >
            Early Learning
          </Link>
          <Link
            to="/search/children/early-learning/alphabet"
            className="text-sm text-black hover:text-gray-600"
          >
            Alphabet
          </Link>
          <Link
            to="/search/children/early-learning/body"
            className="text-sm text-black hover:text-gray-600"
          >
            Body
          </Link>
          <Link
            to="/search/children/early-learning/colours"
            className="text-sm text-black hover:text-gray-600"
          >
            Colours
          </Link>
          <Link
            to="/search/children/early-learning/numbers-counting"
            className="text-sm text-black hover:text-gray-600"
          >
            Numbers & Counting
          </Link>
          <Link
            to="/search/children/early-learning/opposites"
            className="text-sm text-black hover:text-gray-600"
          >
            Opposites
          </Link>
          <Link
            to="/search/children/early-learning/rhymes"
            className="text-sm text-black hover:text-gray-600"
          >
            Rhymes, Verses & Wordplay
          </Link>
          <Link
            to="/search/children/early-learning/sense-sensation"
            className="text-sm text-black hover:text-gray-600"
          >
            Sense & Sensation
          </Link>
          <Link
            to="/search/children/early-learning/sizes-shapes"
            className="text-sm text-black hover:text-gray-600"
          >
            Sizes & Shapes
          </Link>
          <Link
            to="/search/children/early-learning/words"
            className="text-sm text-black hover:text-gray-600"
          >
            Words
          </Link>
          <Link
            to="/search/children/early-learning/animals-pets"
            className="text-sm text-black hover:text-gray-600"
          >
            Animals & Pets
          </Link>
          <Link
            to="/search/children/picture-books"
            className="text-md font-semibold text-black hover:text-gray-600"
          >
            Picture Books
          </Link>
          <Link
            to="/search/children/picture-books/pictures"
            className="text-sm text-black hover:text-gray-600"
          >
            Pictures
          </Link>
          <Link
            to="/search/children/picture-books/pop-up"
            className="text-sm text-black hover:text-gray-600"
          >
            Pop-up
          </Link>
          <Link
            to="/search/children/picture-books/lift-the-flap"
            className="text-sm text-black hover:text-gray-600"
          >
            Lift-the-Flap
          </Link>
        </div>
      </div>

      {/* Images (Last 2 columns) */}
      <div className="flex flex-row gap-5">
        {bookImages.map((image, index) => (
          <div key={index} className="overflow-hidden">
            <img
              src={image}
              alt={`Book ${index + 1}`}
              className="w-fit h-96 object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Children;

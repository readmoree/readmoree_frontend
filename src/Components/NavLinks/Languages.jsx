import React from "react";
import { Link } from "react-router-dom";

const bookImages = [
  "https://s3-ap-south-1.amazonaws.com/bookscape-s3-bucket/F64379ADBFHindi.png",
  "https://s3-ap-south-1.amazonaws.com/bookscape-s3-bucket/FE3615A503Tamil.png",
  "https://s3-ap-south-1.amazonaws.com/bookscape-s3-bucket/EF1CC00C61French.png",
];

const Languages = () => {
  return (
    <div className="flex flex-row justify-between px-10 py-5 shadow-sm border border-black gap-20">
      {/* Languages List */}
      <div className="flex flex-col gap-2 text-md">
        <Link to="/search/languages/hindi" className="hover:text-gray-600">
          Hindi
        </Link>
        <Link to="/search/languages/marathi" className="hover:text-gray-600">
          Marathi
        </Link>
        <Link to="/search/languages/bengali" className="hover:text-gray-600">
          Bengali
        </Link>
        <Link to="/search/languages/gujarati" className="hover:text-gray-600">
          Gujarati
        </Link>
        <Link to="/search/languages/malayalam" className="hover:text-gray-600">
          Malayalam
        </Link>
        <Link to="/search/languages/tamil" className="hover:text-gray-600">
          Tamil
        </Link>
        <Link to="/search/languages/punjabi" className="hover:text-gray-600">
          Punjabi
        </Link>
        <Link to="/search/languages/french" className="hover:text-gray-600">
          French
        </Link>
        <Link to="/search/languages/german" className="hover:text-gray-600">
          German
        </Link>
        <Link to="/search/languages/italian" className="hover:text-gray-600">
          Italian
        </Link>
        <Link to="/search/languages/spanish" className="hover:text-gray-600">
          Spanish
        </Link>
        <Link to="/search/languages/chinese" className="hover:text-gray-600">
          Chinese
        </Link>
        <Link to="/search/languages/latin" className="hover:text-gray-600">
          Latin
        </Link>
      </div>
      <div className="flex flex-col gap-2 text-md">
        <Link to="/search/languages/vietnamese" className="hover:text-gray-600">
          Vietnamese
        </Link>
        <Link to="/search/languages/portuguese" className="hover:text-gray-600">
          Portuguese
        </Link>
        <Link
          to="/search/languages/dutch-flemish"
          className="hover:text-gray-600"
        >
          Dutch/Flemish
        </Link>
      </div>

      {/* Language Images */}
      <div className="flex flex-row gap-5">
        {bookImages.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Language Book ${index + 1}`}
              className="w-fit h-96 object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Languages;

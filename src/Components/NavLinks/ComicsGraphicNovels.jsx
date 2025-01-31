import React from "react";
import { Link } from "react-router-dom";

const bookImages = [
  "https://s3-ap-south-1.amazonaws.com/bookscape-s3-bucket/3774679757comics1.png",
  "https://s3-ap-south-1.amazonaws.com/bookscape-s3-bucket/D4314FE6E8comics2.png",
  "https://s3-ap-south-1.amazonaws.com/bookscape-s3-bucket/D9051D52A1comics3.png",
];

const ComicsGraphicNovels = () => {
  return (
    <div className="flex flex-row justify-between px-10 py-5 shadow-sm border border-black gap-40">
      {/* Categories (First 3 columns) */}
      <div className="flex flex-row gap-10">
        <div className="flex flex-col gap-2">
          <Link
            to="/search/comics-graphic-novels/comics"
            className="text-md font-semibold text-black hover:text-gray-600"
          >
            Comics
          </Link>
          <Link
            to="/search/comics-graphic-novels/comics/superhero"
            className="text-sm text-black hover:text-gray-600"
          >
            Superhero Comics
          </Link>
          <Link
            to="/search/comics-graphic-novels/comics/indian-superhero"
            className="text-xs text-black hover:text-gray-600"
          >
            Indian Superhero Comics
          </Link>
          <Link
            to="/search/comics-graphic-novels/indian-comics"
            className="text-sm font-semibold text-black hover:text-gray-600"
          >
            Indian Comics
          </Link>
          <Link
            to="/search/comics-graphic-novels/indian-comics/amar-chitra-katha"
            className="text-xs text-black hover:text-gray-600"
          >
            Amar Chitra Katha
          </Link>
          <Link
            to="/search/comics-graphic-novels/indian-comics/raj-comics"
            className="text-xs text-black hover:text-gray-600"
          >
            Raj Comics
          </Link>
          <Link
            to="/search/comics-graphic-novels/indian-comics/chacha-chaudhary"
            className="text-xs text-black hover:text-gray-600"
          >
            Chacha Chaudhary
          </Link>
          <Link
            to="/search/comics-graphic-novels/other-comics"
            className="text-sm font-semibold text-black hover:text-gray-600"
          >
            Other Comics
          </Link>
          <Link
            to="/search/comics-graphic-novels/graphic-novels"
            className="text-sm font-semibold text-black hover:text-gray-600"
          >
            Graphic Novels
          </Link>
          <Link
            to="/search/comics-graphic-novels/manga"
            className="text-sm font-semibold text-black hover:text-gray-600"
          >
            Manga
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

export default ComicsGraphicNovels;

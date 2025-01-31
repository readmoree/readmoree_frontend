import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const Dropdown = ({ filterName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const genres = [
    { name: "Romance", count: 11 },
    { name: "Crime Mystery Thriller", count: 8 },
    { name: "Mythological Fiction", count: 4 },
    { name: "Quick Reads", count: 1 },
    { name: "Young Adult Gen Fiction", count: 1 },
  ];

  return (
    <div className="min-w-72 border  rounded p-4 mb-2 w">
      {/* Dropdown Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="font-semibold text-md">{filterName.name}</h2>
        <span className={`transform ${isOpen ? "rotate-180" : ""}`}>
          <MdKeyboardArrowDown />
        </span>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="mt-4">
          {genres.map((genre, index) => (
            <div
              key={index}
              className="flex items-center justify-between mb-2 text-gray-700"
            >
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2">{genre.name}</span>
              </label>
              <span className="text-sm text-gray-500">({genre.count})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

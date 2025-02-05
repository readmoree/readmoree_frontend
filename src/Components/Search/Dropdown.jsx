import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const Dropdown = ({ filterName, filterOptions, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Handle checkbox changes
  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;

    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = checked
        ? [...prevSelectedOptions, value] // Add value to selected options
        : prevSelectedOptions.filter((option) => option !== value); // Remove value from selected options

      // Call onFilterChange outside the render phase
      setTimeout(() => {
        onFilterChange(newSelectedOptions);
      }, 0);

      return newSelectedOptions;
    });
  };

  return (
    <div className="min-w-72 border rounded p-4 mb-2">
      {/* Dropdown Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="font-semibold text-md">{filterName}</h2>
        <span className={`transform ${isOpen ? "rotate-180" : ""}`}>
          <MdKeyboardArrowDown />
        </span>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="mt-4">
          {filterOptions.map((genre, index) => (
            <div
              key={index}
              className="flex items-center justify-between mb-2 text-gray-700"
            >
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  value={genre} // Use the genre name as the checkbox value
                  checked={selectedOptions.includes(genre)} // Check if the option is selected
                  onChange={handleCheckboxChange} // Handle checkbox change
                />
                <span className="ml-2">{genre}</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

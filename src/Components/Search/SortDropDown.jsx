import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const SortDropdown = ({ sortParameters, changeSortParam }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortParameter, setSortParameter] = useState("");

  const handleSortChange = (sortParamName) => {
    setSortParameter(sortParamName);
    changeSortParam(sortParamName);
    setIsOpen(false);
  };

  return (
    <div className="w-80 border border-gray-300 rounded px-5 py-3 mb-1 relative">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="font-semibold text-md">
          Sort By : {sortParameter || "Relevance"}
        </h2>
        <span className={`transform ${isOpen ? "rotate-180" : ""}`}>
          <MdKeyboardArrowDown />
        </span>
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-300 rounded shadow-md z-10">
          {sortParameters.map((sortParam, index) => (
            <div
              key={index}
              onClick={() => handleSortChange(sortParam.name)}
              className="hover:bg-lilac flex items-center justify-between p-2 text-gray-700 hover:bg-gray-00"
            >
              <h1 className="text-md py-1">{sortParam.name}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;

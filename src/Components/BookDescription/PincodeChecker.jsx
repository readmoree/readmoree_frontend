import React from "react";

const PincodeChecker = () => {
  return (
    <div className="mt-6">
      <label htmlFor="pincode" className="block font-medium text-gray-600 mb-2">
        Enter Your Delivery Pincode
      </label>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          id="pincode"
          placeholder="Enter Pincode"
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
        <button className="bg-lilac_dark text-white py-2 px-4 rounded hover:bg-blue-700">
          Check
        </button>
      </div>
    </div>
  );
};

export default PincodeChecker;

import React from "react";

const SideCard = () => {
  return (
    <>
      <div className="bg-lilac_dark rounded-lg p-8 flex flex-col justify-between w-96">
        <div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Book of the Month
          </h2>
          <p className="text-2xl text-white">NOVEMBER 2024</p>
        </div>
        <button className="bg-white text-gray-800 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors w-fit">
          SHOP NOW
        </button>
      </div>
    </>
  );
};

export default SideCard;

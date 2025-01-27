import React from "react";

const Heading = ({ text }) => {
  return (
    <>
      <div className="flex justify-center items-center mt-7">
        <div className="bg-lilac text-white text-md font-semibold py-2 px-8 rounded-lg h-10">
          {text}
        </div>
      </div>
    </>
  );
};

export default Heading;

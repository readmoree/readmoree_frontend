import React from "react";
import authors from "../DataUtils/authors";
import AuthorCard from "./AuthorCard";

const AuthorSlider = () => {
  return (
    <>
      <div className="mt-16 flex justify-center items-center  bg-white relative">
        <div className="flex flex-wrap justify-center gap-4 transition-transform duration-500 ease-in-out">
          {authors.map((author, index) => (
            <AuthorCard key={index} author={author} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AuthorSlider;

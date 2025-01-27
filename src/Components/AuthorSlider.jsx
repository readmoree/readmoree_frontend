import React from "react";
import authors from "../DataUtils/authors";
import AuthorCard from "./AuthorCard";

const AuthorSlider = () => {
  const visibleAuthors = authors
    .slice(0, 7)
    .concat(authors.slice(0, Math.max(0, 7 - authors.length)));

  return (
    <>
      <div className="mt-10 flex justify-center items-center  bg-white relative">
        <div className="flex flex-wrap justify-center gap-4 transition-transform duration-500 ease-in-out">
          {visibleAuthors.map((author, index) => (
            <AuthorCard key={index} author={author} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AuthorSlider;

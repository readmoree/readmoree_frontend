import React from "react";
import authors from "../DataUtils/authors";

const AuthorCard = ({ author }) => {
  author = authors[0];
  return (
    <>
      <div className="flex flex-col items-center mx-2">
        <img
          src={author.imgSrc}
          alt={author.alt}
          className="w-40 h-40 rounded-full object-cover"
        />
        <p className="mt-2 text-lg font-semibold text-center">{author.name}</p>
      </div>
    </>
  );
};

export default AuthorCard;

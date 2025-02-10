import React from "react";
import authors from "../DataUtils/authors";

const AuthorCard = ({ author }) => {
  return (
    <div className="flex flex-col items-center mx-2">
      <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
        <img
          src={author.imgSrc}
          alt={author.alt}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="mt-2 text-lg font-semibold text-center">{author.name}</p>
    </div>
  );
};

export default AuthorCard;

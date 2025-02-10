import React from "react";
import BookCard from "./BookCard";
import ReactPaginate from "react-paginate";
import SortDropdown from "./SortDropDown";

const SearchContent = ({ currentBooks, handlePageClick, pageCount }) => {
  return (
    <>
      <div className="flex flex-col min-w-96">
        <div>
          {/* <div className="flex justify-between items-center mb-3 p-4"></div> */}

          <div className="books-list flex flex-wrap gap-3 items-center justify-start">
            {currentBooks.map((book, index) => (
              <BookCard key={index} book={book} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchContent;

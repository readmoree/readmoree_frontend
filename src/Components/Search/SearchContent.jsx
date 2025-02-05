import React from "react";
import BookCard from "./BookCard";
import ReactPaginate from "react-paginate";
import SortDropdown from "./SortDropDown";

const SearchContent = ({
  label,
  sortParameters,
  changeSortParam,
  currentBooks,
  handlePageClick,
  pageCount,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-3 p-4">
        <div className="heading text-center text-2xl">
          <h1>
            {label
              .replace(/-/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </h1>
        </div>
        <div className="sortDropdown flex justify-end">
          <SortDropdown
            sortParameters={sortParameters}
            changeSortParam={changeSortParam}
          />
        </div>
      </div>

      <div className="books-list flex flex-wrap gap-3 items-center justify-center">
        {currentBooks.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>

      <div className="flex justify-center w-full mt-4">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next »"
          previousLabel="« Prev"
          onPageChange={handlePageClick}
          pageCount={pageCount}
          containerClassName="flex space-x-2 p-2 rounded-lg bg-white"
          pageClassName="px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-200"
          activeClassName="bg-indigo-500 text-white"
          previousClassName="px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-200"
          nextClassName="px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-200"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default SearchContent;

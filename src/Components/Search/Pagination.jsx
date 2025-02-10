import ReactPaginate from "react-paginate";
const Pagination = ({ handlePageClick, pageCount }) => {
  return (
    <div className="flex justify-center w-full mt-2 mb-10 ml-36">
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
  );
};
export default Pagination;

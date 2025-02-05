import { CiHeart } from "react-icons/ci";
import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Dropdown from "../Components/Dropdown";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { getBookByCat } from "../services/book";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const CategorySearch = () => {
  const booksPerPage = 5; // Number of books per page

  const sortParameters = [
    { name: "Price: Low To High" },
    { name: "Price: High To Low" },
    { name: "Newest To Oldest" },
    { name: "Oldest To Newest" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const { label, category, subcategory } = useParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortParameter, setSortParameter] = useState("");

  const [filters, setFilters] = useState({
    authors: [],
    publishers: [],
    languages: [],
  });
  const [selectedFilters, setSelectedFilters] = useState({
    authors: [],
    publishers: [],
    languages: [],
    priceRange: [],
    discountRange: "",
  });

  const [currentPage, setCurrentPage] = useState(0); // Current page for pagination

  // Fetch data function
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};

      if (label)
        params.label = label
          .trim()
          .replace(/-/g, " ")
          .replace(/&/g, "")
          .toUpperCase();
      if (category) params.category = category.trim().replace(/\s+/g, "-");
      if (subcategory)
        params.subcategory = subcategory.trim().replace(/\s+/g, "-");

      const response = await getBookByCat(params);
      setData(response.books);
      setFilteredData(response.books);
      setFilters({
        authors: response.authors,
        publishers: response.publishers,
        languages: response.languages.map((lang) =>
          lang.replace(lang.slice(1), lang.slice(1).toLowerCase())
        ),
      });
    } catch (err) {
      setError("Failed to fetch data.");
      console.error("Error fetching data:", err);
    }
    setLoading(false);
  };

  const changeSortParam = (sortParamName) => {
    setSortParameter(sortParamName);
    setIsOpen(false);
    const temp = [...filteredData];

    if (sortParamName === sortParameters[0].name)
      temp.sort((a, b) => a.price - b.price);
    else if (sortParamName === sortParameters[1].name)
      temp.sort((a, b) => b.price - a.price);
    else if (sortParamName === sortParameters[2].name)
      temp.sort(
        (a, b) => new Date(b.publicationDate) - new Date(a.publicationDate)
      );
    else if (sortParamName === sortParameters[3].name)
      temp.sort(
        (a, b) => new Date(a.publicationDate) - new Date(b.publicationDate)
      );
    else temp.sort((a, b) => a.id - b.id);

    setFilteredData(temp);
    setCurrentPage(0); // Reset to first page after sorting
  };

  const handleFilterChange = (filterName, selectedOptions) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: selectedOptions,
    }));
  };

  const handleSliderChange = (type, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      authors: [],
      publishers: [],
      languages: [],
      priceRange: [],
      discountRange: [],
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let newData = [...data];

    if (selectedFilters.authors.length > 0) {
      newData = newData.filter((book) =>
        selectedFilters.authors.includes(
          `${book.author.firstName} ${book.author.lastName}`
        )
      );
    }

    if (selectedFilters.publishers.length > 0) {
      newData = newData.filter((book) =>
        selectedFilters.publishers.includes(book.publisher.name)
      );
    }

    if (selectedFilters.languages.length > 0) {
      newData = newData.filter((book) =>
        selectedFilters.languages.includes(
          book.language.replace(
            book.language.slice(1),
            book.language.slice(1).toLowerCase()
          )
        )
      );
    }

    if (selectedFilters.priceRange.length > 0) {
      newData = newData.filter(
        (book) =>
          book.price - (book.discount / 100) * book.price <=
          selectedFilters.priceRange[0]
      );
    }

    if (selectedFilters.discountRange.length > 0) {
      newData = newData.filter(
        (book) => book.discount >= selectedFilters.discountRange[0]
      );
    }

    setFilteredData(newData);
  }, [selectedFilters]);

  // Pagination Logic
  const offset = currentPage * booksPerPage;
  const currentBooks = filteredData.slice(offset, offset + booksPerPage);
  const pageCount = Math.ceil(filteredData.length / booksPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  console.log(filteredData);

  return (
    <>
      <Navbar />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && data.length > 0 ? (
        <div className="font-mont mx-20 mb-20">
          <div className="content mt-10">
            <div className="flex items-centre">
              <div className="flex gap-5 flex-col">
                <div className="mt-5 flex justify-between items-center">
                  <h2 className="text-xl mb-2 ml-1">Filters</h2>
                  <div className="pr-10">
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-500 hover:text-blue-700 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
                <div className="filters mr-10 mt-4">
                  <Dropdown
                    filterName="Authors"
                    filterOptions={filters.authors}
                    onFilterChange={(selectedAuthors) =>
                      handleFilterChange("authors", selectedAuthors)
                    }
                  />
                  <Dropdown
                    filterName="Publishers"
                    filterOptions={filters.publishers}
                    onFilterChange={(selectedPublishers) =>
                      handleFilterChange("publishers", selectedPublishers)
                    }
                  />
                  <Dropdown
                    filterName="Languages"
                    filterOptions={filters.languages}
                    onFilterChange={(selectedLanguages) =>
                      handleFilterChange("languages", selectedLanguages)
                    }
                  />
                  <div className="min-w-72 border rounded p-4 mb-2 w">
                    <h3 className="font-semibold text-md mb-2">Price Range</h3>
                    <Slider
                      range
                      step={100}
                      min={0}
                      max={2000}
                      defaultValue={2000}
                      onChange={(value) =>
                        handleSliderChange("priceRange", value)
                      }
                      trackStyle={{ backgroundColor: "#4C51BF", height: 5 }}
                      handleStyle={{
                        borderColor: "#4C51BF",
                        backgroundColor: "#4C51BF",
                        height: 20,
                        width: 20,
                      }}
                    />
                    <div className="flex justify-between text-sm mt-2">
                      <span>₹{selectedFilters.priceRange[0]}</span>
                      <span>₹{selectedFilters.priceRange[1]}</span>
                    </div>
                  </div>
                  <div className="min-w-72 border rounded p-4 mb-2 w">
                    <h3 className="font-semibold text-md mb-2">Discount</h3>
                    <Slider
                      range
                      step={5}
                      min={0}
                      max={100}
                      defaultValue={0}
                      onChange={(value) =>
                        handleSliderChange("discountRange", value)
                      }
                      trackStyle={{ backgroundColor: "#4C51BF", height: 5 }}
                      handleStyle={{
                        borderColor: "#4C51BF",
                        backgroundColor: "#4C51BF",
                        height: 20,
                        width: 20,
                      }}
                    />
                    <div className="flex justify-between text-sm mt-2">
                      <span>{selectedFilters.discountRange[0]}%</span>
                      <span>{selectedFilters.discountRange[1]}%</span>
                    </div>
                  </div>
                </div>
              </div>

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
                    <div className="w-80 border border-gray-300 rounded px-5 py-3 mb-1 relative">
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <h2 className="font-semibold text-md">
                          Sort By : {sortParameter || "Relevance"}
                        </h2>
                        <span
                          className={`transform ${isOpen ? "rotate-180" : ""}`}
                        >
                          <MdKeyboardArrowDown />
                        </span>
                      </div>

                      {isOpen && (
                        <div className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-300 rounded shadow-md z-10">
                          {sortParameters.map((sortParam, index) => (
                            <div
                              key={index}
                              onClick={() => changeSortParam(sortParam.name)}
                              className="hover:bg-lilac flex items-center justify-between p-2 text-gray-700 hover:bg-gray-00"
                            >
                              <h1 className="text-md py-1">{sortParam.name}</h1>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="books-list flex flex-wrap gap-3 items-center justify-center">
                  {currentBooks.map((book, index) => (
                    <div
                      key={index}
                      className="p-4 pb-5 w-48 mb-5 border border-gray-300 rounded-md"
                    >
                      <div className="mb-4">
                        <img
                          src={book.image.split(" ")[0]}
                          alt={book.title}
                          className="w-fit"
                        />
                      </div>
                      <Link to={`/book-details/${book.id}`}>
                        <h1 className="font-mont text-sm text-center m-0">
                          {book.title.length > 20
                            ? `${book.title.substring(0, 20)}...`
                            : book.title}
                        </h1>
                      </Link>
                      <p className="text-gray-500 text-xs text-center m-0">
                        {book.author.firstName} {book.author.lastName}
                      </p>
                      <div className="flex items-center mb-4 justify-center mt-2 font-mont">
                        <h2 className="text-md font-normal mr-2">
                          ₹{book.price - (book.discount / 100) * book.price}
                        </h2>
                        <p className="text-xs text-gray-400 font-normal mt-[1px] mr-1 line-through">
                          ₹{book.price}
                        </p>
                        <p className="text-xs mt-[1px] text-green-600">
                          ({book.discount}% OFF)
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-6">
                        {" "}
                        <div className="border border-black px-2 py-0.5 rounded-md hover:bg-black hover:text-white">
                          <button className="text-sm">Add to Bag</button>{" "}
                        </div>{" "}
                        <div className="hover:text-black">
                          <CiHeart className="w-6 h-8" />{" "}
                        </div>{" "}
                      </div>
                    </div>
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
            </div>
          </div>
        </div>
      ) : (
        !loading && <p>No results found.</p>
      )}

      <Footer />
    </>
  );
};

export default CategorySearch;

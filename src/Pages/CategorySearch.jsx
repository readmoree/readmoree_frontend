import { CiHeart } from "react-icons/ci";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Dropdown from "../Components/Dropdown";
import response from "../DataUtils/books";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const uniqArrayVal = (arr) => {
  const set = new Set();
  arr.forEach((item) => {
    if (item) {
      set.add(item);
    }
  });

  return Array.from(set);
};

const CategorySearch = () => {
  const sortParameters = [
    { name: "Price: Low To High" },
    { name: "Price: High To Low" },
    { name: "Newest To Oldest" },
    { name: "Oldest To Newest" },
  ];
  const prices = ["200-500", "500-1000", "over 1000"];
  const discounts = ["10% to 25%", "25% to 35%", "35% to 50%"];

  const [isOpen, setIsOpen] = useState(false);

  const { label, category, subcategory } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sortParameter, setSortParameter] = useState("");

  const [filters, setFilters] = useState({
    authors: [],
    publishers: [],
    languages: [],
  });

  // Function to fetch data
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // const params = {};

      // // Replace hyphens (`-`) with spaces (" ")
      // if (label)
      //   params.label = label.trim().replace(/-/g, " ").replace(/&/g, "");
      // if (category) params.category = category.trim().replace(/-/g, " ");
      // if (subcategory)
      //   params.subcategory = subcategory.trim().replace(/-/g, " ");

      // // Manually construct the query string
      // const queryString = Object.keys(params)
      //   .map((key) => `${key}=${params[key]}`)
      //   .join("&");

      // // Debugging: view query string
      // console.log("Query String:", queryString);

      // // Make the request with the manually constructed query string
      // const response = await axios.get(
      //   `http://localhost:8080/book/filter?${queryString}`
      // );

      // console.log(response.data);
      setData(response.data);
      setFilters({
        authors: uniqArrayVal(
          response.data.map((book) => {
            return `${book.author.firstName} ${book.author.lastName}`;
          })
        ),
        publishers: uniqArrayVal(
          response.data.map((book) => book.publisher.name)
        ),
        languages: uniqArrayVal(
          response.data.map((book) => {
            return book.language.replace(
              book.language.slice(1),
              book.language.slice(1).toLowerCase()
            );
          })
        ),
      });
      // console.log(filters.authors);
    } catch (err) {
      setError("Failed to fetch data.");
      console.error("Error fetching data:", err);
    }
    setLoading(false);
  };

  const changeSortParam = (sortParamName) => {
    setSortParameter(sortParamName);
    setIsOpen(false);
    const temp = [...data];
    if (sortParamName === sortParameters[0].name) {
      //sort according to price low to high
      temp.sort((a, b) => a.price - b.price);
    } else if (sortParamName === sortParameters[1].name) {
      //sort according to price high to low
      temp.sort((a, b) => b.price - a.price);
    } else if (sortParamName === sortParameters[2].name) {
      //sort according to publication newest to oldest
      temp.sort(
        (a, b) => new Date(b.publicationDate) - new Date(a.publicationDate)
      );
    } else if (sortParamName === sortParameters[3].name) {
      //sort according to publication oldest to newest
      temp.sort(
        (a, b) => new Date(a.publicationDate) - new Date(b.publicationDate)
      );
    } else {
      temp.sort((a, b) => a.id - b.id);
    }
    setData(temp);
  };

  // Fetch data when URL parameters change
  useEffect(() => {
    fetchData();
  }, [label, category, subcategory]);

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);

  const maxLength = 20;
  return (
    <>
      <Navbar />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && Object.keys(data).length > 0 ? (
        <div className="font-mont mx-20 mb-20">
          <div className="content mt-10">
            <div className="flex items-centre">
              <div className="flex gap-5 flex-col">
                <div className="mt-5">
                  <h2 className="text-xl mb-2 ml-1">Filters</h2>
                </div>
                <div className="filters mr-10 mt-4">
                  <Dropdown
                    filterName="Authors"
                    filterOptions={filters.authors}
                  />
                  <Dropdown
                    filterName="Publishers"
                    filterOptions={filters.publishers}
                  />
                  <Dropdown
                    filterName="Languages"
                    filterOptions={filters.languages}
                  />
                  <Dropdown filterName="Price Range" filterOptions={prices} />
                  <Dropdown
                    filterName="Discount Range"
                    filterOptions={discounts}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3 p-4">
                  <div className="heading text-center text-2xl">
                    <h1>
                      {label
                        .split("-") // Split string by hyphen
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        ) // Capitalize first letter of each word
                        .join(" ")}{" "}
                      {/* Join words with spaces */}
                    </h1>
                  </div>
                  <div className="sortDropdown flex justify-end">
                    <div className="w-80 border border-gray-300 rounded px-5 py-3 mb-1 relative">
                      {/* Dropdown Header */}
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

                      {/* Dropdown Options */}
                      {isOpen && (
                        <div className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-300 rounded shadow-md z-10 ">
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
                  {data.map((book, index) => (
                    <div className="p-4 pb-5 w-48 mb-5 w border border-gray-300 rounded-md">
                      {/* Book Image */}
                      <div className="mb-4">
                        <img
                          src={book.imgUrl}
                          alt={book.title}
                          className="w-fit"
                        />
                      </div>

                      {/* Book Name */}
                      <h1 className="font-mont text-sm text-center m-0">
                        {book.title.length > maxLength
                          ? `${book.title.substring(0, maxLength)}...`
                          : book.title}
                      </h1>

                      {/* Book Author */}
                      <p className=" text-gray-500 text-xs text-center m-0">
                        {book.author.firstName} {book.author.lastName}
                      </p>

                      {/* Book Price */}
                      <div className="flex items-center mb-4 justify-center mt-2 font-mont">
                        <h2 className="text-md font-normal mr-2">
                          {book.price}
                        </h2>

                        {/* Display original price */}
                        <h3 className="text-xs line-through text-gray-400 mr-2">
                          {typeof book.discount === "number" &&
                          !isNaN(book.discount)
                            ? (book.price / (1 - book.discount / 100)).toFixed(
                                2
                              )
                            : "N/A"}
                        </h3>

                        <p className="text-xs text-green-600">
                          ({book.discount}%)
                        </p>
                      </div>

                      {/* Buttons */}
                      <div className="flex items-center justify-center gap-6">
                        <div className="border border-black px-2 py-0.5 rounded-md hover:bg-black hover:text-white">
                          <button className="text-sm">Add to Bag</button>
                        </div>
                        <div className="hover:text-black">
                          <CiHeart className="w-6 h-8" />
                        </div>
                      </div>
                    </div>
                  ))}
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

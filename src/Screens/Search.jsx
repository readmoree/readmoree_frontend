import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useSearchParams } from "react-router-dom";
import { searchBook } from "../services/book";
import "rc-slider/assets/index.css";
import Filters from "../Components/Search/Filters";
import SearchContent from "../Components/Search/SearchContent";
// import HeaderSection from "../Components/Search/HeaderSection";
import Pagination from "../Components/Search/Pagination";
import HeaderSectionSearch from "../Components/HeaderSectionSearch";

const Search = () => {
  const booksPerPage = 20; // Number of books per page

  const sortParameters = [
    { name: "Price: Low To High" },
    { name: "Price: High To Low" },
    { name: "Newest To Oldest" },
    { name: "Oldest To Newest" },
  ];

  const [params] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
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
  const fetchData = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await searchBook(query);
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
    const query = params.get("query") || "";
    fetchData(query);
  }, [params]);

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

      <HeaderSectionSearch
        label={`Search results for ${params.get("query") || ""}`}
        sortParameters={sortParameters}
        changeSortParam={changeSortParam}
      />

      {!loading && !error && data.length > 0 ? (
        <div className="font-mont mx-20 mb-20">
          <div className="content mt-10">
            <div className="flex items-centre">
              <Filters
                filters={filters}
                selectedFilters={selectedFilters}
                handleFilterChange={handleFilterChange}
                handleSliderChange={handleSliderChange}
                clearFilters={clearFilters}
              />

              <SearchContent
                currentBooks={currentBooks}
                handlePageClick={handlePageClick}
                pageCount={pageCount}
              />
            </div>
          </div>
        </div>
      ) : (
        !loading && <p>No results found.</p>
      )}
      <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
      <Footer />
    </>
  );
};

export default Search;

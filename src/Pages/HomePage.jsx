import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import MainSlider from "../Components/MainSlider";
import BooksSlider from "../Components/BooksSlider";
import AuthorSlider from "../Components/AuthorSlider";
import Heading from "../Components/Heading";
import SideCard from "../Components/SideCard";
import Banner from "../Components/Banner";
import Footer from "../Components/Footer";
import FeaturedBooksSlider from "../Components/FeaturedBooksSlider";
import bookData from "../DataUtils/books";
import BookOfTheMonthSlider from "../Components/BookOfTheMonthSlider";
import LoadingPage from "./LoadingPage";
import axios from "axios";
import { toast } from "react-toastify";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllBooks = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BOOK_SERVICE_URL}/book/public/all`
      );
      console.log(response.data);
      setBooks(response.data);
    } catch (error) {
      console.log(error);
      console.error("Error in getting books:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  // const books = bookData.data;
  // console.log("books", books);
  useEffect(() => {
    getAllBooks();
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="overflow-x-hidden">
      <Navbar />
      <MainSlider />

      {/* Featured Books Section */}
      <div className="mx-10 mt-24">
        <Heading text="FEATURED BOOKS" />
        <FeaturedBooksSlider featuredBooks={books} />
      </div>
      <div className="mx-10 mt-5">
        <Heading text="NEW RELEASES" />
        <FeaturedBooksSlider featuredBooks={[...books].reverse()} />
      </div>

      <Banner />
      {/* Side Card & Book of the Month */}
      <div className="flex flex-row mx-40 ml-48 justify-center mt-20">
        {/* Sidebar (Book of the Month Banner) */}
        <div className="w-96 p-3 flex my-6 mb-9">
          <SideCard className="" />
        </div>

        {/* Book of the Month Slider */}
        <div className="w-4/5 md:w-3/4 flex min-h-[256px] p-6">
          <BookOfTheMonthSlider
            featuredBooks={[...books]
              .sort(() => 0.5 - Math.random())
              .slice(0, 10)}
            className="w-full min-h-[256px]"
          />
        </div>
      </div>
      {/* Featured Authors Section */}
      <div className="mx-10 mt-20 mb-24">
        <Heading text="FEATURED AUTHORS" />
        <AuthorSlider className="mt-8" />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;

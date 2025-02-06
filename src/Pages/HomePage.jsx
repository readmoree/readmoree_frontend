import React from "react";
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

const HomePage = () => {
  const books = bookData.data;
  console.log("books", books);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <MainSlider />

      {/* Featured Books Section */}
      <div className="mx-10 mt-5">
        <Heading text="FEATURED BOOKS" />
        <FeaturedBooksSlider />
      </div>
      <div className="mx-10 mt-5">
        <Heading text="FEATURED BOOKS" />
        <FeaturedBooksSlider />
      </div>

      {/* Featured Authors Section */}
      <div className="mx-10 mt-5">
        <Heading text="FEATURED AUTHORS" />
        <AuthorSlider />
      </div>

      {/* Side Card & Book of the Month */}
      <div className="flex flex-row mx-40 ml-48 justify-center mt-20">
        {/* Sidebar (Book of the Month Banner) */}
        <div className="w-96 p-3 flex my-6 mb-9">
          <SideCard className="" />
        </div>

        {/* Book of the Month Slider */}
        <div className="w-4/5 md:w-3/4 flex min-h-[256px] p-6">
          <BookOfTheMonthSlider className="w-full min-h-[256px]" />
        </div>
      </div>
      <div className="mx-10 mt-5">
        <Heading text="FEATURED BOOKS" />
        <FeaturedBooksSlider />
      </div>
      <Banner />
      <Footer />
    </div>
  );
};

export default HomePage;

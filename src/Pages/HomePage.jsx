import React from "react";
import Navbar from "../Components/Navbar";
import MainSlider from "../Components/MainSlider";
import BooksSlider from "../Components/BooksSlider";
import AuthorSlider from "../Components/AuthorSlider";
import Heading from "../Components/Heading";
import SideCard from "../Components/SideCard";
import BookCard from "../Components/BookCard";
import books from "../DataUtils/books";
import Banner from "../Components/Banner";
import Footer from "../Components/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <MainSlider />
      <Heading text="NEW RELEASES" />
      <BooksSlider />
      <Heading text="FEATURED AUTHORS" />
      <AuthorSlider />
      <div className="flex flex-col md:flex-row justify-evenly py-5 w-full gap-2 mt-10 md:mt-10">
        <div className="flex">
          <SideCard />
        </div>
        <div className="flex aspect-auto gap-6">
          <BookCard book={books[0]} />
          <BookCard book={books[1]} />
          <BookCard book={books[2]} />
        </div>
      </div>
      <Banner />
      <Footer />
    </>
  );
};

export default HomePage;

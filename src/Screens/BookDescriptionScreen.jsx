import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReviewComponent from "../Components/BookDescription/Review";
import Navbar from "../Components/Navbar";
import DetailsTable from "../Components/BookDescription/DetailsTable";
import Tabs from "../Components/BookDescription/BookAuthorTabs";
import ImageCarousel from "../Components/BookDescription/ImageCarousel";
import BookDetails from "../Components/BookDescription/BookDetails";
import { getBookById } from "../services/book";
import { loadUserData } from "../services/user";
import { useParams } from "react-router-dom";

const BookDescriptionScreen = () => {
  const [book, setBook] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookData = await getBookById(id);
        setBook(bookData);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const data = await loadUserData();
        setCurrentUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBook();
    if (typeof sessionStorage["token"] !== "undefined") fetchCurrentUser();
  }, []);

  return (
    <>
      <Navbar />
      {book === null && (
        <div className="flex justify-center items-center h-screen">
          <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
        </div>
      )}
      {book !== null && (
        <div className="max-w-6xl my-10 mx-auto p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Carousel */}
            <ImageCarousel book={book} />

            {/* Book Details */}
            <BookDetails book={book} />
          </div>
          {/* Tabs Section */}
          <Tabs book={book} />
          <br /> <br />
          <hr />
          <DetailsTable book={book} />
          <br />
          <br />
          <hr />
          <ReviewComponent currentUser={currentUser} id={id} />
        </div>
      )}
    </>
  );
};

export default BookDescriptionScreen;

import React, { useEffect, useState } from "react";
import { FaStar, FaTrash } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { motion } from "framer-motion";
import { deleteReview, getReviews } from "../../services/user";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const MyReviews = () => {
  const [activeReview, setActiveReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  const toggleReview = (id) => {
    setActiveReview(activeReview === id ? null : id);
  };

  const handleDelete = async (bookId, reviewId) => {
    if (loading) {
      toast.warning("Please wait a moment before trying to delete again");
      return;
    }

    setLoading(true);
    try {
      await deleteReview(bookId, reviewId);
      setReviews(reviews.filter((review) => review.id !== reviewId));
      toast.success("Review deleted successfully!");
    } catch (error) {
      toast.error("Something went wrong! Please try again");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getReviews();
        setReviews(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 md:p-8 rounded-md">
      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>
      {reviews.length === 0 && (
        <h2 className="text-md italic font-normal mb-6">
          Start sharing your thoughts on books you've read and help others
          discover great reads.
        </h2>
      )}
      {reviews.length > 0 &&
        reviews.map((review) => (
          <div
            key={review.id}
            className="border rounded-md p-6 bg-white mb-4 pr-8"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <img
                  src={review.image.split(" ")[0]}
                  alt="Book Cover"
                  className="w-16 h-24 object-cover rounded-md"
                />
                <div>
                  <Link to={`/book-details/${review.bookid}`}>
                    <h3 className="font-semibold text-lg">
                      {review.bookTitle}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600">{review.authorName}</p>
                  <p className="text-sm text-gray-500">
                    Submitted on {formatDate(review.createdOn)}
                  </p>
                  <div className="flex mt-2 text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>

              <button
                className="text-lilac hover:text-red-600"
                onClick={() => handleDelete(review.bookid, review.id)}
              >
                <FaTrash />
              </button>
            </div>

            <div className="mt-4">
              <button
                onClick={() => toggleReview(review.id)}
                className="w-full flex justify-between items-center text-sm font-semibold text-gray-700"
              >
                <span>View review</span>
                <MdKeyboardArrowDown
                  className={`text-lg transition-transform ${
                    activeReview === review.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Animated Review Comment */}
              {activeReview === review.id && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="mt-2 p-3 border border-lilac rounded-md bg-gray-50 text-gray-700"
                >
                  {review.comment}
                </motion.div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default MyReviews;

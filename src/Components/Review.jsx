import React, { useState } from "react";
import { FaStar, FaPen } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReviewComponent = () => {
  const [reviews, setReviews] = useState([
    {
      name: "John Doe",
      rating: 4,
      comment: "Great book! I couldn't put it down.",
    },
    {
      name: "Jane Smith",
      rating: 5,
      comment: "An amazing read. Highly recommend it!",
    },
  ]);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.comment && newReview.rating > 0) {
      setReviews([...reviews, newReview]);
      setNewReview({ name: "", rating: 0, comment: "" });
      setIsModalOpen(false); // Close modal after submitting review
    }
  };

  return (
    <>
      <div className="mt-8">
        {/* Reviews Section */}
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        <div className="mb-6">
          {reviews.length === 0 ? (
            <p className="text-gray-500">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            reviews.map((review, index) => (
              <div key={index} className="mb-4 border-b pb-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{review.name}</span>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < review.rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </div>
            ))
          )}
        </div>

        {/* Button to Open Review Modal */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
        >
          Add Your Review
        </button>

        {/* Modal for Review Form */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
            onClick={() => setIsModalOpen(false)} // Close modal when clicking outside
          >
            <div
              className="bg-white p-6 rounded-lg w-96 relative"
              onClick={(e) => e.stopPropagation()} // Prevent click from closing modal inside
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 text-gray-600"
              >
                X
              </button>

              <h3 className="text-xl font-bold mb-4">Add Your Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label
                    className="block font-medium text-gray-600 py-1"
                    htmlFor="name"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={newReview.name}
                    onChange={(e) =>
                      setNewReview({ ...newReview, name: e.target.value })
                    }
                    className="border border-gray-300 rounded px-2 py-2 w-full"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label
                    className="block font-medium text-gray-600 py-1"
                    htmlFor="rating"
                  >
                    Rating
                  </label>
                  <select
                    id="rating"
                    value={newReview.rating}
                    onChange={(e) =>
                      setNewReview({
                        ...newReview,
                        rating: parseInt(e.target.value),
                      })
                    }
                    className="border border-gray-300 rounded px-2 py-2 w-full"
                  >
                    <option value="0">Select a rating</option>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating} Star{rating > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    className="block font-medium text-gray-600 py-1"
                    htmlFor="comment"
                  >
                    Your Review
                  </label>
                  <textarea
                    id="comment"
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    className="border border-gray-300 rounded px-2 py-2 w-full"
                    rows="4"
                    placeholder="Write your review here"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewComponent;

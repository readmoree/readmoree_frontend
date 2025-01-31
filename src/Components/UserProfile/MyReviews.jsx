import React, { useState } from "react";
import { FaStar, FaTrash } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const MyReviews = () => {
  const [activeReview, setActiveReview] = useState(null); // Track which review is toggled

  const reviews = [
    {
      id: 1,
      title: "Just One Heart",
      author: "Jonathan Fisher",
      date: "24/12/2024",
      rating: 5,
      reviewText: "qwertyjk",
      imageUrl:
        "https://d34a0mln2492j4.cloudfront.net/unsigned/resize:fit:317:447:0/gravity:sm/plain/https%3A%2F%2Fimage-hub.reproindialtd.com%2F9780670099825.jpg",
    },
    {
      id: 2,
      title: "Build an Epic Career",
      author: "John Doe",
      date: "20/12/2024",
      rating: 4,
      reviewText: "Amazing book on career guidance!",
      imageUrl:
        "https://d34a0mln2492j4.cloudfront.net/unsigned/resize:fit:317:447:0/gravity:sm/plain/https%3A%2F%2Fimage-hub.reproindialtd.com%2F9780670099825.jpg",
    },
  ];

  const toggleReview = (id) => {
    setActiveReview(activeReview === id ? null : id); // Toggle specific review
  };

  return (
    <div className="p-6 md:p-8 bg-gray-50 rounded-md max-w-5xl">
      {/* Header Section */}
      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>

      {/* Map Review Cards */}
      {reviews.map((review) => (
        <div
          key={review.id}
          className="border rounded-md p-6 bg-white mb-4 pr-8"
        >
          <div className="flex justify-between items-start">
            {/* Book Image and Details */}
            <div className="flex gap-4">
              <img
                src={review.imageUrl}
                alt="Book Cover"
                className="w-16 h-24 object-cover rounded-md"
              />
              <div>
                <h3 className="font-semibold text-lg">{review.title}</h3>
                <p className="text-sm text-gray-600">{review.author}</p>
                <p className="text-sm text-gray-500">
                  Review submitted {review.date}
                </p>
                <div className="flex mt-2 text-yellow-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </div>

            {/* Delete Icon */}
            <button className="text-lilac hover:text-red-600">
              <FaTrash />
            </button>
          </div>

          {/* Toggle Review */}
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
            {activeReview === review.id && (
              <div className="mt-2 p-3 border border-lilac rounded-md bg-gray-50 text-gray-700">
                {review.reviewText}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyReviews;

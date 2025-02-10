import React, { useEffect, useState } from "react";
import { FaStar, FaPen } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import { addReview, getReviewsByBook } from "../../services/book";
import { getUsersByIds } from "../../services/user";

const ReviewComponent = ({ currentUser, id }) => {
  const [reviews, setReviews] = useState([]);
  const [usersWhoReviewed, setUsersWhoReviewed] = useState({}); // Changed to object for easy access

  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async (ids) => {
    if (!ids) return; // Prevent empty request
    try {
      const usersData = await getUsersByIds(ids);

      // Transform usersData into an object (only storing firstName and lastName)
      const usersObject = usersData.reduce((acc, user) => {
        acc[user.customerId] = {
          firstName: user.firstName,
          lastName: user.lastName,
        };
        return acc;
      }, {});

      setUsersWhoReviewed((prev) => ({
        ...prev,
        ...usersObject, // Merge with existing data
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const reviewsData = await getReviewsByBook(id);
      if (reviewsData.length === 0) return;

      setReviews(reviewsData);

      const ids = [...new Set(reviewsData.map((review) => review.customerId))]; // Remove duplicates
      if (ids.length > 0) {
        fetchUsers(ids);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Log the usersWhoReviewed state after it changes
  useEffect(() => {
    console.log("Updated usersWhoReviewed:", usersWhoReviewed);
  }, [usersWhoReviewed]); // This will log whenever usersWhoReviewed changes

  useEffect(() => {
    fetchReviews();
  }, []); // Run fetchReviews on initial mount

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (newReview.comment && newReview.rating > 0) {
      const response = await addReview(id, newReview);
      if (response.status === 201) {
        const review = response.data.review;
        console.log(review);
        setReviews((prev) => [
          ...prev,
          { ...review, customerId: currentUser.customerId },
        ]);

        // Ensure user's name is immediately added to usersWhoReviewed
        setUsersWhoReviewed((prev) => ({
          ...prev,
          [currentUser.customerId]: {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
          },
        }));

        setNewReview({ rating: 0, comment: "" });
        setIsModalOpen(false);
        toast.success("Review posted successfully!");
      } else {
        toast.error("Something went horribly wrong! Please try again");
      }
    } else {
      toast.error("Review cannot be empty or rating should be above 0");
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
                  <span className="font-semibold">
                    {usersWhoReviewed[review.customerId]
                      ? `${usersWhoReviewed[review.customerId].firstName} ${
                          usersWhoReviewed[review.customerId].lastName
                        }`
                      : "Unknown User"}
                  </span>
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
                <p className="text-gray-600 text-sm">
                  {new Date(review.createdOn)
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, "-")}
                </p>
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </div>
            ))
          )}
        </div>

        {/* Button to Open Review Modal */}
        {(typeof sessionStorage["token"] !== "undefined" ||
          sessionStorage["token"] != null) && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-lilac_dark text-white py-2 px-6 rounded hover:bg-lilac_dark"
          >
            Add Your Review
          </button>
        )}

        {/* Modal for Review Form */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
            onClick={() => setIsModalOpen(false)} // Close modal when clicking outside
          >
            <div
              className="bg-white rounded-lg w-96 relative p-10"
              onClick={(e) => e.stopPropagation()} // Prevent click from closing modal inside
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-gray-600"
              >
                X
              </button>

              <h3 className="text-xl font-bold mb-4">Add Your Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
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
                  onClick={handleReviewSubmit}
                  type="submit"
                  className="bg-lilac_dark text-white py-2 px-6 rounded hover:bg-lilac_dark"
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

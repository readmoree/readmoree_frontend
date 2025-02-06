import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const updateBook = async (bookId, formData) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BOOK_SERVICE_URL}/book/admin/update/${bookId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.token}`,
        },
      }
    );
    return response.status;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const UpdateBookModal = ({ book, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: book.title,
    price: book.price,
    discount: book.discount || 0,
    totalAvailableCount: book.totalAvailableCount,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const statusCode = await updateBook(book.id, formData);
    if (statusCode === 200) {
      console.log("updated");
    } else {
      console.log("failed to update");
    }

    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white py-8 px-10 rounded-lg w-1/3">
        <h2 className="text-2xl font-bold mb-6">Update Book Details</h2>
        <form onSubmit={handleSubmit} className="space-y-3 ">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-lilac_dark rounded-md"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-lilac_dark rounded-md"
              required
            />
          </div>

          {/* Discount */}
          <div>
            <label className="block text-gray-700 border-lilac_dark font-bold mb-1">
              Discount (%)
            </label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className="w-full p-2 border border-lilac_dark rounded-md"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-gray-700 border-lilac_dark font-bold mb-1">
              Stock{" "}
            </label>
            <input
              type="number"
              name="stock"
              value={formData.totalAvailableCount}
              onChange={handleChange}
              className="w-full p-2 mb-4 border border-lilac_dark rounded-md"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex w-full mt-10 gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-lilac_dark text-white rounded-lg w-1/2"
              onClick={handleSubmit}
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-black text-white rounded-lg w-1/2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBookModal;

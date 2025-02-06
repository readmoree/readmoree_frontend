import React, { useState } from "react";

const UpdateBookModal = ({ book, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: book.title,
    price: book.price,
    discount: book.discount || 0,
    stock: book.totalAvailableCount,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
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
              value={formData.stock}
              onChange={handleChange}
              className="w-full p-2 border border-lilac_dark rounded-md"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex w-full mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-lilac_dark text-white rounded-lg w-1/2"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg w-1/2"
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

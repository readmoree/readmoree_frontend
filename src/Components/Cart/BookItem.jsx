import { useState } from "react";
import { Trash2, Heart } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const BookItem = ({
  details,
  quantity,
  onDelete,
  onMoveToWishlist,
  updateBookQuantity,
}) => {
  const [selectedQty, setSelectedQty] = useState(quantity);
  const originalPrice = details.price / (1 - details.discount / 100);
  const totalPrice = (selectedQty * details.price).toFixed(2); // Ensuring two decimal places

  const handleDelete = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("Token not found. Please log in.");
        return;
      }

      const response = await axios.delete(
        `${process.env_REACT_APP_CART_SERVICE_API}/cart/${details.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        onDelete(details.id); // Remove from UI
        toast.success("Book Deleted!");
      }
    } catch (error) {
      console.error(
        "Error deleting item:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data || error.message);
    }
  };

  const moveBookToWishlist = async () => {
    try {
      console.log("move to wishlist method");

      const token = sessionStorage.getItem("token");
      console.log("token" + token);
      if (!token) {
        console.error("Token not found. Please log in.");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_CART_SERVICE}/transfer-to-wishlist/${details.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      if (response.status === 200) {
        onMoveToWishlist(details.id); // Remove from UI
        toast.success("Book Moved to WishList");
      }
      if (response.status === 404) {
        toast.error(response.data.error.message);
      }
    } catch (error) {
      console.error(
        "Error in Moving Book to Wishlist : ",
        error.response?.data || error.message
      );
      console.log("error occurred");
      toast.warning("Book Already in Wishlist");
    }
  };

  const updateQuantity = async (newQty) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("Token not found. Please log in.");
        return;
      }

      const response = await axios.put(
        `${process.env.REACT_APP_CART_SERVICE}/cart/${details.id}`,
        { quantity: newQty },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSelectedQty(newQty);
        updateBookQuantity(details.id, newQty);
        window.location.reload();
      }
    } catch (error) {
      console.error(
        "Error updating quantity:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <div className="flex items-center justify-between border p-4 px-6 rounded-lg shadow-sm">
      <div className="flex items-center">
        <img
          src="https://www.crossword.in/cdn/shop/files/71OUTeaNQBL._SL1500_1080x@2x.jpg?v=1724907752"
          alt={details.title}
          className="w-20 h-28 object-cover rounded-md"
        />
        <div className="ml-4">
          <h3 className="font-semibold text-lg">{details.title}</h3>
          <p className="text-gray-600 mt-1">
            ₹ {details.price}{" "}
            <span className="line-through text-sm text-gray-500">
              ₹ {originalPrice.toFixed(2)}
            </span>{" "}
            <span className="text-green-600 text-sm">
              ({details.discount}%)
            </span>
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center space-x-6">
          {/* quantity counter */}
          <div className="flex items-center space-x-2">
            <button
              className="px-2 py-1 text-gray-700 border rounded"
              onClick={() => {
                if (selectedQty > 1) updateQuantity(selectedQty - 1);
              }}
            >
              -
            </button>
            <p className="font-medium">{selectedQty}</p>
            <button
              className="px-2 py-1 text-gray-700 border rounded"
              onClick={() => updateQuantity(selectedQty + 1)}
            >
              +
            </button>
          </div>

          <p className="font-medium">₹ {totalPrice}</p>

          {/* Delete Icon */}
          <button
            className="text-gray-500 hover:text-red-500"
            onClick={handleDelete}
          >
            <Trash2 size={18} />
          </button>
        </div>
        <div
          className="text-gray-500 flex flex-row items-center justify-end mt-8 gap-1"
          onClick={moveBookToWishlist}
        >
          <div className="text-gray-500 flex items-center">
            <Heart size={14} />
          </div>
          <div className="text-gray-500 flex items-center">
            <button className="text-sm">Save to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookItem;

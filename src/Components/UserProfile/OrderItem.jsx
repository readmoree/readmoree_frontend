import React, { useState } from "react";
import OrderDetails from "./OrderDetails";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const OrderItem = ({ orderItem }) => {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const statusColors = {
    DELIVERED: "bg-green-100 text-green-800",
    PENDING: "bg-yellow-100 text-yellow-800",
    DISPATCHED: "bg-blue-100 text-blue-800",
    SHIPPED: "bg-blue-100 text-blue-800",
    RETURN: "bg-red-100 text-red-100",
    CANCELLED: "bg-gray-100 text-gray-800",
  };

  const openModal = () => {
    setIsModalOpen(true); // Open modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  const handleToggleDetails = () => {
    setIsDetailsExpanded((prevState) => !prevState);
  };

  return (
    <div className="bg-white border rounded-lg p-6 mb-4">
      <div className="flex gap-6">
        {/* Left Section - Image and Status */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={orderItem.items[0].image.split(" ")[0]}
            className="w-24 h-32 object-cover"
          />
          <div className="flex flex-col items-center gap-2">
            <span
              className={`text-sm font-medium px-2 py-1 rounded-full ${
                statusColors[orderItem.status]
              }`}
            >
              {orderItem.status.replace(
                orderItem.status.slice(1),
                orderItem.status.slice(1).toLowerCase()
              )}
            </span>
          </div>
        </div>

        {/* Right Section - Order Details */}
        <div className="flex-1">
          {/* Buttons Section - Moved to the Top */}
          {/* Order Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-600 font-normal text-sm">
                Order ID:
              </span>
              <span className="text-gray-800 ml-1 text-sm">{orderItem.id}</span>
              <br />
              <span className="text-gray-600 font-normal text-sm">
                Tracking ID:
              </span>
              <span className="text-gray-800 ml-1 text-sm">
                {orderItem.trackingId || "N/A"}
              </span>
              <br />
              <span className="text-gray-600 font-normal text-sm">
                Payment ID:
              </span>
              <span className="text-gray-800 ml-1 text-sm">
                {orderItem.paymentId || "N/A"}
              </span>
              <br />
              <span className="text-gray-600 font-normal text-sm">
                Payment Method:
              </span>
              <span className="text-gray-800 ml-1 text-sm">
                {orderItem.paymentMethod}
              </span>
            </div>
            <div className="flex flex-col gap-2 justify-end mb-4 items-end">
              <button
                className="w-full max-w-[150px] text-sm text-black hover:underline px-4 py-1 border border-lilac rounded-md"
                onClick={openModal}
              >
                View Details
              </button>
              {orderItem.status !== "CANCELLED" && (
                <button className="w-full max-w-[150px] text-sm text-black hover:underline px-4 py-1 border border-lilac rounded-md">
                  Download Invoice
                </button>
              )}
              {orderItem.status === "DELIVERED" && (
                <button className="w-full max-w-[150px] text-sm text-black border rounded-md px-4 py-1 bg-lilac">
                  Return Order
                </button>
              )}
              {orderItem.status !== "DELIVERED" &&
                orderItem.status !== "CANCELLED" && (
                  <button className="w-full max-w-[150px] text-sm text-black border rounded-md px-4 py-1 bg-lilac">
                    Cancel Order
                  </button>
                )}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Ordered on: {formatDate(orderItem.orderDate)}
            </p>
            <button
              className="text-sm text-red-600 hover:underline mt-2"
              onClick={handleToggleDetails}
            >
              {isDetailsExpanded ? "Hide Order Details" : "Order Details"}
            </button>
          </div>

          {isDetailsExpanded && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <div className="flex flex-col gap-2">
                {orderItem.items.map((book, index) => (
                  <div key={index} className="flex justify-between">
                    <div className="text-sm text-gray-600">
                      <p>
                        {book.name} x({book.quantity})
                      </p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>
                        <strong>
                          ₹{(book.price * book.quantity).toFixed(2)}
                        </strong>
                      </p>
                    </div>
                  </div>
                ))}
                <hr className="my-2" />
                <div className="flex justify-between">
                  <div className="text-sm text-gray-600">
                    <p>
                      <strong>Total Price:</strong>
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>
                      <strong>₹{orderItem.total.toFixed(2)}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full">
            <OrderDetails orderItem={orderItem} />{" "}
            {/* Render the OrderDetails component inside modal */}
            <button
              onClick={closeModal}
              className="ml-[60px] w-full max-w-[150px] text-sm text-black hover:underline px-4 py-1 border border-lilac rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderItem;

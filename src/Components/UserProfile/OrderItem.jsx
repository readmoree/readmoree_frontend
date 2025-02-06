import React, { useState } from "react";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const OrderItem = ({ orderItem }) => {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false); // State to track the expanded state of order details

  const statusColors = {
    DELIVERED: "bg-green-100 text-green-800",
    PENDING: "bg-yellow-100 text-yellow-800",
    DISPATCHED: "bg-blue-100 text-blue-800",
    SHIPPED: "bg-blue-100 text-blue-800",
    RETURN: "bg-red-100 text-red-100",
    CANCELLED: "bg-gray-100 text-gray-800",
  };

  const handleToggleDetails = () => {
    setIsDetailsExpanded((prevState) => !prevState); // Toggle the expanded state
  };

  return (
    <div className="bg-white border rounded-lg p-6 mb-4">
      <div className="flex justify-between">
        <div className="flex-col items-center gap-2 mb-2">
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
          <p className="text-xs text-gray-500 px-1 py-1">
            {orderItem.status === "Processing"
              ? "Book printing has started"
              : "Processing refund"}
          </p>
        </div>
        <div>
          <div className="">
            <span className="text-gray-600 font-normal text-sm">
              Order ID:{" "}
            </span>
            <span className="text-gray-800 ml-1 text-sm">{orderItem.id}</span>
          </div>
          <div>
            <span className="text-gray-600 font-normal text-sm">
              Tracking ID:
            </span>
            <span className="text-gray-800 ml-1 text-sm">
              {orderItem.trackingId || "N/A"}
            </span>
          </div>
          <div>
            <span className="text-gray-600 font-normal text-sm">
              Payment ID:
            </span>
            <span className="text-gray-800 ml-1 text-sm">
              {orderItem.paymentId || "N/A"}
            </span>
          </div>
          <div>
            <span className="text-gray-600 font-normal text-sm">
              Payment Method:
            </span>
            <span className="text-gray-800 ml-1 text-sm">
              {orderItem.paymentMethod}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-row md:flex-row items-start md:items-center gap-4 mt-3">
        <div className="flex flex-col justify-between gap-5">
          <p className="text-sm text-gray-500">
            Ordered on: {formatDate(orderItem.orderDate)}
          </p>
          <div>
            <button
              className="text-sm text-red-600 hover:underline"
              onClick={handleToggleDetails}
            >
              {isDetailsExpanded ? "Hide Order Details" : "Order Details"}
            </button>
          </div>
        </div>
      </div>

      {isDetailsExpanded && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          {/* Expanded Order Details */}
          <div>
            <p className="text-sm text-gray-600">
              <strong>Item Name:</strong> {orderItem.itemName}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Quantity:</strong> {orderItem.quantity}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Total Price:</strong> ${orderItem.totalPrice}
            </p>
            {/* Add other order details as needed */}
          </div>
        </div>
      )}

      <div className="flex flex-row justify-end gap-2 items-center md:items-end">
        {orderItem.status !== "CANCELLED" && (
          <button className="text-sm text-black hover:underline px-4 py-1 border border-lilac rounded-md">
            Download Invoice
          </button>
        )}
        {orderItem.status === "DELIVERED" && (
          <button className="text-sm text-black border rounded-md px-4 py-1 bg-lilac">
            Return Order
          </button>
        )}
        {orderItem.status !== "DELIVERED" &&
          orderItem.status !== "CANCELLED" && (
            <button className="text-sm text-black border rounded-md px-4 py-1 bg-lilac">
              Cancel Order
            </button>
          )}
        <button className="text-sm text-black hover:underline px-4 py-1 border border-lilac rounded-md">
          Get Help
        </button>
      </div>
    </div>
  );
};

export default OrderItem;

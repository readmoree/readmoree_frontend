import React from "react";

const OrderItem = ({
  title,
  date,
  orderId,
  trackingId,
  imageUrl,
  status,
  action,
}) => {
  const statusColors = {
    Processing: "bg-yellow-100 text-yellow-600",
    Cancelled: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white border rounded-lg p-6 mb-4">
      <div className="flex justify-between">
        <div className="flex-col items-center gap-2 mb-2">
          <span
            className={`text-sm font-medium px-2 py-1 rounded-full ${statusColors[status]}`}
          >
            {status}
          </span>
          <p className="text-xs text-gray-500 px-1 py-1">
            {status === "Processing"
              ? "Book printing has started"
              : "Processing refund"}
          </p>
        </div>
        <div>
          <div className="">
            <span className="text-gray-600 font-normal text-sm">
              Order ID:{" "}
            </span>
            <span className="text-gray-800 ml-1 text-sm">{orderId}</span>
          </div>
          <div>
            <span className="text-gray-600 font-normal text-sm">
              Tracking ID:
            </span>
            <span className="text-gray-800 ml-1 text-sm">
              {trackingId || "N/A"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-row md:flex-row items-start md:items-center gap-4 mt-3">
        {/* Left Section: Image */}
        <img src={imageUrl} alt={title} className="w-24 h-32" />
        {/* Middle Section: Details */}
        <div className="flex flex-col justify-between gap-5">
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500">Total Items (1)</p>
            <p className="text-sm text-gray-500">Ordered on: {date}</p>
          </div>
          <div>
            <button className="text-sm text-red-600 hover:underline">
              Order Details
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end gap-2 items-centre md:items-end">
        {action === "Download Invoice" ? (
          <>
            <button className="text-sm text-black hover:underline px-4 py-1 border border-lilac rounded-md">
              Download Invoice
            </button>
            <button className="text-sm text-black border rounded-md px-4 py-1 bg-lilac">
              Cancel Order
            </button>
          </>
        ) : (
          <button className="text-sm text-black hover:underline px-4 py-1 border border-lilac rounded-md">
            Get Help
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderItem;

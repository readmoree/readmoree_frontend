// import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

const OrderTable = ({ orders, customers, addresses, handleActionClick }) => {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  console.log(orders, customers, addresses);

  return (
    <div className="px-5 py-2">
      <div className="">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left"></th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <React.Fragment key={order.orderId}>
                <tr className="border-t border-gray-200">
                  <td className="py-3 px-4">{order.orderId}</td>
                  <td className="py-3 px-4 flex flex-col gap-1">
                    <div className="font-bold">
                      {customers.filter(
                        (cust) => cust.customerId === order.customerId
                      )[0]?.firstName || "No"}{" "}
                      {customers.filter(
                        (cust) => cust.customerId === order.customerId
                      )[0]?.lastName || "Name"}
                      {/* XYZ XYZ */}
                    </div>
                    <div className="text-sm">
                      {customers.filter(
                        (cust) => cust.customerId === order.customerId
                      )[0]?.email || "example@gmail.com"}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {order.orderDetails[0]?.orderDate
                      ? new Date(
                          order.orderDetails[0].orderDate
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "No Date"}
                  </td>

                  <td className="py-3 px-4">
                    ${order.orderDetails[0].orderTotal || 2222}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-sm rounded-md ${
                        order.orderDetails[0].orderStatus === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "SHIPPED"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "DISPATCHED"
                          ? "bg-teal-100 text-teal-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.orderDetails[0].orderStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 hover:underline">
                    <button
                      className="text-black font-bold hover:text-gray-900 flex items-center"
                      onClick={() => toggleExpand(index)}
                    >
                      Order Details
                      {expanded === index ? (
                        <ChevronUp className="hover:underline" />
                      ) : (
                        <ChevronDown className="hover:underline" />
                      )}
                    </button>
                  </td>
                  <td>
                    {order.orderDetails[0].orderStatus === "PENDING" && (
                      <button
                        className="bg-teal-400 text-white px-3 py-1 rounded w-24"
                        onClick={() =>
                          handleActionClick("DISPATCHED", order.orderId)
                        }
                      >
                        Dispatch
                      </button>
                    )}
                    {order.orderDetails[0].orderStatus === "DISPATCHED" && (
                      <button
                        className="bg-blue-400 text-white px-3 py-1 rounded w-24"
                        onClick={() =>
                          handleActionClick("SHIPPED", order.orderId)
                        }
                      >
                        Ship
                      </button>
                    )}
                    {order.orderDetails[0].orderStatus === "SHIPPED" && (
                      <button
                        className="bg-green-400 text-white px-3 py-1 rounded w-24"
                        onClick={() =>
                          handleActionClick("DELIVERED", order.orderId)
                        }
                      >
                        Delivered
                      </button>
                    )}
                  </td>
                </tr>
                {expanded === index && (
                  <tr className="bg-gray-50">
                    <td colSpan="6" className="p-4">
                      {/* Ordered Books Section */}
                      <h4 className="font-semibold mb-2">Order ID:</h4>
                      <ul>{order.orderId}</ul>
                      <h4 className="font-semibold mb-2">Ordered Books:</h4>
                      <ul className="space-y-1">
                        {order.orderDetails.map((book, bookIndex) => (
                          <li key={bookIndex} className="flex justify-between">
                            <span>
                              {book.bookName} (x{book.quantity})
                            </span>
                            <span className="text-gray-700">
                              ${book.price.toFixed(2)}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Customer Information Section */}
                      <div className="mt-4 px-1 py-4 border-t border-gray-300 flex flex-col gap-1">
                        <h4 className="font-semibold mb-2">
                          Customer Information:
                        </h4>
                        <p>
                          <span className="font-medium">Address:</span>{" "}
                          {addresses.flatNo} {addresses.buildingName}{" "}
                          {addresses.locality} {addresses.area} {addresses.city}{" "}
                          {addresses.state} {addresses.pincode}
                        </p>
                        <p>
                          <span className="font-medium">Payment Mode:</span>{" "}
                          {order.orderDetails[0].paymentMethod}
                        </p>
                        <p>
                          <span className="font-medium">Payment ID:</span>{" "}
                          {order.orderDetails[0].paymentId}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;

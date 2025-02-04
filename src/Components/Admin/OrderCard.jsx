import React from "react";

const dummyOrders = [
  {
    id: 2632,
    image: "https://m.media-amazon.com/images/I/81PRaT4gu-L._SL1500_.jpg",
    title: "How to Kill Your Family",
    customer: "Brooklyn Zoe",
    date: "31 Jul 2020",
    quantity: 2,
    price: 64.0,
    status: "Pending",
  },
  {
    id: 2633,
    image: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg",
    title: "The Alchemist",
    customer: "John Doe",
    date: "15 Aug 2021",
    quantity: 1,
    price: 29.99,
    status: "Shipped",
  },
  {
    id: 2634,
    image: "https://m.media-amazon.com/images/I/71UwSHSZRnS.jpg",
    title: "Atomic Habits",
    customer: "Alice Smith",
    date: "22 Dec 2023",
    quantity: 3,
    price: 45.5,
    status: "Delivered",
  },
];

const OrderCard = ({ order, handleDispatch }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-80 border">
      {/* Book Details */}
      <div className="flex">
        <img
          src={order.image}
          alt={order.title}
          className="w-20 h-28 object-cover rounded-lg"
        />
        <div className="ml-4 flex-1">
          <h3 className="font-bold text-lg">#{order.id}</h3>
          <p className="text-gray-600">{order.customer}</p>
          <p className="text-sm text-gray-400">{order.date}</p>
        </div>
      </div>

      {/* Order Info */}
      <div className="mt-4">
        <p>
          <span className="font-semibold">Quantity:</span> {order.quantity}
        </p>
        <p>
          <span className="font-semibold">Price:</span> $
          {order.price.toFixed(2)}
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`px-2 py-1 rounded text-sm ${
              order.status === "Pending"
                ? "bg-yellow-300 text-yellow-800"
                : order.status === "Shipped"
                ? "bg-blue-300 text-blue-800"
                : "bg-green-300 text-green-800"
            }`}
          >
            {order.status}
          </span>
        </p>
      </div>

      {/* Dispatch Button */}
      {order.status === "Pending" && (
        <button
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          onClick={() => handleDispatch(order.id)}
        >
          Dispatch
        </button>
      )}
    </div>
  );
};

const OrderList = () => {
  const handleDispatch = (orderId) => {
    console.log(`Dispatching order #${orderId}`);
    // Implement dispatch API call here
  };

  return (
    <div className="flex flex-wrap gap-6 p-6">
      {dummyOrders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          handleDispatch={handleDispatch}
        />
      ))}
    </div>
  );
};

export default OrderList;

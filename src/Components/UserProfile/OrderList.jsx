import React from "react";
import OrderItem from "./OrderItem";

const orders = [
  {
    id: 1,
    title: "Build an Epic Career",
    date: "27/01/2025",
    orderId: "BKSORDqakjjrd7WNI8404670",
    trackingId: "#BKSUBO2HOVSFmd3kiJ436601",
    imageUrl:
      "https://d34a0mln2492j4.cloudfront.net/unsigned/resize:fit:317:447:0/gravity:sm/plain/https%3A%2F%2Fimage-hub.reproindialtd.com%2F9780670099825.jpg",
    status: "Processing",
    action: "Download Invoice",
  },
  {
    id: 2,
    title: "Just One Heart",
    date: "24/12/2024",
    orderId: "BKSORD9Nz06f1zDdEZ383107",
    trackingId: "#BKSUBOLDyKibolemN9414226",
    imageUrl:
      "https://d34a0mln2492j4.cloudfront.net/unsigned/resize:fit:317:447:0/gravity:sm/plain/https%3A%2F%2Fimage-hub.reproindialtd.com%2F9780670099825.jpg",
    status: "Cancelled",
    action: "Get Help",
  },
];

const OrderList = () => {
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>
      {orders.map((order) => (
        <OrderItem key={order.id} {...order} />
      ))}
    </div>
  );
};

export default OrderList;

import React from "react";
import Navbar from "../Components/Navbar";
import OrderProgress from "../Components/OrderProgress";
import Footer from "../Components/Footer";

const OrderDetails = () => {
  return (
    <>
      <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md">
        {/* Order ID */}
        <h2 className="text-xl font-bold mb-4">
          Order ID: BKSORDqakjjrd7WN18404670
        </h2>
        <OrderProgress />

        {/* Order Details Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Total Items: 1</h3>
          <div className="flex items-center gap-4 mt-2">
            <img
              src="https://cdn.shopify.com/s/files/1/0648/3066/9017/products/build_an_epic_career_360x.jpg?v=1678851725"
              alt="Book Cover"
              className="w-16 h-24 object-cover rounded-md"
            />
            <div>
              <p className="font-semibold">Build an Epic Career</p>
              <p className="text-sm text-gray-500">Qty: 0 • ₹0</p>
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Address Details</h3>
          <p className="text-sm text-gray-600 mt-1">
            Deliver to: sdfghj, wertyuj, Pune, Maharashtra, 411057
          </p>
        </div>

        {/* Billing Details */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Bill Details</h3>
          <ul className="text-sm text-gray-600 mt-2">
            <li>Payment Method: COD</li>
            <li>Order Value: ₹0</li>
            <li>Discount on MRP: ₹0</li>
            <li>Shipping Charges: Free</li>
            <li>COD Charges: Free</li>
            <li>You Pay: ₹0</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;

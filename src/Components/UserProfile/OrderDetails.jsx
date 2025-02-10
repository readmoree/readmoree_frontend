import React, { useEffect, useState } from "react";
import OrderProgress from "./../OrderProgress";
import { getAddressById } from "../../services/user";
import { toast } from "react-toastify";

const OrderDetails = ({ orderItem }) => {
  const [address, setAddress] = useState({});

  useEffect(() => {
    const fetchAddress = async (address) => {
      try {
        const response = await getAddressById(orderItem.addressId);
        if (response.status === "success") {
          setAddress(response.data);
        } else {
          toast.error("Something went wrong!");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAddress(orderItem.addressId);
  }, []);

  return (
    <>
      <div className="max-h-[80vh] overflow-y-auto p-4">
        <div className="bg-white  rounded-md p-6">
          <div className="p-6 max-w-4xl mx-auto bg-white rounded-md">
            <h2 className="text-xl font-bold mb-4">
              Order ID:{" "}
              <span className="font-normal font-mono">{orderItem.id}</span>
            </h2>
            {/* <OrderProgress /> */}

            {/* Order Details Section */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Total Items: 1</h3>
              {orderItem.items.map((book) => (
                <div className="flex items-center gap-4 mt-2">
                  <img
                    src={book.image.split(" ")[0]}
                    alt={book.name}
                    className="w-16 h-24 object-cover rounded-md"
                  />

                  <div>
                    <p className="font-semibold">{book.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {book.quantity} • ₹
                      {(book.price * book.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Address Details */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Address Details</h3>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-bold">Deliver to:</span> {address.flatNo},{" "}
                {address.buildingName}, {address.locality}, {address.area},{" "}
                {address.city}, {address.district}, {address.state},{" "}
                {address.country}, {address.pincode}
              </p>
            </div>

            {/* Billing Details */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Bill Details</h3>
              <ul className="text-sm text-gray-600 mt-2">
                <li>
                  <span className="font-bold">Payment Method:</span>{" "}
                  {orderItem.paymentMethod}
                </li>
                <li>
                  <span className="font-bold">Order Value:</span> ₹
                  {orderItem.total}
                </li>
                <li>
                  <span className="font-bold">Shipping Charges:</span> Free
                </li>
                <li>
                  <span className="font-bold">COD Charges: Free</span>
                </li>
                <li>
                  <span className="font-bold">You Pay:</span> ₹{orderItem.total}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;

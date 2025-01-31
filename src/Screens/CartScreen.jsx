/* Vivek@28/01 on VSCode */

import { useState } from "react";
import AddressSelector from "../Components/Cart/AddressSelector";
import BookItem from "../Components/Cart/BookItem";
import CouponSelector from "../Components/Cart/CouponSelector";
import OrderSummary from "../Components/Cart/OrderSummary";
import PaymentMode from "../Components/Cart/PaymentMode";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const CartScreen = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isNewAddressModalOpen, setIsNewAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("...");
  const [paymentMode, setPaymentMode] = useState("Credit/Debit Cards");
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const addresses = [
    "123, Main Street, City, ZIP",
    "456, Another Street, City, ZIP",
    "789, Third Avenue, City, ZIP",
  ];

  const toggleAddressModal = () => setIsAddressModalOpen(!isAddressModalOpen);
  const toggleNewAddressModal = () =>
    setIsNewAddressModalOpen(!isNewAddressModalOpen);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsAddressModalOpen(false);
  };

  const handlePaymentModeChange = (e) => setPaymentMode(e.target.value);

  const handleApplyCoupon = () => {
    if (couponCode.trim() !== "") {
      setIsCouponApplied(true);
      alert(`Coupon "${couponCode}" applied successfully!`);
    } else {
      alert("Please enter a valid coupon code.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl my-10 mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Section */}
          <div className="flex flex-col w-full md:w-3/5 space-y-6">
            {/* Address Selector */}
            <AddressSelector
              selectedAddress={selectedAddress}
              isAddressModalOpen={isAddressModalOpen}
              isNewAddressModalOpen={isNewAddressModalOpen}
              addresses={addresses}
              toggleAddressModal={toggleAddressModal}
              toggleNewAddressModal={toggleNewAddressModal}
              handleAddressSelect={handleAddressSelect}
            />

            {/* Book List */}
            {[1, 2, 3, 4, 5].map((_, index) => (
              <BookItem key={index} />
            ))}
          </div>

          <div className="w-full md:w-2/5 flex-shrink-0">
            {/* Coupon Selection */}
            <CouponSelector
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              handleApplyCoupon={handleApplyCoupon}
              isCouponApplied={isCouponApplied}
            />

            <div className="border p-6 bg-white">
              {/* Order Summary  */}
              <OrderSummary amountPayable={20000} savings={1000} />

              {/* Payment Modes */}
              <PaymentMode
                paymentMode={paymentMode}
                handlePaymentModeChange={handlePaymentModeChange}
              />

              <button className="w-full bg-purple-600 text-white py-2 mt-6 hover:bg-purple-700">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartScreen;

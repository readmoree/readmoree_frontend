/* Vivek@28/01 on VSCode */

import {
  FaRegCreditCard,
  FaUniversity,
  FaMobileAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

const PaymentMode = ({ paymentMode, handlePaymentModeChange }) => {
  const paymentOptions = [
    { mode: "Credit/Debit Cards", icon: <FaRegCreditCard /> },
    { mode: "Net Banking", icon: <FaUniversity /> },
    { mode: "UPI", icon: <FaMobileAlt /> },
    { mode: "Cash on Delivery", icon: <FaMoneyBillWave /> },
  ];

  return (
    <div>
      <h3 className="font-semibold text-lg mt-6 mb-4">Mode of Payment</h3>
      <div className="space-y-3">
        {paymentOptions.map(({ mode, icon }) => (
          <label
            key={mode}
            className={`flex items-center border p-2 cursor-pointer ${
              paymentMode === mode
                ? "bg-purple-100 border-purple-600"
                : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="paymentMode"
              value={mode}
              checked={paymentMode === mode}
              onChange={handlePaymentModeChange}
              className="mr-2"
            />
            <span className="text-xl mr-3 text-purple-600">{icon}</span>
            {mode}
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMode;

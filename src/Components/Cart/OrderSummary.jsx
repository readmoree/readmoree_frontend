/* Vivek@28/01 on VSCode */

const OrderSummary = ({ amountPayable, savings }) => {
  return (
    <div>
      <h3 className="font-semibold text-xl mb-4">Order Summary</h3>
      <div className="flex justify-between text-gray-700 mb-2">
        <p>Amount Payable :</p>
        <p>₹ {amountPayable}</p>
      </div>
      <p className="text-sm text-gray-500">
        Tax included.{" "}
        <span className="text-purple-600 underline">Shipping</span> calculated
        at checkout.
      </p>
      <div className="flex justify-between mt-4 text-gray-700">
        <p>You Save :</p>
        <p>₹ {savings}</p>
      </div>
      <textarea
        placeholder="Special Delivery Instructions"
        className="w-full border p-2 mt-4 text-gray-700 resize-none max-h-[150px] overflow-y-auto"
        rows={3}
      ></textarea>
    </div>
  );
};

export default OrderSummary;

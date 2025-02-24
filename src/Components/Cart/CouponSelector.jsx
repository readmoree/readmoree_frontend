/* Vivek@28/01 on VSCode */

const CouponSelector = ({
  couponCode,
  setCouponCode,
  isCouponApplied,
  handleApplyCoupon,
}) => {
  return (
    <div className="border p-6 mb-6 bg-white">
      <h3 className="font-semibold text-lg mb-4">Apply Coupon</h3>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-grow border p-2 text-gray-700"
        />
        <button
          onClick={handleApplyCoupon}
          className="bg-lilac_dark text-white px-4 py-2 hover:bg-purple-700"
        >
          Apply
        </button>
      </div>
      {isCouponApplied && (
        <p className="text-lilac_dark mt-2 text-sm">
          Coupon "{couponCode}" Applied Successfully!
        </p>
      )}
    </div>
  );
};

export default CouponSelector;

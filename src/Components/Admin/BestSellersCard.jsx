import { MoreVertical } from "lucide-react";

const BestSellersCard = ({ bestSellers }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md ">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Best Sellers</h2>
        <MoreVertical className="text-gray-500 cursor-pointer" />
      </div>

      {/* Product List */}
      <ul>
        {bestSellers.map((book, index) => (
          <li key={index} className="flex items-center space-x-3 mb-3">
            {/* Image Placeholder */}
            <div className="w-12 h-12 bg-gray-300 rounded-md"></div>

            {/* Product Details */}
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">{book.name}</p>
              <p className="text-xs text-gray-500">₹{book.originalPrice}</p>
            </div>

            {/* Price & Sales */}
            <div className="text-right">
              <p className="text-sm font-bold">₹{book.discountedPrice}</p>
              <p className="text-xs text-gray-500">{book.sales} sales</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Report Button */}
      <button className="mt-4 bg-blue-900 text-white w-full py-2 rounded-lg text-sm font-medium">
        REPORT
      </button>
    </div>
  );
};

export default BestSellersCard;

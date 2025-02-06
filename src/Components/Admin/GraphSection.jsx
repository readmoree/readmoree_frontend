import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MoreVertical } from "lucide-react";

// Dummy Data for Sales Graph
const dataSets = {
  WEEKLY: [
    { period: "Mon", sales: 50 },
    { period: "Tue", sales: 70 },
    { period: "Wed", sales: 80 },
    { period: "Thu", sales: 60 },
    { period: "Fri", sales: 90 },
    { period: "Sat", sales: 120 },
    { period: "Sun", sales: 140 },
  ],
  MONTHLY: [
    { period: "JUL", sales: 50 },
    { period: "AUG", sales: 60 },
    { period: "SEP", sales: 100 },
    { period: "OCT", sales: 90 },
    { period: "NOV", sales: 120 },
    { period: "DEC", sales: 400 },
  ],
  YEARLY: [
    { period: "2020", sales: 500 },
    { period: "2021", sales: 700 },
    { period: "2022", sales: 800 },
    { period: "2023", sales: 1200 },
    { period: "2024", sales: 1500 },
  ],
};

// Best Sellers Data
const bestSellersData = [
  {
    name: "Lorem Ipsum",
    originalPrice: "126.500",
    discountedPrice: "126.50",
    sales: 999,
    imgUrl:
      "https://d34a0mln2492j4.cloudfront.net/unsigned/resize:fit:142:221:0/gravity:sm/plain/https%3A%2F%2Fimage-hub.reproindialtd.com%2F9798896327790.jpg",
  },
  {
    name: "Lorem Ipsum",
    originalPrice: "126.500",
    discountedPrice: "126.50",
    sales: 999,
    imgUrl:
      "https://d34a0mln2492j4.cloudfront.net/unsigned/resize:fit:142:221:0/gravity:sm/plain/https%3A%2F%2Fimage-hub.reproindialtd.com%2F9798896327790.jpg",
  },
  {
    name: "Lorem Ipsum",
    originalPrice: "126.500",
    discountedPrice: "126.50",
    sales: 999,
    imgUrl:
      "https://d34a0mln2492j4.cloudfront.net/unsigned/resize:fit:142:221:0/gravity:sm/plain/https%3A%2F%2Fimage-hub.reproindialtd.com%2F9798896327790.jpg",
  },
  {
    name: "Lorem Ipsum",
    originalPrice: "126.500",
    discountedPrice: "126.50",
    sales: 999,
    imgUrl:
      "https://d34a0mln2492j4.cloudfront.net/unsigned/resize:fit:142:221:0/gravity:sm/plain/https%3A%2F%2Fimage-hub.reproindialtd.com%2F9798896327790.jpg",
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("MONTHLY");
  const salesData = dataSets[activeTab];

  return (
    <div className="flex flex-col lg:flex-row gap-4 bg-white py-6">
      {/* Sales Graph Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex-1">
        <h2 className="text-xl font-bold mb-4">Sales Graph</h2>

        {/* Tabs */}
        <div className="flex space-x-2 mb-4">
          {["WEEKLY", "MONTHLY", "YEARLY"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-1 text-sm border font-bold rounded-md ${
                activeTab === tab
                  ? "bg-lilac_dark text-white"
                  : "border-gray-400"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Graph */}
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={salesData}>
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#A294F9"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Best Sellers Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-80">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Best Sellers</h2>
          <MoreVertical className="text-gray-500 cursor-pointer" />
        </div>

        {/* Product List */}
        <ul>
          {bestSellersData.map((book, index) => (
            <li key={index} className="flex items-center space-x-3 mb-3">
              {/* Image Placeholder */}
              <div>
                <img
                  src={book.imgUrl}
                  className="w-fit max-h-14 rounded-md"
                ></img>
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {book.name}
                </p>
                <p className="text-xs text-gray-500">₹{book.originalPrice}</p>
              </div>

              {/* Price & Sales */}
              <div className="text-right">
                <p className="text-sm font-bold">₹{book.discountedPrice}</p>
                <p className="text-xs text-lilac_dark">{book.sales} sales</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Report Button */}
        <button className="mt-4 bg-lilac_dark text-white w-full py-2 rounded-lg text-sm font-medium">
          REPORT
        </button>
      </div>
    </div>
  );
}

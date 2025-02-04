import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  ColumnSeries,
  Category,
  LineSeries,
  Legend,
  DataLabel,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import { ShoppingBag } from "lucide-react";

// const AnimatedCard = ({ title, value, delay }) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const end = value;
//     const duration = 3000; // 2 seconds animation
//     const stepTime = 35;

//     const timer = setInterval(() => {
//       start += Math.ceil(end / (duration / stepTime));
//       if (start >= end) {
//         start = end;
//         clearInterval(timer);
//       }
//       setCount(start);
//     }, stepTime);

//     return () => clearInterval(timer);
//   }, [value]);

//   return (
//     <motion.div
//       className="bg-white shadow-lg rounded-lg p-6 text-center"
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, delay: delay }}
//     >
//       <h3 className="text-lg font-bold text-gray-700">{title}</h3>
//       <p className="text-3xl font-extrabold text-green-600">{count}</p>
//     </motion.div>
//   );
// };

const AnimatedCard = ({ title, value, percentage, comparison, delay }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 3000; // 3 seconds animation
    const stepTime = 35;

    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / stepTime));
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-4 shadow-lg rounded-2xl bg-white"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm font-medium">{title}</span>
          <ShoppingBag className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">₹{count}</span>
          <span className="text-sm text-green-600 font-medium">
            ▲ {percentage}%
          </span>
        </div>
        <span className="text-xs text-gray-400">{comparison}</span>
      </div>
    </motion.div>
  );
};

const StatisticsPage = ({
  totalSales,
  completedOrders,
  monthlySalesData,
  bestSellers,
  recentOrders,
}) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatedCard
          title="Total Orders"
          value={totalSales}
          percentage={34.7}
          comparison="Compared to Oct 2023"
          delay={0.2}
        />

        <AnimatedCard
          title="Completed Orders"
          value={completedOrders}
          percentage={34.7}
          comparison="Compared to Oct 2023"
          delay={0.2}
        />
      </div>

      {/* Monthly Sales Graph */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
        <ChartComponent
          title="Sales Analysis"
          primaryXAxis={{
            valueType: "Category",
            title: "Month",
            majorGridLines: { width: 0 },
          }}
          primaryYAxis={{ title: "Sales ($)", majorGridLines: { width: 0 } }}
          legendSettings={{ visible: true }}
          tooltip={{ enable: true }}
        >
          <Inject
            services={[LineSeries, Category, Legend, DataLabel, Tooltip]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              type="Line"
              dataSource={monthlySalesData}
              xName="month"
              yName="sales"
              marker={{ dataLabel: { visible: true }, visible: true }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>

      {/* Best Sellers */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Best Sellers</h2>
        <ul className="list-disc pl-5">
          {bestSellers.map((book, index) => (
            <li key={index} className="text-gray-600">
              {book}
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Orders Displayed as Cards */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col"
            >
              <div className="flex items-center gap-4">
                <img
                  src={order.image}
                  alt="Book"
                  className="w-24 h-24 rounded"
                />
                <div>
                  <h3 className="text-lg font-bold">{order.id}</h3>
                  <p className="text-gray-600">{order.name}</p>
                  <p className="text-gray-500 text-sm">{order.date}</p>
                </div>
              </div>
              <div className="mt-3">
                <p>
                  <span className="font-semibold">Quantity:</span>{" "}
                  {order.quantity}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> ${order.price}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>
                  <span
                    className={`px-2 py-1 rounded ${
                      order.status === "Pending"
                        ? "bg-yellow-500 text-white"
                        : order.status === "Dispatched"
                        ? "bg-blue-500 text-white"
                        : order.status === "Shipped"
                        ? "bg-purple-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;

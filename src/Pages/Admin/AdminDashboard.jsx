// import DashboardPage from "./DashboardPage";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import StatisticsPage from "../../Components/Admin/StatisticsPage";
import Sidebar from "../../Components/Admin/AdminSidebr";
import AdminHeader from "../../Components/Admin/AdminHeader";
import LoadingPage from "../LoadingPage";

const AnimatedCard = ({ title, value, delay }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000; // 2 seconds animation
    const stepTime = 20;

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
      className="bg-white shadow-lg rounded-lg p-6 text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
    >
      <h3 className="text-lg font-bold text-gray-700">{title}</h3>
      <p className="text-3xl font-extrabold text-blue-600">{count}</p>
    </motion.div>
  );
};

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const totalSales = 12500; // Example data
  const completedOrders = 230;
  const totalBooks = 16700; // Example data
  const activeUsers = 2002;

  const monthlySalesData = [
    { month: "Jan", sales: 1200 },
    { month: "Feb", sales: 1500 },
    { month: "Mar", sales: 1800 },
    { month: "Apr", sales: 2200 },
    { month: "May", sales: 2500 },
    { month: "Jun", sales: 2700 },
    { month: "Jul", sales: 3200 },
    { month: "Aug", sales: 2500 },
    { month: "Sep", sales: 2800 },
    { month: "Oct", sales: 4200 },
    { month: "Nov", sales: 4500 },
    { month: "Dec", sales: 4700 },
  ];

  const bestSellers = ["Book A", "Book B", "Book C", "Book D"];

  const recentOrders = [
    {
      id: "#2632",
      name: "Brooklyn Zoe",
      date: "31 Jul 2020",
      quantity: 2,
      price: 64,
      status: "Pending",
      image:
        "https://www.crossword.in/cdn/shop/products/71sru2dKW4L_460x@2x.jpg?v=1685185758",
    },
    {
      id: "#2633",
      name: "John McCormick",
      date: "01 Aug 2020",
      quantity: 1,
      price: 35,
      status: "Dispatched",
      image:
        "https://www.crossword.in/cdn/shop/products/71sru2dKW4L_460x@2x.jpg?v=1685185758",
    },
    {
      id: "#2634",
      name: "Sandra Pugh",
      date: "02 Aug 2020",
      quantity: 3,
      price: 74,
      status: "Completed",
      image:
        "https://www.crossword.in/cdn/shop/products/71sru2dKW4L_460x@2x.jpg?v=1685185758",
    },
  ];
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Simulating a loading delay
  }, []);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="flex h-screen bg-white overflow-x-hidden">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Dashboard Content */}
          <div className="flex flex-col w-full">
            <div className="">
              <AdminHeader />
            </div>
            <div className="flex-1 p-6 overflow-y-auto ">
              <StatisticsPage
                totalSales={totalSales}
                completedOrders={completedOrders}
                monthlySalesData={monthlySalesData}
                bestSellers={bestSellers}
                recentOrders={recentOrders}
                totalBooks={totalBooks}
                activeUsers={activeUsers}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;

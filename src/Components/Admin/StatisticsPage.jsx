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
import BestSellersCard from "./BestSellersCard";
import GraphSection from "./GraphSection";
import OrderTable from "./OrderTable";
import axios from "axios";

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
      className="p-5 shadow-lg rounded-2xl bg-white min-w-72"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 text-sm font-bold">{title}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <div className="p-1.5 rounded-lg bg-lilac_dark">
              <ShoppingBag className="text-black bg-lilac_dark" />
            </div>
            <div>
              <span className="text-3xl font-bold">{count}</span>
            </div>
          </div>
          <span className="text-sm text-green-600 font-medium">
            ▲ {percentage}%
          </span>
        </div>
        <div className="flex items-center justify-end">
          <span className="text-xs text-gray-400">{comparison}</span>
        </div>
      </div>
    </motion.div>
  );
};

const StatisticsPage = ({
  totalSales,
  completedOrders,
  activeUsers,
  totalBooks,
  monthlySalesData,
  bestSellers,
  recentOrders,
}) => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  // Example Usage
  const bestSellersData = [
    {
      name: "Lorem Ipsum",
      originalPrice: "126.500",
      discountedPrice: "126.50",
      sales: 999,
    },
    {
      name: "Lorem Ipsum",
      originalPrice: "126.500",
      discountedPrice: "126.50",
      sales: 999,
    },
    {
      name: "Lorem Ipsum",
      originalPrice: "126.500",
      discountedPrice: "126.50",
      sales: 999,
    },
  ];

  const getAllOrders = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_ORDER_SERVICE_URL}/orders/admin/allOrders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        const ordersArray = Object.keys(response.data).map((orderId) => ({
          orderId,
          orderDetails: response.data[orderId],
          customerId: response.data[orderId][0].customerId,
          addressId: response.data[orderId][0].addressId,
        }));
        setOrders(ordersArray);
        console.log(ordersArray);
      } else {
        console.error("Failed to fetch orders. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    }
  };

  const getCustomers = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const customerIds = orders.map((order) => order.customerId);
      const ids = customerIds.join(",");
      const response = await axios.get(
        `${process.env.REACT_APP_USER_SERVICE_URL}/public/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { ids: ids },
        }
      );

      if (response.status === 200) {
        console.log(response);
        setCustomers(response.data.data);
      } else {
        console.error("Failed to fetch orders. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []); // Fetch orders on mount

  useEffect(() => {
    if (orders.length > 0) {
      getCustomers();
    }
  }, [orders]); // Fetch customers & addresses only when orders are updated
  return (
    <div className="px-3">
      <h1 className="text-2xl font-bold mb-6 ">Admin Dashboard</h1>

      {/* Stats Overview */}
      <div className="flex flex-wrap justify-between gap-2">
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
        <AnimatedCard
          title="Active Users"
          value={activeUsers}
          percentage={34.7}
          comparison="Compared to Oct 2023"
          delay={0.2}
        />
        <AnimatedCard
          title="Total Books"
          value={totalBooks}
          percentage={34.7}
          comparison="Compared to Oct 2023"
          delay={0.2}
        />
      </div>

      <GraphSection className="" />
      {/* Recent Orders Displayed as Cards */}
      <div className="px-5 py-3 shadow-lg rounded-lg">
        <div className="">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <React.Fragment key={order.orderId}>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4">{order.orderId}</td>
                    <td className="py-3 px-4 flex flex-col gap-1">
                      <div className="font-bold">
                        {customers.filter(
                          (cust) => cust.customerId === order.customerId
                        )[0]?.firstName || "No"}{" "}
                        {customers.filter(
                          (cust) => cust.customerId === order.customerId
                        )[0]?.lastName || "Name"}
                      </div>
                      <div className="text-sm">
                        {customers.filter(
                          (cust) => cust.customerId === order.customerId
                        )[0]?.email || "example@gmail.com"}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {order.orderDetails[0]?.orderDate
                        ? new Date(
                            order.orderDetails[0].orderDate
                          ).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "No Date"}
                    </td>

                    <td className="py-3 px-4">
                      ${order.orderDetails[0].orderTotal || 2222}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 text-sm rounded-md ${
                          order.orderDetails[0].orderStatus === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "SHIPPED"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "DISPATCHED"
                            ? "bg-teal-100 text-teal-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {order.orderDetails[0].orderStatus}
                      </span>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;

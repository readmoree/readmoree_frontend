import { useState, useEffect } from "react"; // Import Sidebar component
import AdminHeader from "../../Components/Admin/AdminHeader";
import OrderTable from "../../Components/Admin/OrderTable";
import OrderCard from "../../Components/Admin/OrderCard";
import Sidebar from "../../Components/Admin/AdminSidebr";
import axios from "axios";
import { toast } from "react-toastify";
import {
  getCustomers,
  getAddresses,
} from "../../services/AdminServices/orders";

const OrderPage = () => {
  // 1. Initialize State Variables
  const [filter, setFilter] = useState("All");
  const [orders, setOrders] = useState([]);
  const [customersData, setCustomersData] = useState([]);
  const [addressData, setAddressData] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  // 2. Function to Fetch Orders
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
        setCustomersData(response.data.data);
      } else {
        console.error("Failed to fetch orders. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const getAddresses = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const addressIds = orders.map((order) => order.addressId);
      const ids = addressIds.join(",");
      const response = await axios.get(
        `${process.env.REACT_APP_USER_SERVICE_URL}/public/addressess`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { ids: ids },
        }
      );

      if (response.status === 200) {
        setAddressData(response.data.data);
      } else {
        console.error("Failed to fetch orders. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  // 3. Effect to Fetch Orders on Component Mount

  console.log("set", customersData);
  console.log(addressData);

  useEffect(() => {
    getAllOrders();
  }, []); // Fetch orders on mount

  useEffect(() => {
    if (orders.length > 0) {
      getCustomers();
      getAddresses();
    }
  }, [orders]); // Fetch customers & addresses only when orders are updated

  // 4. Effect to Filter Orders When `orders` or `filter` Changes
  useEffect(() => {
    console.log("orders changes");
    setFilteredOrders(
      filter === "All"
        ? orders
        : orders.filter(
            (order) =>
              order.orderDetails[0].orderStatus === filter.toUpperCase()
          )
    );
  }, [orders, filter]);

  // 5. Action Handler for Updating Order Status
  const handleActionClick = async (action, orderId) => {
    // http://localhost:8081/orders/admin/orderStatus?orderStatus=PENDING
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.patch(
        `${process.env.REACT_APP_ORDER_SERVICE_URL}/orders/admin/orderStatus/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            orderStatus: action.toUpperCase(),
          },
        }
      );

      console.log("Headers being sent:", {
        Authorization: `Bearer ${token}`,
      });

      if (response.status === 200) {
        toast.success(`Order ${action} successfully`);
        getAllOrders();
        window.location.reload();
      } else {
        toast.error(`Order Not ${action}`);
      }
    } catch (error) {
      toast.error("Internal Server Error");
      console.error("Error fetching orders:", error.message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 max-h-screen">
      <Sidebar /> {/* Sidebar component */}
      <div className="flex flex-col w-full">
        <div className="">
          <AdminHeader />
        </div>
        <div className="bg-white flex-1 p-5 m-3 rounded-xl shadow-md overflow-y-scroll">
          <div className="bg-white p-5">
            <h2 className="text-2xl font-bold text-gray-700">Orders</h2>
            <div className="flex flex-wrap items-center justify-between my-4">
              {[
                "All",
                "Pending",
                "Dispatched",
                "Shipped",
                "Delivered",
                "Returned",
                "Cancelled",
              ].map((status) => (
                <button
                  key={status}
                  className={`px-6 py-2 rounded ${
                    filter === status
                      ? "bg-lilac_dark text-white"
                      : "bg-white border border-lilac text-black"
                  }`}
                  onClick={() => setFilter(status)}
                >
                  {status} Orders
                </button>
              ))}
            </div>
          </div>
          <div className="">
            <OrderTable
              orders={filteredOrders}
              customers={customersData}
              addresses={addressData}
              handleActionClick={handleActionClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderPage;

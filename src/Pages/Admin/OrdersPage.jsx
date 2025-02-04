import { useState, useEffect } from "react"; // Import Sidebar component
import AdminHeader from "../../Components/Admin/AdminHeader";
import OrderTable from "../../Components/Admin/OrderTable";
import OrderCard from "../../Components/Admin/OrderCard";
import Sidebar from "../../Components/Admin/AdminSidebr";

const OrderPage = () => {
  const ordersData = [
    {
      orderId: "ORD12352",
      customer: "Liam Johnson",
      email: "liam.j@gmail.com",
      date: "2024-02-06",
      total: 42.99,
      status: "Shipped",
      books: [{ title: "The Alchemist", quantity: 1, price: 42.99 }],
      customerAddress: "101 Green Street, Seattle, WA, USA",
      paymentMode: "Credit Card",
      PaymentId: "PAY-98761234",
    },
    {
      orderId: "ORD12353",
      customer: "Olivia Taylor",
      email: "olivia.t@gmail.com",
      date: "2024-02-06",
      total: 35.5,
      status: "Pending",
      books: [{ title: "Rich Dad Poor Dad", quantity: 1, price: 35.5 }],
      customerAddress: "23 King Street, London, UK",
      paymentMode: "Debit Card",
      PaymentId: "PAY-34567890",
    },
    {
      orderId: "ORD12354",
      customer: "Noah Davis",
      email: "noah.d@gmail.com",
      date: "2024-02-07",
      total: 49.99,
      status: "Delivered",
      books: [{ title: "The Four Agreements", quantity: 1, price: 49.99 }],
      customerAddress: "77 Queen Ave, Sydney, Australia",
      paymentMode: "PayPal",
      PaymentId: "PAY-56789123",
    },
    {
      orderId: "ORD12355",
      customer: "Emma White",
      email: "emma.w@gmail.com",
      date: "2024-02-07",
      total: 60.0,
      status: "Dispatched",
      books: [{ title: "The 5 AM Club", quantity: 2, price: 30.0 }],
      customerAddress: "5 River Road, Mumbai, India",
      paymentMode: "Google Pay",
      PaymentId: "PAY-12398745",
    },
    {
      orderId: "ORD12356",
      customer: "James Anderson",
      email: "james.a@gmail.com",
      date: "2024-02-08",
      total: 25.75,
      status: "Pending",
      books: [{ title: "The Art of War", quantity: 1, price: 25.75 }],
      customerAddress: "88 Lake View Drive, Berlin, Germany",
      paymentMode: "UPI",
      PaymentId: "PAY-78965412",
    },
    {
      orderId: "ORD12357",
      customer: "Isabella Martinez",
      email: "isabella.m@gmail.com",
      date: "2024-02-08",
      total: 37.99,
      status: "Shipped",
      books: [
        {
          title: "Mindset: The New Psychology of Success",
          quantity: 1,
          price: 37.99,
        },
      ],
      customerAddress: "12 Maple Avenue, Toronto, Canada",
      paymentMode: "Cash on Delivery",
      PaymentId: "COD-987123654",
    },
    {
      orderId: "ORD12358",
      customer: "William Clark",
      email: "william.c@gmail.com",
      date: "2024-02-09",
      total: 55.0,
      status: "Delivered",
      books: [{ title: "Zero to One", quantity: 1, price: 55.0 }],
      customerAddress: "100 Mountain View, Dubai, UAE",
      paymentMode: "Credit Card",
      PaymentId: "PAY-765432189",
    },
    {
      orderId: "ORD12359",
      customer: "Sophia Hall",
      email: "sophia.h@gmail.com",
      date: "2024-02-10",
      total: 48.99,
      status: "Dispatched",
      books: [
        { title: "The Monk Who Sold His Ferrari", quantity: 1, price: 48.99 },
      ],
      customerAddress: "22 Ocean Drive, Cape Town, South Africa",
      paymentMode: "Debit Card",
      PaymentId: "PAY-951357468",
    },
    {
      orderId: "ORD12360",
      customer: "Benjamin Lewis",
      email: "benjamin.l@gmail.com",
      date: "2024-02-11",
      total: 39.99,
      status: "Shipped",
      books: [
        {
          title: "The 7 Habits of Highly Effective People",
          quantity: 1,
          price: 39.99,
        },
      ],
      customerAddress: "19 Sunflower Lane, Paris, France",
      paymentMode: "PayPal",
      PaymentId: "PAY-258369147",
    },
    {
      orderId: "ORD12361",
      customer: "Charlotte King",
      email: "charlotte.k@gmail.com",
      date: "2024-02-12",
      total: 58.5,
      status: "Pending",
      books: [
        {
          title: "Grit: The Power of Passion and Perseverance",
          quantity: 1,
          price: 58.5,
        },
      ],
      customerAddress: "33 Moonlight Blvd, Singapore",
      paymentMode: "Google Pay",
      PaymentId: "PAY-357159246",
    },
  ];
  const [filter, setFilter] = useState("All");
  const [orders, setOrders] = useState(ordersData);
  const [filteredOrders, setFilteredOrders] = useState(orders);

  // Filter orders based on the selected statu
  useEffect(() => {
    setFilteredOrders(
      filter === "All"
        ? orders
        : orders.filter((order) => order.status === filter)
    );
  }, [orders, filter]);

  const handleActionClick = (action, orderId) => {
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.map((order) =>
        order.orderId === orderId ? { ...order, status: action } : order
      );
      return updatedOrders;
    });

    // Ensure filtered orders also get updated
    setFilteredOrders((prevFilteredOrders) => {
      return prevFilteredOrders.map((order) =>
        order.orderId === orderId ? { ...order, status: action } : order
      );
    });
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
              handleActionClick={handleActionClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderPage;

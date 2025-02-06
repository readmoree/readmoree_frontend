import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getOrders } from "../../services/user";
import OrderItem from "./OrderItem";

const preprocessOrders = (orders) => {
  return orders.reduce((acc, order) => {
    if (!acc[order.orderId]) {
      acc[order.orderId] = {
        addressId: order.addressId,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        paymentId: order.paymentId,
        trackingId: order.trackingId,
        orderDate: order.orderDate,
        orderTotal: order.orderTotal,
        books: [],
      };
    }

    acc[order.orderId].books.push({
      bookId: order.bookId,
      bookName: order.bookName,
      image: order.image,
      quantity: order.quantity,
      price: order.price,
    });

    return acc;
  }, {});
};

const OrderList = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrders();

        const data = Object.entries(preprocessOrders(response)).map(
          ([orderId, orderData]) => ({
            id: orderId,
            addressId: orderData.addressId,
            orderDate: orderData.orderDate,
            total: orderData.orderTotal,
            status: orderData.orderStatus,
            paymentId: orderData.paymentId,
            paymentMethod: orderData.paymentMethod,
            paymentStatus: orderData.paymentStatus,
            trackingId: orderData.trackingId,
            items: orderData.books.map((book) => ({
              name: book.bookName,
              image: book.image,
              quantity: book.quantity,
              price: book.price,
            })),
          })
        );

        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(orders);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>
      {orders.map((order) => (
        <OrderItem key={order.id} orderItem={order} />
      ))}
    </div>
  );

  // return (
  //   <div className="container mx-auto p-4">
  //     <div className="bg-white border-x border-gray-200 rounded-lg overflow-hidden">
  //       <table className="min-w-full">
  //         <thead className="border-t bg-gray border-gray-200">
  //           <tr>
  //             <th className="px-6 py-3 text-left text-md font-semibold text-gray-700 border-b">
  //               Order ID
  //             </th>
  //             <th className="px-6 py-3 text-left text-md font-semibold text-gray-700 border-b">
  //               Date
  //             </th>
  //             <th className="px-6 py-3 text-left text-md font-semibold text-gray-700 border-b">
  //               Total
  //             </th>
  //             <th className="px-6 py-3 text-left text-md font-semibold text-gray-700 border-b">
  //               Status
  //             </th>
  //             <th className="px-6 py-3 text-left text-md font-semibold text-gray-700 border-b">
  //               Actions
  //             </th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {orders.map((order, index) => (
  //             <React.Fragment key={order.id}>
  //               <tr className="hover:bg-gray-50">
  //                 <td className="px-6 py-4 text-md text-gray-900 font-mono border-b">
  //                   {order.id}
  //                 </td>
  //                 <td className="px-6 py-4 text-md text-gray-900 border-b">
  //                   {formatDate(order.orderDate)}
  //                 </td>
  //                 <td className="px-6 py-4 text-md text-gray-900 border-b">
  //                   ₹{order.total}
  //                 </td>
  //                 <td className="px-6 py-4 border-b">
  //                   <span
  //                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
  //                       statuses[order.status]
  //                     }`}
  //                   >
  //                     {order.status.replace(
  //                       order.status.slice(1),
  //                       order.status.slice(1).toLowerCase()
  //                     )}
  //                   </span>
  //                 </td>
  //                 <td className="px-6 py-4 border-b">
  //                   {order.status !== "DELIVERED" &&
  //                     order.status !== "CANCELLED" &&
  //                     order.status !== "RETURNED" && (
  //                       <button
  //                         onClick={() => {}}
  //                         className="inline-flex items-center mr-4 px-3 py-1 border border-gray-300 rounded-md text-md font-medium text-gray-700 bg-white hover:bg-gray-50"
  //                       >
  //                         Cancel
  //                       </button>
  //                     )}
  //                   {order.status === "DELIVERED" &&
  //                     order.status !== "CANCELLED" &&
  //                     order.status !== "RETURNED" && (
  //                       <button
  //                         onClick={() => {}}
  //                         className="inline-flex items-center mr-4 px-3 py-1 border border-gray-300 rounded-md text-md font-medium text-gray-700 bg-white hover:bg-gray-50"
  //                       >
  //                         Return
  //                       </button>
  //                     )}
  //                   <button
  //                     onClick={() => toggleOrderDetails(order.id)}
  //                     className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-md font-medium text-gray-700 bg-white hover:bg-gray-50"
  //                   >
  //                     Order Details
  //                     {expandedOrder === order.id ? (
  //                       <ChevronUp className="ml-2 h-4 w-4" />
  //                     ) : (
  //                       <ChevronDown className="ml-2 h-4 w-4" />
  //                     )}
  //                   </button>
  //                 </td>
  //               </tr>
  //               {expandedOrder === order.id && (
  //                 <tr>
  //                   <td colSpan="6" className="px-6 py-4 bg-gray-50 border-b">
  //                     <div className="space-y-4">
  //                       <div>
  //                         <h4 className="text-md font-medium text-gray-900">
  //                           Order ID:
  //                         </h4>
  //                         <p className="mt-1 text-md text-gray-600 font-mono">
  //                           {order.id}
  //                         </p>
  //                       </div>
  //                       <div>
  //                         <h4 className="text-md font-medium text-gray-900">
  //                           Ordered Books:
  //                         </h4>
  //                         <div className="mt-2 space-y-2">
  //                           {order.items.map((item, index) => (
  //                             <div
  //                               key={index}
  //                               className="flex justify-between text-md mr-14"
  //                             >
  //                               <span className="text-gray-600">
  //                                 {item.name} (x{item.quantity})
  //                               </span>
  //                               <span className="text-gray-900">
  //                                 ₹{item.price.toFixed(2)}
  //                               </span>
  //                             </div>
  //                           ))}
  //                         </div>
  //                       </div>
  //                     </div>
  //                   </td>
  //                 </tr>
  //               )}
  //             </React.Fragment>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
};

export default OrderList;

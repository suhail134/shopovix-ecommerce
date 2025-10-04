"use client";

import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true)
  // Fetch orders once component mounts
  const router=useRouter()
  useEffect(() => {
    fetch("/api/allOrders")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.allorders) {
          setOrders(data.allorders);
           setLoading(false);
        } else {
          setOrders([]);
        }
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  // ✅ Filter orders based on search input
  const filteredOrders = orders.filter(
    (item) =>
      item._id.toLowerCase().includes(search.toLowerCase()) ||
      (item.customerName?.toLowerCase() || "").includes(search.toLowerCase())
  );

  return (
       <div className="p-4 sm:p-8 min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Prevent unwanted horizontal scroll */}
      <style jsx global>{`
        html,
        body {
          overflow-x: hidden !important;
        }
      `}</style>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <Loader className="animate-spin w-12 h-12 text-blue-500" />
        </div>
      ) : (
        <>
          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-center mb-6 sm:mb-10 text-gray-900 tracking-tight">
            Your Orders
          </h1>

          {/* Search */}
          <div className="max-w-md mx-auto mb-10">
            <input
              type="text"
              placeholder="Search by order id or Customer Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* No Orders */}
          {orders.length === 0 && (
            <div className="text-center text-gray-500 text-base sm:text-lg bg-white rounded-xl shadow p-6 sm:p-10">
              <p>No orders found.</p>
            </div>
          )}
          
          {/* Desktop Table */}
          {orders.length > 0 && (
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-[900px] w-full bg-white border border-gray-200 rounded-2xl shadow-xl">
                <thead className="bg-gradient-to-r from-[#2b0a5e] to-[#4a00e0] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Order</th>
                    <th className="px-6 py-4 text-left font-semibold">Date</th>
                    <th className="px-6 py-4 text-left font-semibold">Customer</th>
                    <th className="px-6 py-4 text-left font-semibold">Total</th>
                    <th className="px-6 py-4 text-left font-semibold">Payment</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Items</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr
                        key={order._id}
                        className="hover:bg-gray-50 transition cursor-pointer"
                        onClick={() =>
                          // (router.push(`/admin/singleOrder/${order._id}`))
                          (window.location.href=`/admin/singleOrder/${order._id}`)
                        }
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 break-words">
                          #{order._id.slice(-6)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 truncate max-w-[180px]">
                          {order.customerName || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          ₹{order.totalAmount}
                        </td>
                        <td
                          className={`px-6 py-4 text-sm font-medium ${
                            order.paymentStatus === "Paid"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {order.paymentStatus}
                        </td>
                        <td
                          className={`px-6 py-4 text-sm font-medium ${
                            order.orderStatus === "delivered"
                              ? "text-green-600"
                              : order.orderStatus === "Pending"
                              ? "text-yellow-600"
                              : "text-blue-600"
                          }`}
                        >
                          {order.orderStatus}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {order.products.reduce(
                            (total, item) => total + item.quantity,
                            0
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-6 text-gray-500">
                        No orders match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Mobile Cards */}
          {orders.length > 0 && (
            <div className="grid sm:hidden gap-4">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <div
                    key={order._id}
                    onClick={() =>
                      (window.location.href = `/admin/singleOrder/${order._id}`)
                    }
                    className="bg-white p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-semibold text-gray-900">
                        #{order._id.slice(-6)}
                      </p>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          order.orderStatus === "delivered"
                            ? "bg-green-100 text-green-700"
                            : order.orderStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-700 mb-1 truncate">
                      Customer:{" "}
                      <span className="font-medium">
                        {order.customerName || "N/A"}
                      </span>
                    </p>
                    
                    <p className="text-sm text-gray-700 mb-1">
                      Items:{" "}
                      <span className="font-medium">
                        {order.products.reduce(
                          (total, item) => total + item.quantity,
                          0
                        )}
                      </span>
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      Total: ₹{order.totalAmount}
                    </p>
                    <p
                      className={`text-xs mt-2 font-medium ${
                        order.paymentStatus === "Paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.paymentStatus}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center py-6 text-gray-500 col-span-full">
                  No orders match your search.
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrdersPage;

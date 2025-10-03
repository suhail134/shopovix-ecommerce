"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ReturnAndCancel() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeAction, setActiveAction] = useState({});

  useEffect(() => {
    if (status !== "authenticated") {
      setLoading(false);
      return;
    }

    fetch("/api/order")
      .then((res) => res.json())
      .then((data) => {
        const filtered = (data.orders || []).filter((o) => {
          const s = o.orderStatus?.toLowerCase();
          return (
            s === "cancelled" ||
            s === "return requested" ||
            s === "return in process" ||
            s === "returned" ||
            s === "accepted return request" ||
            s === "accepted" ||
            s === "out for pickup" ||
            s === "return picked up" 
            
          );
        }); // <- yahi galti thi, extra bracket hata de

        setOrders(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [status]);


  const handleReturn = async (orderId, action, reason = "") => {
    try {
      setActiveAction({ [orderId]: true });
      const res = await fetch("/api/order/return", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, action, reason }),
      });

      const data = await res.json();
      if (!data.success) {
        alert(data.message || "Failed to update return request");
        return;
      }

      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? data.order : o))
      );
    } catch (err) {
      console.error("Return error:", err);
      alert("Something went wrong");
    } finally {
      setActiveAction({});
    }
  };

  if (loading) {
    return (
      <div className="flex  items-center h-[70vh]">
        <div className="animate-spin relative left-100 rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (status !== "authenticated") {
    return (
      <div className="flex justify-center items-center h-[70vh] text-lg font-medium text-gray-700">
        Please login to see your return/cancel orders.
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center     h-[70vh] ">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4554/4554644.png"
          alt="No return/cancel orders"
          className="w-32 h-32 mb-4 opacity-80"
        />
        <p className="text-xl font-semibold text-gray-700">
          No return or cancelled orders
        </p>
        <p className="text-gray-500 mt-2">
          Your return and cancelled orders will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800 dark:text-white">
        Return & Cancelled Orders
      </h2>

      <div className="space-y-6 grid grid-cols-1 sm:grid-cols-2 max-h-[70vh] overflow-auto lg:grid-cols-3 gap-6">
        {orders
          .filter((order) => {
            const status = order.orderStatus?.toLowerCase();
            return (
              status === "cancelled" ||
              status === "return requested" ||
              status === "return in process" ||
              status === "returned" ||
              status === "accepted return request" ||
              status === "accepted" ||
              status === "out for pickup" ||
              status === "return picked up" 
             
            );
          })
          .map((order) => (
            <div
              key={order._id}
              className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Order ID
                  </p>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    #{order._id.slice(0, 6)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Placed on:{" "}
                    <span className="font-medium">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-semibold shadow-sm ${order.orderStatus === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : order.orderStatus === "return requested"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.orderStatus === "accepted return request"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                    }`}
                >
                  {order.orderStatus}
                </span>
              </div>

              {/* Product Preview */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
                  <img
                    src={order.products[0]?.image || "/placeholder.png"}
                    alt={order.products[0]?.name || "Product"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-1">
                    {order.products[0]?.name || "Product Name"}
                  </p>
                  <p className="text-xs text-gray-500">
                    +{order.products.length - 1} more items
                  </p>
                </div>
              </div>

              {/* Order Footer */}
              <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 border-t pt-3">
                <p>
                  {order.products.reduce((acc, item) => acc + item.quantity, 0)} items
                </p>
                <p className="font-semibold text-lg text-gray-900 dark:text-white">
                  ₹{order.totalAmount}
                </p>
              </div>

              {/* Cancel Return Button */}
              {(order.orderStatus === "return requested" ||
                order.orderStatus === "accepted return request") && (
                  <button
                    disabled={activeAction[order._id]}
                    onClick={() => handleReturn(order._id, "cancel")}
                    className="mt-4 bg-gradient-to-r from-red-600 to-red-500 w-full text-white px-4 py-2 rounded-lg font-medium shadow-md hover:from-red-700 hover:to-red-600 transition"
                  >
                    {activeAction[order._id]
                      ? "Processing..."
                      : "Cancel My Return Request"}
                  </button>
                )}

              {/* Return Status */}
              <div className="mt-3 text-center text-sm font-medium">
                {order.returnStatus === "pending" && (
                  <span className="text-yellow-600">Return Pending</span>
                )}
                {order.returnStatus === "accepted" && (
                  <span className="text-green-600">Return Accepted</span>
                )}
                {order.returnStatus === "cancelled" && (
                  <span className="text-red-600">
                    Return Request Cancelled from Shopovix
                  </span>
                )}
              </div>
            </div>
          ))}
      </div>

    </div>
  );
}

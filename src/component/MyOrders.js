"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function MyOrders() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeAction, setActiveAction] = useState({});

  // Fetch Orders
  useEffect(() => {
    if (status !== "authenticated") {
      setLoading(false);
      return;
    }

    fetch("/api/order")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [status]);

  // Cancel Order Handler
  const handleCancel = async (orderId) => {
    try {
      const res = await fetch("/api/order/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Order cancelled successfully");
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, orderStatus: "processing" } : o
          )
        );
      } else {
        alert(data.message || "Failed to cancel order");
      }
    } catch (error) {
      console.error("Cancel error:", error);
      alert("Something went wrong while cancelling order");
    } finally {
      setActiveAction({});
    }
  };

  // Return Order Handler
  const handleReturn = async (orderId, action, reason = "") => {
    try {
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

      // Update order status with backend response
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

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="animate-spin   rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  // Not Logged In
  if (status !== "authenticated") {
    return (
      <div className="flex justify-center items-center h-[70vh] text-lg font-medium text-gray-700">
        Please login to see your orders.
      </div>
    );
  }

  // No Orders
  const visibleOrders = orders.filter(order =>
    ["delivered", "processing", "shipped", "out for delivery", "confirmed"].includes(order.orderStatus)
  );

  if (!visibleOrders.length) {
    return (
      <div className="flex flex-col  justify-center items-center h-[70vh] text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No orders"
          className="w-24 h-24 mb-4 opacity-80"
        />
        <p className="text-xl font-semibold text-gray-700">
          You have no orders yet
        </p>
        <p className="text-gray-500 mt-2">
          Start shopping to see your orders here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Your Orders</h2>

      {visibleOrders.length > 0 && (
        <p className="flex justify-center items-center font-bold text-lg sm:text-xl mb-4">
          Click to view your order details
        </p>
      )}

      {/* Orders List */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pr-2"
        style={{ maxHeight: "70vh" }}
      >
        {visibleOrders.map((order) => (
          <Link
            href={`/orders/${order._id}`}
            key={order._id}
            className="block bg-white h-full cursor-pointer shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            {/* Top Section */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Order ID
                </p>
                <p className="text-sm font-medium text-gray-700">
                  #{order._id.slice(0, 6)}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Placed on:{" "}
                  <span className="font-medium">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </p>
              </div>

              <span
                className={`px-1 sm:px-3  py-1 text-xs sm:text-sm rounded-full font-medium ${order.orderStatus === "delivered"
                  ? "bg-green-100 text-green-700"
                  : order.orderStatus === "processing"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
                  }`}
              >
                {order.orderStatus}
              </span>
            </div>

            {/* Middle Section (Product Preview) */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-xl overflow-hidden border border-gray-200">
                <img
                  src={
                    typeof order.products[0]?.product_image === "string"
                      ? order.products[0].product_image
                      : order.products[0]?.product_image?.url || "/placeholder.png"
                  }
                  alt={order.products[0]?.product_title || "Product"}
                  className="w-full h-full object-cover"
                />

              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 line-clamp-1">
                  {order.products[0]?.product_title || "Product Name"}
                </p>
                <p className="text-xs text-gray-500">+1 more items</p>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex justify-between items-center text-sm text-gray-600 border-t pt-3">
              <p>
                {order.products.reduce(
                  (acc, item) => acc + item.quantity,
                  0
                )}{" "}
                items
              </p>
              <p className="font-semibold text-base sm:text-lg text-gray-900">
                ₹{order.totalAmount}
              </p>
            </div>

            {/* Action Buttons */}
            <div
              onClick={(e) => e.preventDefault()}
              className="flex flex-col justify-center items-center mt-3 w-full"
            >
              {/* Return Flow */}
              {order.orderStatus === "delivered" &&
                activeAction[order._id] === "return" ? (
                <div className="w-full">
                  <textarea
                    placeholder="Enter return reason..."
                    className="w-full p-2 border rounded mb-2 text-sm"
                    value={order.returnReason || ""}
                    onChange={(e) =>
                      setOrders((prev) =>
                        prev.map((o) =>
                          o._id === order._id
                            ? { ...o, returnReason: e.target.value }
                            : o
                        )
                      )
                    }
                  />
                  <button
                    onClick={() =>
                      handleReturn(
                        order._id,
                        "request",
                        order.returnReason || ""
                      )
                    }
                    className="bg-blue-600 w-full text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Submit Return
                  </button>
                </div>
              ) : order.orderStatus === "delivered" ? (
                <button
                  onClick={() => setActiveAction({ [order._id]: "return" })}
                  className="bg-blue-600 w-full text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Return Order
                </button>
              ) : null}

              {/* Cancel Return */}
              {order.orderStatus === "return requested" && (
                <button
                  onClick={() => handleReturn(order._id, "cancel")}
                  className="bg-yellow-600 cursor-pointer w-full text-white px-4 py-2 rounded hover:bg-yellow-700"
                >
                  Cancel Return
                </button>
              )}

              {/* Cancel Flow */}
              {order.orderStatus === "processing" &&
                activeAction[order._id] === "cancel" ? (
                <div className="w-full">
                  <p className="text-sm mb-2 text-gray-600">
                    Are you sure you want to cancel this order?
                  </p>
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="bg-red-600 cursor-pointer w-full text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Confirm Cancel
                  </button>
                </div>
              ) : order.orderStatus === "processing" ? (
                <button
                  onClick={() => setActiveAction({ [order._id]: "cancel" })}
                  className="bg-red-600 cursor-pointer w-full text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Cancel
                </button>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/order/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data.order || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-lg font-medium text-gray-700">
        Order not found.
      </div>
    );
  }

  return (
 <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-10 px-4">
  <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
    {/* Header */}
    <div className="flex flex-wrap justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-5 mb-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Order Details
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Order ID: <span className="font-mono">{order._id.slice(0,6)}</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Placed on:{" "}
          <span className="font-medium">
            {new Date(order.createdAt).toLocaleString()}
          </span>
        </p>
      </div>
      <span
        className={`px-5 py-2 text-sm rounded-full font-medium shadow-sm ${
          order.orderStatus === "delivered"
            ? "bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-300"
            : order.orderStatus === "processing"
            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800/30 dark:text-yellow-300"
            : "bg-blue-100 text-blue-700 dark:bg-blue-800/30 dark:text-blue-300"
        }`}
      >
        {order.orderStatus}
      </span>
    </div>

    {/* Customer Info */}
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Customer Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
        <p>
          <span className="font-medium">Name:</span> {order.customerName}
        </p>
        <p>
          <span className="font-medium">Email:</span> {order.email}
        </p>
        <p className="sm:col-span-2">
          <span className="font-medium">Address:</span> {order.customerAddress}
        </p>
      </div>
    </div>

    {/* Products */}
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-5 text-gray-800 dark:text-gray-100">
        Products
      </h3>
      <div className="space-y-4">
        {order.products?.map((product) => (
          <div
            key={product._id}
            className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
          >
            <div className="flex items-center gap-5">
              <img
                src={product.image}
                alt={product.title}
                className="w-20 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
              />
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100">
                  {product.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Qty: {product.quantity} × ₹{product.price}
                </p>
              </div>
            </div>
            <p className="font-bold text-lg text-gray-800 dark:text-gray-100">
              ₹{product.quantity * product.price}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Payment Info */}
    <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
      <p>
        <span className="font-medium">Payment Method:</span>{" "}
        {order.paymentMethod}
      </p>
      <p>
        <span className="font-medium">Payment Status:</span>{" "}
        {order.paymentStatus}
      </p>
      <p>
        <span className="font-medium">Total Amount:</span>{" "}
        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
          ₹{order.totalAmount}
        </span>
      </p>
      <p>
        <span className="font-medium">Last Updated:</span>{" "}
        {new Date(order.updatedAt).toLocaleString()}
      </p>
    </div>

    {/* Footer / Invoice */}
    <div className="border-t border-gray-200 dark:border-gray-700 pt-6 text-center">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Thank you for shopping with us 🚀
      </p>
    </div>
  </div>
</div>


  );
}
// Note: Ensure your backend API at /api/order/[id] returns order details in the expected format.
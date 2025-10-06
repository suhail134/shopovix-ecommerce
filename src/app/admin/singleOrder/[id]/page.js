"use client";
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
const SingleOrderPage = ({ params }) => {
  const { id } = params;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return;
    fetch(`/api/order/${id}`)
      .then((res) => res.json())
      .then((data) => {   
        if (data.success && data.order) {
          setOrder(data.order);
          setLoading(false);
        }
      })
      .catch((err) => console.error("Error fetching order:", err));
  }, [id]);



  return (
    <div className="p-4 sm:p-8 max-w-4xl overflow-x-hidden mx-auto bg-gray-50 min-h-screen">
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
      ) : (<>  <h1 className="text-2xl sm:text-4xl font-extrabold mb-6 sm:mb-8 text-gray-900 text-center tracking-tight">
        Order Details
      </h1>

        <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-xl space-y-6 sm:space-y-8">
         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Order Information
              </h2>
              <p className="text-gray-700 text-sm sm:text-base">
                <strong>Order ID:</strong> #{order._id.slice(-6)}
              </p>
              <p className="text-gray-700 text-sm sm:text-base">
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 text-sm sm:text-base">
                <strong>Status:</strong>{" "}
                <span
                  className={`${order.orderStatus === "delivered"
                    ? "text-green-600"
                    : order.orderStatus === "Pending"
                      ? "text-yellow-600"
                      : "text-blue-600"
                    } font-medium`}
                >
                  {order.orderStatus}
                </span>
              </p>
              <div>
                {order.orderStatus === "return requested" ? (
                  <div>

                    <strong>Return Reason:</strong>
                    <span className="ml-2 px-2 py-1  text-yellow-700 text-xs font-medium uppercase ">
                      {order.returnReason}
                    </span>
                  </div>
                ) : ("")}
              </div>
            </div>

          
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Payment & Shipping
              </h2>
              <p className="text-gray-700 text-sm sm:text-base">
                <strong>Payment Status:</strong>{" "}
                <span
                  className={`${order.paymentStatus === "Paid"
                    ? "text-green-600"
                    : "text-red-500"
                    } font-medium`}
                >
                  {order.paymentStatus}
                </span>
              </p>
              <p className="text-gray-700 text-sm sm:text-base">
                <strong>Payment Method:</strong>{order.paymentMethod}
              

              </p>
              <p className="text-gray-700 text-sm sm:text-base">
                <strong>Shipping Method:</strong>{" "}
                <span className="text-indigo-600 font-medium">Free</span>
              </p>
            </div>


            {order.orderStatus === "return requested" && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={async () => {
                    await fetch("/api/order/return", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ orderId: order._id, action: "accept" }),
                    }).then(res => res.json()).then(data => setOrder(data.order));
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Accept Return Request
                </button>

                <button
                  onClick={async () => {
                    await fetch("/api/order/return", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ orderId: order._id, action: "cancel" }),
                    }).then(res => res.json()).then(data => setOrder(data.order));
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Cancel Return Request
                </button>
              </div>
            )}

          </div>

          
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Customer Information
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              <strong>Name:</strong> {order.customerName || "N/A"}
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              <strong>Customer Email:</strong> {order.email || "N/A"}
            </p>
            <p className="text-gray-700 w-100 break-words text-sm sm:text-base">
              <strong>Customer Full Address:</strong> {order.customerAddress || "N/A"}
            </p>
           
        
          </div>

       

{order.products.map((item, index) => {
 

  return (
    <div
      key={index}
      className="flex flex-col sm:flex-row sm:items-center gap-4 border p-4 rounded-xl bg-gray-50 hover:shadow-md transition"
    >
      <img
        src={item?.product_image || "/placeholder.jpg"}
        alt={item?.product_title || "Product"}
        className="w-full sm:w-20 sm:h-20 h-40 object-cover rounded-lg border"
      />
      <div className="flex-1">
        <p className="font-medium line-clamp-2 text-gray-900 text-sm sm:text-base">
          {item?.product_title}
        </p>
        <p className="text-gray-600 text-xs sm:text-sm">
          Qty: {item.quantity} × ₹{item?.product_price}
        </p>
      </div>
      <p className="font-semibold text-gray-900 text-sm sm:text-base">
        ₹{(item?.product_price * item.quantity).toFixed(2)}
      </p>
    </div>
  );
})}


        
          {order.totalAmount && (
            <div className="border-t pt-4 sm:pt-6 mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <p className="text-lg sm:text-xl font-bold text-gray-900">
                Total: ₹{order.totalAmount.toFixed(2)}
              </p>
              <span className="px-3 py-1 sm:px-4 sm:py-2 bg-green-100 text-green-700 text-xs sm:text-sm font-medium rounded-full">
                {order.paymentStatus}
              </span>
            </div>
          )}
        </div></>)}
    </div>
  );
};

export default SingleOrderPage;

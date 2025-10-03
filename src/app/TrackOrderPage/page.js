// "use client"
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { Truck, ArrowLeft, PackageCheck } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// // import customers from "razorpay/dist/types/customers";

// export default function TrackOrderPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const orderId = searchParams.get("orderId");

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!orderId) {
//       router.push("/");
//       return;
//     }
//     // Fetch order details from API
//     fetch(`/api/order/${orderId}`)
//       .then(res => res.json())
//       .then(data => {
//         if (data.success && data.order) {
//           setOrder(data.order);
//         }
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [orderId, router]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-lg text-gray-600">Loading your order details...</div>
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
//         <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full text-center">
//           <PackageCheck className="text-red-500 w-16 h-16 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h1>
//           <p className="text-gray-600 mb-6">
//             Sorry, we couldn't find any order with ID <span className="font-semibold">{orderId}</span>.
//           </p>
//           <Link
//             href="/"
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
//           >
//             <ArrowLeft className="w-4 h-4" /> Back to Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
//       <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full text-center">
//         <Truck className="text-blue-500 w-16 h-16 mx-auto mb-4" />
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
//         <p className="text-gray-600 mb-6">
//           Stay updated with your order status and delivery details.
//         </p>

//         <div className="bg-gray-100 rounded-xl p-5 text-left space-y-3 mb-6">
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Order ID:</span>
//             <span className="text-gray-900">{order._id}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Customer Name:</span>
//             <span className="text-gray-900">{order.customerName || "N/A"}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Total Amount:</span>
//             <span className="text-gray-900">₹{order.totalAmount}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Payment Method:</span>
//             <span className="text-gray-900">{order.paymentMethod || "N/A"}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Payment Status:</span>
//             <span className={`text-gray-900 font-semibold ${order.paymentStatus === "paid" ? "text-green-600" : "text-yellow-600"}`}>
//               {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
//             </span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Order Status:</span>
//             <span className="text-gray-900">{order.orderStatus || "Processing"}</span>
//           </div>
//           <div className="flex flex-col">
//             <span className="font-semibold text-gray-700">Delivery Address:</span>
//             <span className="text-gray-900">{customers.address || "N/A"}</span>
//           </div>
//           <div className="flex flex-col">
//             <span className="font-semibold text-gray-700">Products:</span>
//             <ul className="list-disc ml-5 text-gray-900">
//               {order.products && order.products.length > 0 ? (
//                 order.products.map((p, idx) => (
//                   <li key={idx}>
//                     {p.title} <span className="text-gray-500">x{p.quantity}</span>
//                   </li>
//                 ))
//               ) : (
//                 <li>No products found</li>
//               )}
//             </ul>
//           </div>
//         </div>

//         <div className="flex items-center justify-center gap-2 mb-6">
//           <Truck className="text-blue-500 w-5 h-5" />
//           <span className="text-gray-700">
//             Estimated delivery: <span className="font-semibold">3-5 business days</span>
//           </span>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-4">
//           <Link
//             href="/"
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
//           >
//             <ArrowLeft className="w-4 h-4" /> Back to Home
//           </Link>
//           <Link
//             href="/"
//             className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium text-gray-700"
//           >
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
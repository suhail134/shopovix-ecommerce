// "use client";
// import React, { useState } from "react";
// import ReactStars from "react-stars";
// import { useEffect } from "react";
// const TestStarsPage = () => {
//   const [orders, setOrders] = useState([])
//   const [rating, setRating] = useState(0);
//   useEffect(() => {
//       fetch("/api/order")
//         .then((res) => res.json())
//         .then((data) => setOrders(data.orders))
//         .catch((err) => console.error("Error fetching orders:", err));
//     }, []);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//       <h1 className="text-2xl font-bold mb-6">ReactStars Demo</h1>
//       <div className="p-8 bg-white rounded-xl shadow-lg flex flex-col items-center">
//       <ReactStars count={5} value={rating} onChange={setRating} size={40} color2={"#ffd700"} />
//         <p className="mt-4 text-lg text-gray-700">Your Rating: {rating}</p>
//       </div>
//       <div>{orders?`${(orders.paymentMethod==="COD").length}`:<p>orders not found</p>}</div>
//     </div>
//   );
// };

// export default TestStarsPage;
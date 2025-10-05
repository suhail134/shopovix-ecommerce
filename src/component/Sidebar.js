"use client";
import React from "react";
import { useCart } from "@/component/CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
const Sidebar = ({ sidebarOpen, cart, setSidebarOpen }) => {
  //  const { id } = params;
  const { removeFromCart, addToCart, deleteAllitems } = useCart();
  const totalAmount = cart.reduce((acc, p) => acc + p.product_price * p.quantity, 0);
  const router = useRouter()
  const ref = useRef()


  const handleContinueShopping = () => {
    setSidebarOpen(false);
    // Optional: scroll top ya navigate to homepage
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const checkoutClick = () => {
    const productsData = cart.map(item => ({
      id: item._id,
      quantity: item.quantity,
      price: item.product_price,
      image: item.product_image,
      title: item.product_title
    }));

    const query = encodeURIComponent(JSON.stringify(productsData));
    router.push(`/checkout?products=${encodeURIComponent(JSON.stringify(cart))}`);
    setSidebarOpen(false);
  };

  useEffect(() => {
    const click = () => {
      if (ref.current && !ref.current.contains(event.target))
        setSidebarOpen(null)

    }
    document.addEventListener("mousedown", click)
    return () => document.removeEventListener("mousedown", click)
  }, [setSidebarOpen])


  useEffect(() => {
    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;

      // Swipe left to close
      if (sidebarOpen && diffX < -50) {
        setSidebarOpen(false);
      }

      // Swipe right to open (optional)
      // if (!sidebarOpen && diffX > 50) {
      //   setSidebarOpen(true);
      // }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [sidebarOpen]);


  return (
    <div ref={ref}
      className={`fixed right-0 top-0 h-screen sm:w-[60vw] md:w-[40vw] lg:w-[30vw]  w-[95vw] rounded-2xl bg-white/80 backdrop-blur-xl shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-300">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Your Cart</h2>
        <button
          onClick={() => setSidebarOpen(false)}
          className="text-gray-500 cursor-pointer hover:text-red-500 text-xl sm:text-2xl font-bold transition-colors"
        >
          ✖
        </button>
      </div>

      {/* If Cart Empty */}
      {cart.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[80%] text-center px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-3 sm:mb-4">
            🛒 Your Cart is Empty
          </h1>
          <p className="text-gray-500 mb-4 sm:mb-6 text-base sm:text-lg">
            Looks like you haven’t added anything yet.
          </p>
          <Link href={"/product"}>
            <button
              onClick={handleContinueShopping}
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition-transform duration-300 text-sm sm:text-base"
            >
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="overflow-y-auto max-h-[70vh] p-3 sm:p-4 custom-scrollbar">
            {cart.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-3 sm:gap-5 p-3 sm:p-4 mb-3 sm:mb-4 border border-gray-200 rounded-2xl shadow-sm bg-white hover:shadow-md transition-all duration-300"
              >
                {/* Product Image */}
                <img
                  src={item.product_image}
                  alt={item.product_title || "Product"}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                />

                {/* Product Info */}
                <div className="flex flex-col overflow-hidden justify-between flex-1">
                  {/* Name & Price */}
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug truncate">
                      {item.product_title}
                    </h2>
                    <p className="text-blue-600 font-bold text-sm sm:text-md mt-1">
                      ₹{item.product_price}
                    </p>
                  </div>

                  {/* Quantity + Delete */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 sm:gap-3 bg-gray-100 px-2 sm:px-3 py-1 rounded-full shadow-inner">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="px-2 sm:px-3 py-1 bg-gray-200 hover:bg-gray-300 text-base sm:text-lg font-bold rounded-full transition-all"
                      >
                        −
                      </button>

                      <span className="text-base sm:text-lg font-semibold min-w-[20px] text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => addToCart(item)}
                        className="px-2 sm:px-3 py-1 bg-gray-200 hover:bg-gray-300 text-base sm:text-lg font-bold rounded-full transition-all"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => deleteAllitems(item._id)}
                      className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors text-xs sm:text-sm"
                    >
                      <img src="/delete.svg" className="w-4 h-4" alt="delete" />
                      <span className="font-medium">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="px-4 sm:px-5 py-2 sm:py-3 border-t border-gray-200 bg-white/70 backdrop-blur-xl">
            <div className="flex justify-between text-base sm:text-lg font-bold mb-1 sm:mb-2">
              <span>Total Estimate</span>
              <span className="text-blue-600">₹{totalAmount}</span>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm mb-16 sm:mb-20">
              (Including all taxes and charges)
            </p>
          </div>

          {/* Fixed Checkout Button */}
          <div className="absolute bottom-0 left-0 w-full px-4 sm:px-5 pb-4 sm:pb-5 bg-white/90 backdrop-blur-xl border-t border-gray-200">
            <button onClick={checkoutClick} className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 sm:py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition-transform duration-300 text-sm sm:text-base">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>

  );
};

export default Sidebar;

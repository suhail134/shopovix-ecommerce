"use client";
import React from "react";

export default function PaymentOptions() {
  return (
    <div className="min-h-screen bg-gradient-to-b   px-6 md:px-20 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-8">
          Payment Options
        </h1>

        <p className="text-gray-500 text-center mb-10">
          At <span className="font-semibold  ">Shopovix</span>, we make
          payments easy and secure for you. Choose from multiple payment methods
          at checkout.
        </p>

        {/* Payment Methods */}
        <div className="space-y-8">
          {/* COD */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-3">
              Cash on Delivery (COD)
            </h2>
            <p className="text-gray-400">
              We offer <span className="text-white font-medium">Cash on Delivery</span> 
              on most products. Pay in cash once the product is delivered to your doorstep.
            </p>
            <p className="text-gray-400 mt-2">
              ⚠️ <span className="text-yellow-400 font-medium">Note:</span> COD
              may not be available for high-value or customized orders.
            </p>
          </div>

          {/* UPI / Wallet */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-3">UPI & Wallets</h2>
            <p className="text-gray-400">
              Pay instantly using <span className="text-white font-medium">UPI</span> 
              apps like Google Pay, PhonePe, Paytm, or any major wallet provider.
            </p>
          </div>

          {/* Cards */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-3">
              Credit & Debit Cards
            </h2>
            <p className="text-gray-400">
              We accept all major cards including{" "}
              <span className="text-white font-medium">
                Visa, MasterCard, RuPay, and Amex
              </span>{" "}
              with secure payment gateway encryption.
            </p>
          </div>

          {/* Net Banking */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-3">Net Banking</h2>
            <p className="text-gray-400">
              Choose from 50+ supported banks for a seamless and secure
              checkout experience.
            </p>
          </div>

          {/* Secure Payment */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-3">100% Secure Payments</h2>
            <p className="text-gray-300">
              All transactions are secured with{" "}
              <span className="text-white font-medium">SSL encryption</span> to
              ensure your personal and financial information is safe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

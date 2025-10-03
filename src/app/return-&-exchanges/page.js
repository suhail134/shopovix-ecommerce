"use client";
import React from "react";

export default function ReturnExchangePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b  px-6 md:px-20 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-8">
          Return & Exchange Policy
        </h1>

        {/* Intro */}
        <p className="text-gray-500 text-center mb-10">
          We value your satisfaction and want you to have the best shopping experience with us.
          Please read our return and exchange policy carefully before making a request.
        </p>

        {/* Policy Sections */}
        <div className="space-y-8">
          {/* Section 1 */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-3">Eligibility for Return</h2>
            <p className="text-gray-400">
              You can request a return within <span className="text-white font-medium">7 days</span> 
              of receiving your order if:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1">
              <li>Item is unused and in its original condition.</li>
              <li>All tags, packaging, and accessories are intact.</li>
              <li>Proof of purchase (order confirmation or invoice) is available.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-3">Non-Returnable Items</h2>
            <p className="text-gray-400">
              Certain items cannot be returned, including:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1">
              <li>Personalized or custom-made products.</li>
              <li>Clearance or final sale items.</li>
              <li>Products that are damaged due to misuse.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-3">Exchange Process</h2>
            <p className="text-gray-400">
              If you wish to exchange a product, follow these steps:
            </p>
            <ol className="list-decimal list-inside mt-2 text-gray-300 space-y-1">
              <li>Contact our support team at <span className="text-white font-medium">support@shopovix.store</span>.</li>
              <li>Provide your order number and reason for exchange.</li>
              <li>We will arrange pickup or guide you for return shipping.</li>
              <li>Once we receive and inspect the product, we’ll send the replacement.</li>
            </ol>
          </div>

          {/* Section 4 */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-3">Refunds</h2>
            <p className="text-gray-400">
              Refunds are issued to your original payment method within 
              <span className="text-white font-medium"> 5-7 business days</span> 
              after we receive and approve the returned item.
            </p>
          </div>

          {/* Section 5 */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
            <p className="text-gray-300">
              Have questions? Reach out at{" "}
              <a href="mailto:support@shopovix.store" className="text-blue-400 underline">
                example@gmail.com
              </a>{" "}
              and our team will assist you promptly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

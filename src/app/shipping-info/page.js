"use client";
import React from "react";

export default function ShippingInformation() {
  return (
    <div className="min-h-screen bg-gradient-to-b   px-6 md:px-20 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-8">
          Shipping Information
        </h1>

        {/* Intro */}
        <p className="text-gray-500 text-center mb-10">
          We strive to deliver your order quickly and safely. Please read our
          shipping policy below to know more about delivery times, charges, and
          process.
        </p>

        {/* Shipping Details */}
        <div className="space-y-8">
          {/* Delivery Time */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-3">
              Estimated Delivery Time
            </h2>
            <p className="text-gray-400">
              Orders are typically processed within{" "}
              <span className="text-white font-medium">24-48 hours</span> of
              purchase. Standard delivery takes:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1">
              <li>📍 <span className="font-medium">Metro Cities:</span> 3-5 Business Days</li>
              <li>🏡 <span className="font-medium">Other Locations:</span> 5-7 Business Days</li>
            </ul>
          </div>

          {/* Shipping Charges */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-3">Shipping Charges</h2>
            <p className="text-gray-400">
              We offer <span className="text-white font-medium">FREE shipping</span> 
              on orders above ₹999. For orders below this amount, a small shipping
              fee of ₹49 may apply.
            </p>
          </div>

          {/* Order Tracking */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-3">Order Tracking</h2>
            <p className="text-gray-400">
              Once your order is shipped, you will receive an email and/or SMS
              with your tracking details. You can track your order status using
              the tracking link provided.
            </p>
          </div>

          {/* Delays */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-3">Possible Delays</h2>
            <p className="text-gray-400">
              While we do our best to deliver on time, delays may occur due to
              bad weather, festivals, strikes, or other unforeseen events. We
              will keep you updated in case of such delays.
            </p>
          </div>

          {/* Contact Support */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-3">Need Help?</h2>
            <p className="text-gray-300">
              If you have questions about your shipment, feel free to contact us
              at{" "}
              <a
                href="mailto:support@shopovix.store"
                className="text-blue-400 underline"
              >
                support@shopovix.store
              </a>{" "}
              or visit our{" "}
              <a href="/contact" className="text-blue-400 underline">
                Contact Us
              </a>{" "}
              page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

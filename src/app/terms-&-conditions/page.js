// app/terms/page.jsx  (or pages/terms.js)
"use client";
import React from "react";

export default function Terms() {
  return (
    <main className="min-h-screen bg-gradient-to-b  px-6 md:px-20 py-16">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Terms &amp; Conditions</h1>
          <p className="text-gray-600">Last updated: <span className="font-medium">September 18, 2025</span></p>
        </header>

        <section className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl text-black font-semibold mb-3">Welcome to Shopovix</h2>
          <p className="text-gray-700 leading-relaxed">
            These Terms &amp; Conditions govern your use of the Shopovix website and services.
            By using our website or placing an order you agree to be bound by these terms.
          </p>
        </section>

        <section className="bg-white text-black rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-semibold mb-3">1. Orders &amp; Pricing</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>All prices are displayed in INR and are inclusive/exclusive of taxes as stated on the site.</li>
            <li>We reserve the right to refuse or cancel orders for certain reasons including incorrect pricing or product unavailability.</li>
            <li>Order confirmation email does not guarantee order acceptance — acceptance happens when we dispatch the product.</li>
          </ul>
        </section>

        <section className="bg-white text-black rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-semibold mb-3">2. Payments</h3>
          <p className="text-gray-700 leading-relaxed">
            We accept multiple payment methods including Cards, UPI, Netbanking and Cash on Delivery where applicable.
            Payment for COD orders must be made in full at the time of delivery.
          </p>
        </section>

        <section className="bg-white text-black rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-semibold mb-3">3. Shipping &amp; Delivery</h3>
          <p className="text-gray-700 leading-relaxed">
            Delivery estimates are provided for guidance only. We are not responsible for delays caused by third-party carriers or force majeure events.
          </p>
        </section>

        <section className="bg-white text-black rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-semibold mb-3">4. Returns &amp; Refunds</h3>
          <p className="text-gray-700 leading-relaxed">
            Our Returns &amp; Exchange policy applies. Please ensure items are returned in original condition. Refunds will be processed after inspection.
          </p>
        </section>

        <section className="bg-white text-black rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-semibold mb-3">5. Intellectual Property</h3>
          <p className="text-gray-700 leading-relaxed">
            All content on this site (text, images, logos) is the property of Shopovix or its licensors and is protected by applicable laws.
            You may not reproduce or use our content without prior written permission.
          </p>
        </section>

        <section className="bg-white text-black rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-semibold mb-3">6. Limitation of Liability</h3>
          <p className="text-gray-700 leading-relaxed">
            To the maximum extent permitted by law, Shopovix will not be liable for indirect or consequential losses arising from use of the website.
          </p>
        </section>

        <section className="bg-white text-black rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-semibold mb-3">7. Changes to Terms</h3>
          <p className="text-gray-700 leading-relaxed">
            We may modify these Terms &amp; Conditions from time to time. Changes will be posted on this page with a revised &quot;Last updated&quot; date.
          </p>
        </section>

        <section className="bg-white text-black rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <p className="text-gray-700 leading-relaxed">
            For questions about these Terms, email us at{" "}
            <a href="mailto:example@gmail.com" className="text-red-600 underline">example@gmail.com</a>.
          </p>
        </section>
      </div>
    </main>
  );
}

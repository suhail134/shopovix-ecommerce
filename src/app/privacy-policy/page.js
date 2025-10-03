// app/privacy/page.jsx  (or pages/privacy.js)
"use client";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-b   px-6 md:px-20 py-16">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: <span className="font-medium">September 18, 2025</span></p>
        </header>

        <section className="bg-white text-black rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            Shopovix ("we", "our", "us") is committed to protecting your privacy. This policy explains how we collect, use, and protect your personal data.
          </p>
        </section>

        <section className="bg-white text-black rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-semibold mb-3">1. Information We Collect</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Contact information (name, email, phone) you provide when creating an account or placing an order.</li>
            <li>Order details and shipping address required to fulfill purchases.</li>
            <li>Payment information processed securely via third-party payment gateways (we do not store raw card details).</li>
            <li>Usage data such as pages visited, device information, and cookies to improve the site experience.</li>
          </ul>
        </section>

        <section className="bg-white text-black rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-semibold mb-3">2. How We Use Your Data</h3>
          <p className="text-gray-700 leading-relaxed">
            We use your data to process orders, communicate updates, provide customer support, and improve our services. Marketing emails are sent only with your consent and you can unsubscribe anytime.
          </p>
        </section>

        <section className="bg-white text-black rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-semibold mb-3">3. Cookies &amp; Tracking</h3>
          <p className="text-gray-700 leading-relaxed">
            We use cookies and similar technologies to personalise content, analyze traffic, and remember your preferences. You can manage cookie settings from your browser.
          </p>
        </section>

        <section className="bg-white text-black rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-semibold mb-3">4. Data Sharing &amp; Security</h3>
          <p className="text-gray-700 leading-relaxed">
            We may share data with trusted third parties (logistics, payment gateways, analytics) only to the extent necessary to provide services. We follow reasonable security practices to protect your information.
          </p>
        </section>

        <section className="bg-white text-black rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-semibold mb-3">5. Your Rights</h3>
          <p className="text-gray-700 leading-relaxed">
            You have the right to access, correct, or delete your personal data. For requests, contact us at{" "}
            <a href="mailto:example@gmail.com" className="text-red-600 underline">example@gmail.com</a>.
          </p>
        </section>

        <section className="bg-white text-black rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <p className="text-gray-700 leading-relaxed">
            If you have questions about this policy, please email{" "}
            <a href="mailto:example@gmail.com" className="text-red-600 underline">example@gmail.com</a>.
          </p>
        </section>
      </div>
    </main>
  );
}

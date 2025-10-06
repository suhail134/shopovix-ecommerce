"use client";
import { useState } from "react";

const FAQs =() =>{
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Shopovix?",
      answer:
        "Shopovix is your one-stop destination for premium quality products at the best prices. We focus on making online shopping simple, fast, and affordable.",
    },
    {
      question: "Do you offer Cash on Delivery (COD)?",
      answer:
        "Yes! We offer COD on most products so you can shop with confidence and pay once you receive your order.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery usually takes 3-7 working days depending on your location. You will receive a tracking link after your order is shipped.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 7-day easy return policy. If you are not satisfied with the product, you can request a return or replacement easily.",
    },
    {
      question: "Are the products genuine?",
      answer:
        "Absolutely! All our products go through strict quality checks to ensure authenticity and durability.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can email us at example@gmail.com or reach out via our Instagram handle @ardsuhail for quick assistance.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
    <main className="min-h-screen bg-gradient-to-b  py-16 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold  tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          Have questions? We’ve got answers. Here are the most common queries
          about Shopovix.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-5 transition-all duration-300 hover:shadow-xl"
          >
            <button
              className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-800 focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="text-gray-500">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <p className="mt-3 text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
    </>
  );
}
    


export default FAQs

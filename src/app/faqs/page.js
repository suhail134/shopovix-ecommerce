import React from 'react'
import FAQs from '@/component/FAQs'
const page = () => {
  return (
    <div>
      <FAQs/>
    </div>
  )
}

export default page


export const metadata = {
  title: "Shopovix - FAQs",
  description: "Find answers to the most common questions about Shopovix, including payments, shipping, returns, and more.",
  keywords: ["Shopovix", "FAQs", "Frequently Asked Questions", "Help", "Support"],
  authors: [{ name: "Shopovix Team", url: "https://shopovix-ecommerce-wyzu.vercel.app" }],
  openGraph: {
    title: "Shopovix - FAQs",
    description: "Find answers to the most common questions about Shopovix, including payments, shipping, returns, and more.",
    url: "https://shopovix-ecommerce-wyzu.vercel.app/faqs",
    siteName: "Shopovix",
    images: [
      {
        url: "/og-faqs.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopovix - FAQs",
    description: "Find answers to the most common questions about Shopovix, including payments, shipping, returns, and more.",
    images: ["/og-faqs.png"],
    creator: "@ardsuhail",
  },
};



import React from 'react'
import Collections from '@/component/Collections'
const page = () => {
  return (
    <div>
      <Collections/>
    </div>
  )
}

export default page


export const metadata = {
  title: "Shopovix - Collections",
  description: "Explore all product collections at Shopovix. Find the best deals on electronics, fashion, home essentials, and more.",
  keywords: ["Shopovix", "Collections", "Products", "Deals", "Electronics", "Fashion", "Home Essentials"],
  authors: [{ name: "Shopovix Team", url: "https://shopovix-ecommerce-wyzu.vercel.app" }],
  openGraph: {
    title: "Shopovix - Collections",
    description: "Explore all product collections at Shopovix. Find the best deals on electronics, fashion, home essentials, and more.",
    url: "https://https://shopovix-ecommerce-wyzu.vercel.app/collection",
    siteName: "Shopovix",
    images: [
      {
        url: "/og-collections.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopovix - Collections",
    description: "Explore all product collections at Shopovix. Find the best deals on electronics, fashion, home essentials, and more.",
    images: ["/og-collections.png"],
    creator: "@ardsuhail",
  },
};

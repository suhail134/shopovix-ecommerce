import CheckOut from '@/component/CheckOut'

import React from 'react'

const page = () => {
  return (
    <div>
      <CheckOut/>
    </div>
  )
}

export default page

export const metadata = {
  title: "Shopovix - Checkout",
  description: "Complete your order securely at Shopovix. Review your cart, enter shipping details, and make payment safely.",
  keywords: ["Shopovix", "Checkout", "Secure Payment", "Online Shopping", "Cart"],
  authors: [{ name: "Shopovix Team", url: "https://shopovix-ecommerce-wyzu.vercel.app" }],
  openGraph: {
    title: "Shopovix - Checkout",
    description: "Complete your order securely at Shopovix. Review your cart, enter shipping details, and make payment safely.",
    url: "https://shopovix-ecommerce-wyzu.vercel.app/checkout",
    siteName: "Shopovix",
    images: [
      {
        url: "/og-checkout.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopovix - Checkout",
    description: "Complete your order securely at Shopovix. Review your cart, enter shipping details, and make payment safely.",
    images: ["/og-checkout.png"],
    creator: "@ardsuhail",
  },
};

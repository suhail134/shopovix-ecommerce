import React from 'react'
import Link from 'next/link'
const Page = () => {


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 py-10">
      
      {/* Create New Collection Section */}
      <div className="flex justify-center sm:justify-end mb-8">
        <Link href="/admin/collections/create-collection">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-300">
            ➕ Create New Collection
          </button>
        </Link>
      </div>

      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-lg">
          Your Collections
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          Manage and organize your product categories easily from here.
        </p>
      </div>

      {/* Your Collection Button */}
      <div className="flex justify-center">
        <Link href="/admin/collections/Your-collections">
          <button className="bg-gray-800 px-5 py-2 rounded-lg border border-gray-700 hover:border-purple-500 hover:bg-gray-700 hover:shadow-lg transition-all duration-300">
            📂 View Your Collections
          </button>
        </Link>
      </div>

      {/* Optional: Empty State / Info Section */}
      <div className="mt-12 text-center text-gray-500">
        <p className="text-sm">
          You can create different collections for different product categories.
        </p>
        <p className="text-xs mt-1 italic">
          (Collections will appear here once you create them.)
        </p>
      </div>

    </div>
  )
}

export default Page



export const metadata = {
  title: "Shopovix - Your Collection",
  description: "Manage and view all product collections in your Shopovix store. Add, edit, or remove collections easily from the admin panel.",
  keywords: ["Shopovix", "Admin", "Collections", "Manage Products", "Store Admin"],
  authors: [{ name: "Shopovix Admin", url: "https://shopovix-ecommerce-wyzu.vercel.app" }],
  openGraph: {
    title: "Shopovix - Your Collection",
    description: "Manage and view all product collections in your Shopovix store. Add, edit, or remove collections easily from the admin panel.",
    url: "https://shopovix-ecommerce-wyzu.vercel.app/admin/collections",
    siteName: "Shopovix Admin",
    images: [
      {
        url: "/og-admin-collections.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopovix - Your Collection",
    description: "Manage and view all product collections in your Shopovix store. Add, edit, or remove collections easily from the admin panel.",
    images: ["/og-admin-collections.png"],
    creator: "@ardsuhail",
  },
};

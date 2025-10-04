"use client"
// export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";
// export const revalidate = 0;
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Loader } from "lucide-react";
import { Suspense } from 'react'

const Page = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get("id");
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (productId) {
      // Edit mode → product fetch karo
      fetch(`/api/products/${productId}`)
        .then((res) => res.json())
        .then((data) => setProducts(data.product));
    }
  }, [productId]);

  useEffect(() => {
    fetch("/api/products") // ✅ API se products la rahe
      .then(res => res.json())
      .then(data => {
        setProducts(data.products)
        setLoading(false);
      })
  }, [])
  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }
    fetch(`/api/products/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Product deleted successfully");
          setProducts(products.filter(p => p._id !== id));
        } else {
          alert(data.message || "Failed to delete product");
        }
      })
      .catch(err => alert("Error: " + err.message));

  }
  const handleEdit = (id) => {
    // Add page me product ka id pass kar do
    router.push(`/admin/products/add?id=${id}`);
  };




  const filteredProducts = products.filter((item) =>
    item?.product_title?.toLowerCase().includes(search.toLowerCase()) || item?.product_desc?.toLowerCase().includes(search.toLowerCase()) || item?.category?.toLowerCase().includes(search.toLowerCase()) || item?._id?.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-96"> <Loader className="animate-spin w-12 h-12 text-blue-500" /> </div>}>
    <div className="p-6">

      {/* HEADER */}
    {loading ? (
            <div className="flex justify-center items-center h-96">
              <Loader className="animate-spin w-12 h-12 text-blue-500" />
            </div>
          ) : (<>   <div className="flex justify-between items-center mb-6 p-5 bg-gray-800 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-white">Products</h1>
        <Link href="/admin/products/add">
          <button className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md">
            ➕ Add New Product
          </button>
        </Link>
      </div>
      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search by productID,desc,title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
            {search.trim() && (
        <div className="mt-2 bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-2 text-center">
          <p className="text-indigo-700 font-medium">
            {filteredProducts.length > 0
              ? `${filteredProducts.length} result${filteredProducts.length > 1 ? "s" : ""} matched`
              : "0 results found"}
          </p>
        </div>
      )}
      {/* PRODUCT GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map(product => (
          <div
            key={product._id}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-5 flex flex-col hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 border border-gray-700"
          >
            {/* IMAGE */}
            <div className="h-52 w-full overflow-hidden rounded-xl mb-4 group relative">
              <img
                src={product.product_image[0]?.url || product.product_image[1]?.url || "/placeholder.png"}
                alt={product.product_title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </div>

            {/* TITLE */}
            <h2 className="text-2xl font-bold text-white tracking-tight line-clamp-1">
              {product.product_title}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-400 text-sm line-clamp-2 mt-1 leading-relaxed">
              {product.product_desc}
            </p>

            {/* PRICE */}
            <div className="flex justify-between items-center mt-3">
              <p className="text-green-400 font-extrabold text-xl">
                ₹{product.product_price}
              </p>
              {product.comparision_price && (
                <p className="line-through text-gray-500 text-base">
                  ₹{product.comparision_price}
                </p>
              )}
            </div>

            {/* CATEGORY */}
            <p className="mt-2 text-sm text-gray-300">
              <span className="font-semibold text-green-400 text-base">Category:</span>{" "}
              {product.category}
            </p>
            <p className="text-sm font-semibold text-gray-400">
              Product ID:  #{product._id.slice(-6)}
            </p>
            {/* EDIT BUTTON */}
            <button
              className="mt-4 w-full cursor-pointer bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold px-4 py-2 rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => handleEdit(product._id)}
            >
              ✏️ Edit Product
            </button>

            {/* DELETE BUTTON */}
            <div className="remove-product">
              <button
                onClick={() => handleDelete(product._id)}
                className="mt-3 w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold px-4 py-2 cursor-pointer rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                🗑 Delete Product
              </button>
            </div>
          </div>

        ))}
      </div></>)}
    </div>
</Suspense>
  )
}

export default Page

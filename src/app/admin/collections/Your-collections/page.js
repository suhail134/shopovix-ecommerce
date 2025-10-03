"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";

const Page = () => {
  const [collections, setCollections] = useState([]); // ✅ better naming
  const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams();
  const router = useRouter();
  const collectionId = searchParams.get("id");
  const category = searchParams.get("category");

   useEffect(() => {
      if (collectionId) {
        // Edit mode → product fetch karo
        fetch(`/api/collection/${collectionId}`)
          .then((res) => res.json())
          .then((data) => setCollections(data.collections));
      }
    }, [collectionId]);

  // ✅ Fetch All Collections
  useEffect(() => {
    fetch("/api/collection")
      .then((res) => res.json())
      .then((data) => {
        setCollections(data.collection)
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching collections:", err));
  }, []);

  // ✅ Filter by category if present
  const filteredCollection = category
    ? collections.filter(
        (col) => col.category === decodeURIComponent(category)
      )
    : collections;

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this collection?")) return;

    try {
      const res = await fetch(`/api/collection/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        alert("Collection deleted successfully ✅");
        setCollections((prev) => prev.filter((col) => col._id !== id)); // ✅ update UI
      } else {
        alert(data.message || "Failed to delete collection ❌");
      }
    } catch (error) {
      alert("Error deleting collection: " + error.message);
    }
  };

  // ✅ Handle Edit → Push to Create/Edit Page
  const handleEdit = (id) => {
    router.push(`/admin/collections/create-collection?id=${id}`);
  };
   const filteredCollections = filteredCollection.filter((item) =>
  item?.collectionId?.toLowerCase().includes(search.toLowerCase()) ||
  item?.collection_desc?.toLowerCase().includes(search.toLowerCase()) ||
  item?.category?.toLowerCase().includes(search.toLowerCase()) ||
  item?.collection_title?.toLowerCase().includes(search.toLowerCase()) ||
  item?._id?.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-6">
      {/* Header Section */}
     {loading ? (
        <div className="flex justify-center items-center h-96">
          <Loader className="animate-spin w-12 h-12 text-blue-500" />
        </div>
      ) : (<> <div className="flex flex-col sm:flex-row justify-between items-center mb-10 p-6 bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-800">
        <h1 className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
          🗂 Manage Collections
        </h1>
        <Link href="/admin/collections/create-collection">
          <button className="mt-4 cursor-pointer sm:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-2xl font-medium shadow-lg hover:shadow-purple-500/30 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 ease-out">
            ➕ Create New
          </button>
        </Link>
      </div>

        <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search by title,desc,category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Collections Grid */}
      {filteredCollection.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCollections.map((col) => (
            <div
              key={col._id}
              className="group border border-gray-800 rounded-3xl shadow-lg bg-gray-900/60 backdrop-blur-xl hover:shadow-purple-500/20 hover:border-purple-500 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={col.collection_image}
                  alt={col.collection_title}
                  className="object-cover w-full h-52 rounded-t-3xl group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center p-3">
                  <span className="text-xs text-gray-300 italic">
                    View Details
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold mb-1 text-white group-hover:text-purple-400 transition-colors">
                  <b className="text-yellow-500" > Title:</b> {col.collection_title}
                  </h2>
                  <p className="text-gray-400 mb-3 text-sm line-clamp-2 leading-relaxed">
                  <b className="text-yellow-500" > Description:</b>  {col.collection_desc}
                  </p>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Category:{" "}
                    <span className="text-purple-300">{col.category}</span>
                  </p>
                  <p className="text-lg font-semibold text-gray-500">
                     collection ID: #{col._id.slice(-6)}
                  </p>
                </div>
                <button
                  onClick={() => handleEdit(col._id)}
                  className="mt-4 cursor-pointer w-full bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
                >
                  ✏️ Edit Collection
                </button>

                <button
                  onClick={() => handleDelete(col._id)}
                  className="mt-4 cursor-pointer w-full bg-red-600 text-white py-2 rounded-xl font-medium hover:bg-red-700 hover:shadow-lg transition-all duration-300"
                >
                  🗑 Delete Collection
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-16 text-lg">
          No collections found. Create one to get started!
        </div>
      )}</>)}
    </div>
  );
};

export default Page;

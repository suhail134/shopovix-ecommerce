"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const AdminDashboard = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [collection, setCollection] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const token = localStorage.getItem("notlogin");
            if (!token) {
                router.replace("/");
            } else {
                setLoading(false);
            }
        }, 50);
        return () => clearTimeout(timer);
    }, [router]);

    useEffect(() => {
        fetch("/api/collection")
            .then(res => res.json())
            .then(data => setCollection(data.collection || []));
    }, []);
 useEffect(() => {
    fetch("/api/allOrders")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.allorders) {
          setOrders(data.allorders);
           setLoading(false);
        } else {
          setOrders([]);
        }
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

    useEffect(() => {
        fetch("/api/products")
            .then(res => res.json())
            .then(data => setProducts(data.products || []));
    }, []);

    // COD orders count
    const codOrders = orders.filter(order => order.paymentMethod === "COD");
    // // ONLINE orders count
    const onlineOrders = orders.filter(order => order.paymentMethod === "ONLINE");



    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-8">
            <style jsx global>{`
                html, body { overflow-x: hidden !important; }
            `}</style>
            {loading ? (
                <div className="flex justify-center items-center h-96">
                    <Loader className="animate-spin w-12 h-12 text-blue-500" />
                </div>
            ) : (
                <>
                    <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 text-transparent bg-clip-text">
                            🛒 Admin Dashboard
                        </h1>
                    </header>

                    {/* Main Content Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-6 rounded-2xl shadow-xl hover:scale-[1.03] transition cursor-pointer"
                            onClick={() => router.push("/admin/products/add")}>
                            <h2 className="text-xl font-semibold mb-2">➕ Add Product</h2>
                            <p className="text-gray-300 text-sm">
                                Add new products with images, title, price, and description.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 p-6 rounded-2xl shadow-xl hover:scale-[1.03] transition cursor-pointer"
                            onClick={() => router.push("/admin/products")}>
                            <h2 className="text-xl font-semibold mb-2">All Products</h2>
                            <p className="text-gray-300 text-sm">
                                View and manage all products in your store.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 p-6 rounded-2xl shadow-xl hover:scale-[1.03] transition cursor-pointer"
                            onClick={() => router.push("/admin/collections")}>
                            <h2 className="text-xl font-semibold mb-2">📂 Manage Collections</h2>
                            <p className="text-gray-300 text-sm">
                                Create and manage product collections easily.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 p-6 rounded-2xl shadow-xl hover:scale-[1.03] transition cursor-pointer"
                            onClick={() => router.push("/admin/orders")}>
                            <h2 className="text-xl font-semibold mb-2">📦 Orders</h2>
                            <p className="text-gray-300 text-sm">
                                View and manage all customer orders from one place.
                            </p>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="mt-2 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 p-6 rounded-2xl shadow-2xl">
                        <h2 className="text-2xl font-bold mb-6 text-blue-300">📊 Store Overview</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
                            <div className="bg-gray-900 p-4 rounded-xl shadow">
                                <h3 className="text-2xl font-extrabold text-blue-400">{products.length}</h3>
                                <p className="text-gray-400">Products</p>
                            </div>
                            <div className="bg-gray-900 p-4 rounded-xl shadow">
                                <h3 className="text-2xl font-extrabold text-purple-400">{collection.length}</h3>
                                <p className="text-gray-400">Collections</p>
                            </div>
                            <div className="bg-gray-900 p-4 rounded-xl shadow">
                                <h3 className="text-2xl font-extrabold text-green-400">{orders.length}</h3>
                                <p className="text-gray-400">Total Orders</p>
                            </div>
                            <div className="bg-gray-900 p-4 rounded-xl shadow">
                                <h3 className="text-2xl font-extrabold text-yellow-400">{codOrders.length}</h3>
                                <p className="text-gray-400">COD Orders</p>
                            </div>
                            <div className="bg-gray-900 p-4 rounded-xl shadow">
                                <h3 className="text-2xl font-extrabold text-pink-400">{onlineOrders.length}</h3>
                                <p className="text-gray-400">Online Orders</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;
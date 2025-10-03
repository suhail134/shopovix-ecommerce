"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, PlusCircle, Box, Layers, ShoppingCart, Users, UserCheck, Settings,MessageCircle } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { set } from "mongoose";

const AdminSidebar = ({ adminSidebar, setAdminSidebar }) => {
  const pathName = usePathname();
  const router = useRouter();
  const [token, setToken] = useState(null);
  const ref=useRef()

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { href: "/admin/products/add", label: "Add New Product", icon: <PlusCircle size={20} /> },
    { href: "/admin/products", label: "Your Products", icon: <Box size={20} /> },
    { href: "/admin/collections/create-collection", label: "Create Collection", icon: <Layers size={20} /> },
    { href: "/admin/collections/Your-collections", label: "All Collections", icon: <Layers size={20} /> },
    { href: "/admin/orders", label: "All Orders", icon: <ShoppingCart size={20} /> },
    { href: "/admin/customer-inqueries", label: "Customer Inquiries", icon: <Users size={20} /> },
    { href: "/admin/subscriber", label: "Subscribers", icon: <UserCheck size={20} /> },
    { href: "/admin/review", label: "Review", icon: <MessageCircle size={20} /> },
    // { href: "/admin/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  useEffect(() => {
    const t = localStorage.getItem("notlogin");
    setToken(t);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("notlogin");
    setToken(null); // state update for immediate UI change
    setAdminSidebar(false); // sidebar close
    router.push("/");
    window.location.href="/" // redirect to home
  };

  
  useEffect(() => {
    const click=() => {
      if(ref.current && !ref.current.contains(event.target))
        setAdminSidebar(null)     
    }
    document.addEventListener("mousedown",click)
    return()=> document.removeEventListener("mousedown",click)
   
  }, [setAdminSidebar])
  
useEffect(() => {
  setAdminSidebar(false);

}, [pathName, setAdminSidebar]);


  if (!token) return null; // token na ho to sidebar hide ho

  return (
    <div ref={ref}
      className={`fixed right-0 top-0 h-screen w-72 sm:w-[60vw] md:w-[60vw] lg:w-[30vw] bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl z-50 transform transition-transform duration-500 ease-in-out  ${adminSidebar ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-full" />
          <div>
            <h2 className="text-lg font-bold">Shopovix</h2>
            <p className="text-sm text-gray-400">Admin Panel</p>
          </div>
        </div>
        <button
          onClick={() => setAdminSidebar(false)}
          className="bg-white rounded-lg cursor-pointer transition-colors text-2xl font-bold"
        >
          <img src="/admin-r-sidebar.svg" alt="close sidebar" className="z-10" />
        </button>
      </div>

      {/* Nav Links */}
      {/* Nav Links */}
<div className="flex flex-col mt-6 px-3 gap-2 h-[calc(100vh-96px)] overflow-y-auto">
  <div className="flex flex-col gap-2 pr-2">
    {navItems.map((item) => {
      const active = pathName === item.href;
      return (
        <Link key={item.href} href={item.href}>
          <div
            className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
              active ? "bg-blue-600 shadow-lg" : "hover:bg-gray-700 hover:shadow-md"
            }`}
          >
            <span className="text-white">{item.icon}</span>
            <span className={`font-semibold ${active ? "text-white" : "text-gray-200"}`}>
              {item.label}
            </span>
          </div>
        </Link>
      );
    })}

    {/* Logout Button */}
    <button
      className="bg-red-500 cursor-pointer active:bg-red-500 hover:bg-red-300 text-white px-3 h-12 mb-10 flex justify-center items-center py-1 rounded-lg scale-105 transition transform text-lg"
      onClick={handleLogout}
    >
      Logout
    </button>
  </div>

  {/* Custom Scrollbar */}
  <style jsx>{`
    div::-webkit-scrollbar {
      width: 8px;
    }
    div::-webkit-scrollbar-track {
      background: #1f2937; /* Tailwind gray-900 */
      border-radius: 8px;
    }
    div::-webkit-scrollbar-thumb {
      background: #374151; /* Tailwind gray-700 */
      border-radius: 8px;
    }
    div::-webkit-scrollbar-thumb:hover {
      background: #2563eb; /* Blue-600 hover */
    }
  `}</style>
</div>

    </div>
  );
};

export default AdminSidebar;

"use client";
import Navbar from "@/component/Navbar";
import Sidebar from "@/component/Sidebar";
import { useCart } from "@/component/CartContext";
import AdminSidebar from "@/component/AdminSidebar"
import MobileNavSlider from "./MobileNavSlider";

export default function Clientlayout({ children }) {
  const { cart, sidebarOpen,setNavSidebar,navSidebar, setSidebarOpen,setAdminSidebar,adminSidebar, addToCart,removeFromCart,deleteAllitems } = useCart();
  return (
    <>
      <Navbar setSidebarOpen={setSidebarOpen} />
       <AdminSidebar adminSidebar={adminSidebar} setAdminSidebar={setAdminSidebar} />
      <Sidebar cart={cart} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  />
      <MobileNavSlider navSidebar={navSidebar} setNavSidebar={setNavSidebar}   />
      <main>{children}</main>
    </>
  );
}

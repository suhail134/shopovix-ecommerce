"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, Contact, ShoppingCartIcon, ShieldQuestion, Box, ab, Layers, ShoppingCart, Users, UserCheck, Settings, InfoIcon, User } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
const MobileNavSlider = ({ navSidebar, setNavSidebar }) => {
  const pathName = usePathname();
  const { data: session } = useSession()
  const ref = useRef()
  const router = useRouter()
  const navItems = [
    { href: "/", label: "Home", icon: <Home size={20} /> },
    { href: "/about-Us", label: "About Us", icon: <InfoIcon size={20} /> },
    { href: "/contact", label: "Contact Us", icon: <Contact size={20} /> },
    { href: "/product", label: "Shop", icon: <ShoppingCartIcon size={20} /> },
    { href: "/collection", label: "Collections", icon: <Layers size={20} /> },
    { href: "/faqs", label: "FAQs", icon: <ShieldQuestion size={20} /> },
    { href: "/user", label: "My Account", icon: <User size={20} /> },

    // { href: "/admin/customer-inqueries", label: "Customer Inquiries", icon: <Users size={20} /> },
    // { href: "/admin/subscriber", label: "Subscribers", icon: <UserCheck size={20} /> },
    // { href: "/admin/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  useEffect(() => {
    const click = () => {
      if (ref.current && !ref.current.contains(event.target))
        setNavSidebar(null)
    }
    document.addEventListener("mousedown", click)
    return () => document.removeEventListener("mousedown", click)
  }, [])

  useEffect(() => {
    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      endX = e.changedTouches[0].clientX;
      const diffX = endX - startX;

      // Swipe left to close
      if (navSidebar && diffX < -50) {
        setNavSidebar(false);
      }

      // Swipe right to open (optional)
      // if (!NavSidebar && diffX > 50) {
      //   setNavSidebar(true);
      // }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [navSidebar]);

const handleAccountClick = () => {
  if(session){
    router.push("/user");
  } else {
    alert("Please sign in first!");
  }
}

  useEffect(() => {
    // Page change hote hi sidebar band
    setNavSidebar(false);
  }, [pathName]);


  return (
    <div ref={ref}
      className={`fixed  left-[-10] top-0 h-screen w-60 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${navSidebar ? "translate-x-[0%]" : "translate-x-[-100%]"
        }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-full" />
          <div>
            <h2 className="text-lg font-bold">Shopovix</h2>
            <p className="text-sm text-gray-400">Navigation Links</p>
          </div>
        </div>
        <button
          onClick={() => setNavSidebar(false)}
          className=" bg-white rounded-lg cursor-pointer  transition-colors text-2xl font-bold"
        >
          <img className="z-10  " src="/admin-r-sidebar.svg" alt="close sidebar" />
        </button>
      </div>

      {/* Nav Links */}
      <div className="flex flex-col text-[12px] mt-6 px-3 gap-2">
        {navItems.map((item) => {
          const active = pathName === item.href;

          // Check for My Account specifically
          if (item.label === "My Account") {
            return (
              <div
                key={item.href}
                onClick={handleAccountClick}
                className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 ${active ? "bg-blue-600 shadow-lg" : "hover:bg-gray-700 hover:shadow-md"
                  }`}
              >
                <span className="text-white">{item.icon}</span>
                <span className={`font-semibold ${active ? "text-white" : "text-gray-200"}`}>
                  {item.label}
                </span>
              </div>
            );
          }

          // For other nav items, normal Link
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 ${active ? "bg-blue-600 shadow-lg" : "hover:bg-gray-700 hover:shadow-md"
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


      </div>
    </div>
  );
};

export default MobileNavSlider;

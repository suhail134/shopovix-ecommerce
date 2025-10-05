"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/component/CartContext";
import ThemeToggle from "./Theme";
import Searchbar from "./Searchbar";
import { Hamburger, SidebarOpen, Settings, Grid, LayoutDashboard, UserCog, ShieldCheck } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react"

import Image from "next/image";

const Navbar = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const { setSidebarOpen, setAdminSidebar, setNavSidebar } = useCart();
  const router = useRouter();
  const { data: session } = useSession()

  useEffect(() => {
    const t = localStorage.getItem("notlogin");
    setToken(t);
    setLoading(false);
    // if (!t) router.replace("/");
  }, [router]);

  if (loading) return null;

  return (
    <nav className="bg-slate-100 sm:h-32 h-37 shadow-md w-full z-50 backdrop-blur-md px-4 lg:px-10 py-3">
      {/* UPPER LINE: Hamburger - Logo - Cart/User */}
      {/* <div className="flex items-center justify-between mb-2">
        {/* Hamburger for mobile */}
      {/* <div className="sm:hidden">
          <button className="relative top-2" onClick={() => setNavSidebar(true)}>
            <SidebarOpen className="text-gray-700" size={30} />
          </button>
        </div> */}
      <div className="flex items-center justify-between mb-2">
        {/* Hamburger for mobile */}
        <div className="sm:hidden">
          <button onClick={() => setNavSidebar(true)}>
            <SidebarOpen className="text-gray-700" size={30} />
          </button>
        </div>

        {/* Logo center */}
        <div className="flex-1  w-[20vw] cursor-pointer relative lg:bottom-1 lg:justify-start sm:justify-start flex justify-center">
          <Link href={"/"} className="flex-shrink-0  z-30 ">
            <img className="w-28 sm:w-28 rounded-lg" src="/logo.png" alt="logo" />
          </Link>
        </div>

        {/* Cart + User icons */}
        
        <p className="z-50"  > <ThemeToggle /></p>
        <div className=" relative sm:bottom-2 flex items-center z-20 " >
          <button onClick={() => setSidebarOpen(true)} className="  sm:left-0 left-1 top-3 relative  cursor-pointer  ">
            <img className="w-12 sm:w-9.5 p-2 relative bottom-1 rounded-full hover:bg-gray-200 transition " src="/add-to-cart.svg" alt="cart" />
            <span className="text-xs  relative bottom-3 text-gray-800 ">Cart</span>
          </button>
          {session ? (
            <div>
              <Link href={"/user"} >
                <img className="w-9 h-9 rounded-full shadow-md hover:scale-105" src={session.user.image} alt={session.user.name} />
              </Link>
            </div>
          ) : (
            <Link href={"/login"} >
              <button className=" relative top-2 cursor-pointer  transition">
                <img className="w-12 p-2 rounded-full hover:bg-gray-200 sm:w-9.5" src="/account.svg" alt="account" />
                <span className="text-xs  relative bottom-2 text-gray-800 ">Login</span>
              </button>
            </Link>
          )}
        </div>

      </div>


      {/* //section devider */}
      <div className="bg-gray-300 relative sm:bottom-2 h-[1px] w-full my-2"></div>
      <div className="flex flex-wrap items-center justify-between mb-2">
        {/* Searchbar full width on mobile, max width on desktop */}
        <div className="flex-1 mb-2 sm:mb-0 flex sm:justify-center sm:items-center relative sm:bottom-19 min-w-[180px] sm:min-w-[300px]">
          <Searchbar />
        </div>

<div className="signup   ">
      {/* Admin Panel / Signup*/}
          <Link  href="/signUp" className=" bg-blue-600 text-white  px-4 py-2 rounded-lg hover:bg-blue-700 transition relative bottom-20 sm:right-40 md:right-40 flex gap-1 items-center">
          <button className="cursor-pointer" >SignUp</button>
          </Link>
       
</div>




        {/* Admin Panel / Logout + Admin Sidebar + Theme */}
        <div className="flex z-30 items-center gap-2">
          {!token ? (
            <Link href="/admin/login">
              <button className="cursor-pointer text-sm font-medium hover:text-blue-600">

                <div className="flex flex-col relative sm:bottom-17 sm:right-29 md:right-20 items-center">
                  <ShieldCheck className="text-gray-800" size={27} />
                  <span className="text-xs  text-gray-800 ">Admin</span>
                </div>

              </button>
            </Link>
          ) : (
            <>
              <div className="relative -top-2 sm:top-0 md:top-0 lg:-top-3 flex gap-3" >
                <button
                  onClick={() => setAdminSidebar(true)}
                  className="flex items-center justify-center cursor-pointer  bg-yellow-500 rounded-lg p-2 hover:bg-green-600 transition-all duration-300 shadow-md"
                >
                  <Image
                    className="object-contain"
                    width={24}
                    height={24}
                    alt="admin-sidebar"
                    src={"/admin-l-sidebar.svg"}
                  />
                </button>
              </div>
            </>
          )}

        </div>
      </div>

      {/* DIVIDER */}


      {/* PAGES NAV */}
      <div className="hidden sm:flex relative sm:bottom-15 justify-center">
        <ul className="flex gap-7 sm:py-0 py-3 flex-wrap">

          <li className="relative group">
            <Link
              href="/"
              className="text-gray-800 font-medium transition-all duration-300 group-hover:text-red-700"
            >
              Home
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>

          <li className="relative group">
            <Link
              href="/about-Us"
              className="text-gray-800 font-medium transition-all duration-300 group-hover:text-red-700"
            >
              About Us
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>

          <li className="relative group">
            <Link
              href="/contact"
              className="text-gray-800 font-medium transition-all duration-300 group-hover:text-red-700"
            >
              Contact
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>

          <li className="relative group">
            <Link
              href="/shop"
              className="text-gray-800 font-medium transition-all duration-300 group-hover:text-red-700"
            >
              Shop
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>

          <li className="relative group">
            <Link
              href="/collection"
              className="text-gray-800 font-medium transition-all duration-300 group-hover:text-red-700"
            >
              Collection
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>

          <li className="relative group">
            <Link
              href="/faqs"
              className="text-gray-800 font-medium transition-all duration-300 group-hover:text-red-700"
            >
              FAQs
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>

        </ul>
      </div>

    </nav>
    //     <nav className="bg-slate-100 shadow-md w-full z-50 backdrop-blur-md px-4 lg:px-10 py-3">
    //   {/* UPPER LINE: Hamburger - Logo - Cart/User */}
    //   <div className="flex items-center justify-between mb-2">
    //     {/* Hamburger for mobile */}
    //     <div className="sm:hidden">
    //       <button onClick={() => setNavSidebar(true)}>
    //         <SidebarOpen className="text-gray-700" size={30} />
    //       </button>
    //     </div>

    //     {/* Logo center */}
    //     <div className="flex-1 flex justify-center">
    //       <Link href={"/"}>
    //         <img className="w-28 sm:w-28 rounded-lg" src="/logo.png" alt="logo" />
    //       </Link>
    //     </div>

    //     {/* Cart + User + Theme */}
    //     <div className="flex items-center gap-2">
    //       <ThemeToggle />
    //       <button
    //         onClick={() => setSidebarOpen(true)}
    //         className="p-2 rounded-full hover:bg-gray-200 transition"
    //       >
    //         <img className="w-8 sm:w-7" src="/add-to-cart.svg" alt="cart" />
    //       </button>
    //       <button className="p-2 rounded-full hover:bg-gray-200 transition">
    //         <img className="w-8 sm:w-7" src="/account.svg" alt="account" />
    //       </button>
    //     </div>
    //   </div>

    //   {/* Divider */}
    //   <div className="bg-gray-300 h-[1px] w-full my-2"></div>

    //   {/* Search + Admin / Logout */}
    //   <div className="flex flex-wrap items-center justify-between gap-4">
    //     <div className="flex-1 max-w-md mx-auto">
    //       <Searchbar />
    //     </div>

    //     <div className="flex items-center gap-3">
    //       {!token ? (
    //         <Link href="/admin/login">
    //           <div className="flex flex-col items-center">
    //             <ShieldCheck className="text-gray-800" size={27} />
    //             <span className="text-xs text-gray-800">Admin</span>
    //           </div>
    //         </Link>
    //       ) : (
    //         <div className="flex gap-3">
    //           <button
    //             className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm"
    //             onClick={() => {
    //               localStorage.removeItem("notlogin");
    //               setToken(null);
    //               router.push("/");
    //             }}
    //           >
    //             Logout
    //           </button>
    //           <button
    //             onClick={() => setAdminSidebar(true)}
    //             className="flex items-center justify-center bg-yellow-500 rounded-lg p-2 hover:bg-green-600 transition-all shadow-md"
    //           >
    //             <Image
    //               className="object-contain"
    //               width={24}
    //               height={24}
    //               alt="admin-sidebar"
    //               src={"/admin-l-sidebar.svg"}
    //             />
    //           </button>
    //         </div>
    //       )}
    //     </div>
    //   </div>

    //   {/* Pages Nav */}
    //   <div className="hidden sm:flex justify-center mt-3">
    //     <ul className="flex gap-7">
    //       {["Home", "About Us", "Contact", "Shop", "Collection", "FAQs"].map((item, idx) => (
    //         <li key={idx} className="relative group">
    //           <Link
    //             href={`/${item.toLowerCase().replace(" ", "-")}`}
    //             className="text-gray-800 font-medium transition-all duration-300 group-hover:text-red-700"
    //           >
    //             {item}
    //             <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
    //           </Link>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </nav>

  );
};

export default Navbar;

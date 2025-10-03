"use client"

import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { LoaderCircle, User, ShoppingBag, Undo2, Star, Heart } from "lucide-react"
import Account from "@/component/Account"
import MyOrders from "@/component/MyOrders"
import MyReviews from "@/component/MyReviews"
import Wishlist from "@/component/Wishlist"
import { signOut } from "next-auth/react"
import ReturnAndCancel from "@/component/ReturnAndCancel"

const UserPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("account")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/") // agar user login nahi hai
    } else if (status === "authenticated") {
      setLoading(false)
    }
  }, [status, router])

  // Right column content
  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return <Account />
      case "orders":
        return <MyOrders />
      case "returns":
        return <ReturnAndCancel />
      case "reviews":
        return <MyReviews />
      case "wishlist":
        return <Wishlist />
      default:
        return <Account />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderCircle className="h-10 w-10 text-blue-600 animate-spin" />
      </div>
    )
  }

  return (
    <section className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-full md:w-[25%] bg-white shadow-lg flex flex-col p-4">
        <h2 className="font-bold text-xl text-gray-800 border-b pb-2">My Profile</h2>

        {/* Profile Card */}
        <div className="flex items-center gap-3 mt-4 p-3 bg-gray-50 rounded-xl shadow-sm">
          <img
            className="w-14 h-14 rounded-full hover:scale-105 shadow-md cursor-pointer transition"
            src={session.user.image}
            alt={session.user.name}
          />
          <div>
            <p className="text-sm text-gray-500">Hello,</p>
            <p className="font-semibold text-gray-800">{session.user.name}</p>
          </div>
        </div>

        {/* Menu Buttons */}
        <div className="flex flex-col md:gap-2 mt-6  space-y-2 md:space-y-0">
          <button
            onClick={() => setActiveTab("account")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${activeTab === "account"
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              }`}
          >
            <User className="h-5 w-5" /> My Account
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${activeTab === "orders"
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              }`}
          >
            <ShoppingBag className="h-5 w-5" /> My Orders
          </button>

          <button
            onClick={() => setActiveTab("returns")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${activeTab === "returns"
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              }`}
          >
            <Undo2 className="h-5 w-5" /> Return & Cancel
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${activeTab === "reviews"
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              }`}
          >
            <Star className="h-5 w-5" /> My Reviews
          </button>

          <button
            onClick={() => setActiveTab("wishlist")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${activeTab === "wishlist"
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              }`}
          >
            <Heart className="h-5 w-5" /> My Wishlist
          </button>

          <div className="mt-4">
            {session && (
              <button
                className="bg-red-500 w-full hover:bg-red-300 cursor-pointer text-white rounded-lg py-2 px-3 font-bold"
                onClick={() => signOut("google")}
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-[75%] p-4 md:p-6">
        <div className="bg-white h-full rounded-xl shadow-md p-4">
          {renderContent()}
        </div>
      </div>
    </section>
  )
}

export default UserPage

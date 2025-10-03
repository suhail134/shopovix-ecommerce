"use client"
import React from "react"
import { useSession } from "next-auth/react"
import { Info } from "lucide-react"

const Account = () => {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 text-lg">No account information found.</p>
      </div>
    )
  }

  const user = session.user

  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Personal Information
      </h2>

      {/* Profile Section */}
      <div className="rounded-2xl p-6 flex items-start gap-6">
        {/* Profile Image Left */}
        <div className="relative">
          <img
            src={user.image}
            alt={user.name}
            className="w-28 h-28 rounded-full border-4 border-gray-200 shadow-md"
          />
          <button className="absolute bottom-1 right-1 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition">
            <Info className="h-4 w-4" />
          </button>
        </div>

        {/* Details - Single Column */}
        <div className="flex-1 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              value={user.name || ""}
              readOnly
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50 text-gray-700 shadow-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={user.email || ""}
              readOnly
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50 text-gray-700 shadow-sm"
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Account

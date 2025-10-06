"use client"
import React, { useEffect, useState } from "react"
import { Mail, User, MessageSquare, Calendar,Loader } from "lucide-react"

const Page = () => {
  const [inqueries, setInqueries] = useState([])
  const [search, setSearch] = useState("")
      const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        setInqueries(data.contacts)
        setLoading(false);
      })
  }, [])

  const filteredInqueries = inqueries.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
    {loading ? (
           <div className="flex justify-center items-center h-96">
             <Loader className="animate-spin w-12 h-12 text-blue-500" />
           </div>
         ) : (<>   <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Customer Inquiries
      </h1>

   
      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInqueries.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg hover:shadow-xl transition rounded-2xl border border-gray-200 p-6"
          >
           
            <div className="flex items-center justify-between mb-4">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                <User className="w-5 h-5 text-indigo-600" /> {item.name}
              </h2>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  item.status === "Resolved"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {item.status || "Pending"}
              </span>
            </div>

           
            <p className="flex items-center gap-2 text-gray-600 mb-3">
              <Mail className="w-4 h-4 text-indigo-500" /> {item.email}
            </p>

           
            <div className="flex items-start gap-2 text-gray-700 mb-3">
              <MessageSquare className="w-4 h-4 text-indigo-500 mt-1" />
              <span>{item.message}</span>
            </div>

           
            {item.createdAt && (
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4 text-indigo-400" />{" "}
                {new Date(item.createdAt).toLocaleString()}
              </p>
            )}
          </div>
        ))}
      </div></>)}
    </div>
  )
}

export default Page

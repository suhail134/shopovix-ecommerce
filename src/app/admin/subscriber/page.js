"use client"
import React, { useEffect, useState } from "react"
import { Mail, Calendar, Loader } from "lucide-react"

const Page = () => {
  const [subscribers, setSubscribers] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    fetch("/api/subscribe")
      .then((res) => res.json())
      .then((data) => {
        setSubscribers(data.Subscribers)
        setLoading(false);
      })
  }, [])

  const filteredSubscribers = subscribers.filter((item) =>
    item.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      {loading ? (
             <div className="flex justify-center items-center h-96">
               <Loader className="animate-spin w-12 h-12 text-blue-500" />
             </div>
           ) : (<> <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Our Subscribers</h1>
        <p className="text-gray-500 mt-2">
          List of all users who subscribed to our newsletter.
        </p>
      </div>

    
      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search by email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubscribers.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md hover:shadow-lg transition rounded-xl border border-gray-200 p-6 flex flex-col justify-between"
          >
       
            <p className="flex items-center gap-2 text-gray-700 font-medium mb-3">
              <Mail className="w-4 h-4 text-indigo-500" /> {item.email}
            </p>

  
            {item.createdAt && (
              <p className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <Calendar className="w-4 h-4 text-indigo-400" />{" "}
                {new Date(item.createdAt).toLocaleString()}
              </p>
            )}

      
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 self-start">
              Active Subscriber
            </span>
          </div>
        ))}
      </div></>)}
    </div>
  )
}

export default Page

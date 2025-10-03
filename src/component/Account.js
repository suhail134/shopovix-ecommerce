// "use client"
// import React from "react"
// import { useSession, signOut } from "next-auth/react"
// import { LogOut, Info } from "lucide-react"

// const Account = () => {
//   const { data: session } = useSession()

//   if (!session) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <p className="text-gray-500 text-lg">No account information found.</p>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-3xl mx-auto w-full">
//       {/* Heading */}
//       <h2 className="text-2xl relative left-7 font-semibold text-gray-800 mb-6">
//         Personal Information
//       </h2>

//       {/* Profile Section */}
//       <div className="rounded-2xl ml-6 p-6">
//         {/* Profile Image + Edit */}
//         <div className="flex flex-col items-center">
//           <div className="relative">
//             <img
//               src={session.user.image}
//               alt={session.user.name}
//               className="w-28 h-28 rounded-full border-4 border-gray-200 shadow-md"
//             />
//             <button className="absolute bottom-1 right-1 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition">
//               <Info className="h-4 w-4" />
//             </button>
//           </div>
//           <button className="text-sm text-blue-600 mt-3 hover:underline">
//             Change Profile Information
//           </button>
//         </div>

//         {/* Details */}
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Name
//             </label>
//             <input
//               type="text"
//               value={session.user.name}
//               readOnly
//               className="w-full mt-2 px-4 py-2 border rounded-lg bg-gray-50 text-gray-700 shadow-sm"
//             />
//           </div>

//           {/* Date of Birth */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Date Of Birth
//             </label>
//             <input
//               type="text"
//               value="20/01/2022"
//               readOnly
//               className="w-full mt-2 px-4 py-2 border rounded-lg bg-gray-50 text-gray-700 shadow-sm"
//             />
//           </div>

//           {/* Gender */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Gender
//             </label>
//             <div className="flex items-center gap-6 mt-2">
//               <label className="flex items-center gap-2 text-gray-700">
//                 <input type="radio" checked readOnly />
//                 <span>Male</span>
//               </label>
//               <label className="flex items-center gap-2 text-gray-700">
//                 <input type="radio" readOnly />
//                 <span>Female</span>
//               </label>
//             </div>
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Phone Number
//             </label>
//             <div className="flex mt-2">
//               <span className="px-3 py-2 bg-gray-100 border rounded-l-lg text-gray-700">
//                 🇹🇷
//               </span>
//               <input
//                 type="text"
//                 value="+90-123456789"
//                 readOnly
//                 className="flex-1 px-4 py-2 border rounded-r-lg bg-gray-50 text-gray-700 shadow-sm"
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-600">
//               Email
//             </label>
//             <input
//               type="email"
//               value={session.user.email}
//               readOnly
//               className="w-full mt-2 px-4 py-2 border rounded-lg bg-gray-50 text-gray-700 shadow-sm"
//             />
//           </div>
//         </div>
//       </div>

     
//     </div>
//   )
// }

// export default Account


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

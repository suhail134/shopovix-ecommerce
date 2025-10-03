"use client"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import React from "react"


const SignInPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push("/user")
    }
  }, [session, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-80 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Welcome Back!</h1>
        <p className="text-gray-500 mb-8 text-center">
          Sign in to continue to your account
        </p>
        <button
          onClick={() => signIn("google")}
          className="w-full bg-red-500 cursor-pointer hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJg75LWB1zIJt1VTZO7O68yKciaDSkk3KMdw&s"
            alt="Google logo"
            className="w-6  h-6"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

export default SignInPage

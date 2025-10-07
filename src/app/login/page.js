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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#1e3c72] relative overflow-hidden">
      {/* Background decorative circles */}
      <div className="absolute w-72 h-72 bg-blue-400/30 rounded-full blur-3xl top-10 left-[-80px]"></div>
      <div className="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl bottom-[-100px] right-[-80px]"></div>

      {/* Glass Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 w-[90%] max-w-sm text-center animate-fade-in">
        <h1 className="text-3xl font-extrabold text-white mb-3 tracking-wide">
          Welcome Back 👋
        </h1>
        <p className="text-gray-200 mb-8 text-sm">
          Sign in to continue to your Shopovix account
        </p>

        <button
          onClick={() => signIn("google")}
          className="w-full bg-white/90 hover:bg-white text-gray-800 font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.03]"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-6 h-6"
          />
          <span className="text-sm sm:text-base font-medium">
            Continue with Google
          </span>
        </button>

        <p className="text-gray-300 text-xs mt-6">
          Secure login powered by Google Authentication
        </p>
      </div>
    </div>
  )
}

export default SignInPage

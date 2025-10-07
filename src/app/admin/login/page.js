"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function AdminLoginPage() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  useEffect(() => {
    if (isLogin) {
      window.location.href = "/admin/dashboard";
    }
  }, [isLogin, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password,
        }),
      });
      const result = await response.json();

      if (result.success && result.token) {
        localStorage.setItem("notlogin", result.token);
        setIsLogin(true);
      } else {
        setErrorMsg(result.message || "Invalid credentials");
      }
    } catch (err) {
      setErrorMsg("Server error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050505] via-[#0b1b1f] to-[#010101] overflow-hidden">
      {/* Decorative lights */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>

      {/* Background GIF layer */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/admin-bg.gif"
          alt="background"
          className="w-full h-full object-cover opacity-20 mix-blend-lighten"
        />
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-5xl mx-2 sm:mx-auto bg-[#0e0e0e]/70 backdrop-blur-2xl rounded-3xl shadow-[0_0_50px_rgba(0,255,255,0.1)] flex overflow-hidden border border-cyan-800/30 animate-fade-in">

        {/* Left Section */}
        <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center text-white p-10 bg-gradient-to-br from-[#091a1f] via-[#0f2b33] to-[#021a20] shadow-inner">
         <div className="flex gap-3 justify-center items-center  " >
          
          <h1 className="text-4xl font-extrabold mb-3 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Admin Panel 
          </h1>
          <h1 className="text-3xl mb-3 " >🔐 </h1>
          </div> 
          <p className="max-w-sm text-center text-gray-300/90 mb-8">
            Authorized access only. Manage your store, orders, and analytics securely.
          </p>

          <img
            src="/login.gif"
            alt="illustration"
            className="w-72 h-auto rounded-xl border border-cyan-500/20 shadow-[0_0_20px_rgba(0,255,255,0.15)] hover:scale-105 transition-transform"
          />
        </div>

        {/* Right Section (Login Form) */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-10">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center tracking-wide">
              Admin Login
            </h2>

            {loading ? (
              <div className="flex justify-center items-center h-96">
                <Loader className="animate-spin w-12 h-12 text-cyan-400" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Admin Email</label>
                  <input
                    type="email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0d1d21]/70 text-white px-4 py-3 rounded-xl border border-cyan-600/40 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/40 outline-none placeholder-gray-500"
                    placeholder="admin@shopovix.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0d1d21]/70 text-white px-4 py-3 rounded-xl border border-cyan-600/40 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/40 outline-none placeholder-gray-500"
                    placeholder="••••••••"
                  />
                </div>

                {errorMsg && (
                  <div className="text-red-400 text-center text-sm font-medium">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full cursor-pointer bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:opacity-90 hover:scale-[1.02] active:scale-95 text-white py-3 rounded-xl font-semibold shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all duration-200"
                >
                  Login
                </button>
              </form>
            )}

            <p className="mt-6 text-gray-400 text-center text-sm">
              🚫 Signup Disabled – Admin Access Only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

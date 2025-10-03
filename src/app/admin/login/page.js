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
    setErrorMsg(""); // Clear error on input change
  };

  useEffect(() => {
    if (isLogin) {
     window.location.href="/admin/dashboard"
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
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      {/* Background for Admin */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/admin-bg.gif"
          alt="background"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      <div className="relative w-full max-w-4xl mx-2 sm:mx-auto bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-2xl flex overflow-hidden border border-gray-700">
        {/* Left Side - Branding */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-800 text-white flex-col justify-center items-center p-10">
          <h1 className="text-4xl font-bold mb-4 tracking-wide">Admin Panel 🔐</h1>
          <p className="max-w-sm text-center opacity-80">
            Secure login for authorized admin access only.
          </p>
          <img
            src="/admin-illustration.svg"
            alt="illustration"
            className="mt-8 w-64 drop-shadow-2xl"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-10">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-white mb-6">Admin Login</h2>
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <Loader className="animate-spin w-12 h-12 text-blue-500" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-300 mb-2">Admin Email</label>
                  <input
                    type="email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-900/50 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none"
                    placeholder="admin@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-900/50 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none"
                    placeholder="••••••••"
                  />
                </div>
                {errorMsg && (
                  <div className="text-red-400 text-sm font-medium mb-2">{errorMsg}</div>
                )}
                <button
                  type="submit"
                  className="w-full cursor-pointer active:bg-blue-300 focus:bg-blue-400 scale-105 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
                >
                  Login
                </button>
              </form>
            )}

            <p className="mt-6 text-gray-400 text-center text-sm">
              🚫 Signup Disabled – Only authorized admin can login.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

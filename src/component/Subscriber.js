"use client"
import React, { useState } from "react"
import { ArrowRight } from "lucide-react"
import Message from "./Message"
import Error from "./Error"
const Subscriber = () => {
  const [email, setEmail] = useState({ email: "" });
 const [message, setMessage] = useState(null)
 const [error, setError] = useState(null)
  const handleChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.email) {
      setError("Email is required");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: email.email,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/subscribe", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setMessage(result.message);
          setEmail({ email: "" }); // ✅ Reset sahi tarike se
        } else {
          setError("Something went wrong");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="w-full bg-white py-12 px-4">
      {error && <Error error={error} onClose={()=>setError(null)} />}
      {message && <Message message={message} onClose={()=>setMessage(null)} />}
      <div className="max-w-2xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Stay Updated
        </h2>
        <p className="text-gray-500 mb-8">
          Subscribe to our newsletter and never miss our latest offers & updates.
        </p>

        {/* Subscribe Box */}
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="flex items-center w-full max-w-lg mx-auto rounded-full shadow-md overflow-hidden border border-gray-200"
        >
          <input
            type="email"
            name="email"
            value={email.email}   // ✅ yaha object ke andar ki value use karo
            onChange={handleChange}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 text-black placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 flex items-center justify-center transition-all duration-300"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Subscriber

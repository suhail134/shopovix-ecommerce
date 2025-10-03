"use client";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "name": formData.name,
      "email": formData.email,
      "message": formData.message
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/contact", requestOptions)
      .then((response) => response.json())
      .then((result) =>{ 
        if(result.success){ 
        alert(result.message);
        setFormData({
          name:"",
          email:"",
          message:""
        })} else{
          alert("Something went wrong");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <main className=" min-h-screen py-16 px-4 md:px-20">
      {/* Heading */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold   mb-4">Contact Us</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Have questions or suggestions? Reach out to us and we'll get back to you as soon as possible.
        </p>
      </section>

      {/* Contact Info + Form */}
      <section className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="flex flex-col text-center relative sm:left-0   gap-6">
          <h2 className="text-3xl font-semibold relative sm:left-0 le  mb-4">Our Contact Info</h2>
          <p className="text-gray-700 text-lg">
            Email: <a href="mailto:example@gmail.com" className="text-red-600 underline">example@gmail.com</a>
          </p>
          <p className="text-gray-700 text-lg">Phone: <span className=" ">+91 xxxxxxxxx</span></p>
          <p className="text-gray-700 text-lg">
            Instagram: <a href="https://instagram.com/ardsuhail" target="_blank" className="text-red-600 underline">@ardsuhail</a>
          </p>
        </div>

        {/* Contact Form */}
        <form
          className="bg-white p-8 rounded-2xl shadow-lg backdrop-blur-md"
          onSubmit={handleSubmit}
        >
          <label className="block mb-2 text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />

          <label className="block mb-2 text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />

          <label className="block mb-2 text-gray-700 font-medium">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            required
            className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />

          <button 
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 w-full"
          >
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}

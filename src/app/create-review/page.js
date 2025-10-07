"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import ReactStars from "react-stars";
import { useSearchParams } from 'next/navigation';
import ReviewsDisplay from "@/component/CustomerReviews";
import { useRouter } from 'next/navigation';
import { LoaderCircle, Camera, AlertTriangle } from 'lucide-react';
import { Suspense } from 'react'
import Error from '@/component/Error';
import Message from '@/component/Message';
const Createreview = () => {

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams();
  const productId = searchParams.get("products");
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const router = useRouter()
  useEffect(() => {

    fetch(`/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.product);
          // setLoading(false)
        }
      });

  }, [productId]);




  const [reviews, setReviews] = useState({
    customerName: "",
    email: "",
    desc: "",
    rating: 0,
  })
  const [files, setFiles] = useState([])
  const [preview, setPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("")
  // Handle file input
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFiles(prev => [...prev, ...files]);
  };



  // Remove selected image
  const removeImage = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    setReviews({ ...reviews, [e.target.name]: e.target.value })

  }
  const handleRatingChange = (newRating) => {
    setReviews({ ...reviews, rating: newRating });
  };
  const meesage = {
    Message: "all filds are required"
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviews.customerName || !reviews.rating || !reviews.desc) {
      setErrorMessage("all fields are requird")
      return;
    }
    setErrorMessage("")
    setLoading(true)
    const formdata = new FormData();
    formdata.append("customerName", reviews.customerName);
    formdata.append("email", reviews.email);
    formdata.append("rating", reviews.rating);
    formdata.append("desc", reviews.desc);
    formdata.append("ProductId", productId);
    files.forEach((files) => {

      formdata.append("images", files);
    })
    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };

    fetch("/api/reviews", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setLoading(false)
          // alert("reviews submited successfully", result.message)
          setReviews({
            customerName: "",
            email: "",
            rating: "",
            desc: ""
          })
          setFiles([])
          setPreview([])
          setLoading(true);
          setTimeout(() => {
            router.push(`/singleProduct/${product._id}`);
          }, 500);
        } else {
          setError(result.meesage || "server error")
          setLoading(false)
        }
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      });

  }
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-96"><LoaderCircle className="animate-spin text-blue-500 w-20 h-20" />
 </div>}>
 {error && <Error error={error} onClose={()=>setError(null)}  />}
      {loading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <LoaderCircle className="animate-spin text-blue-500 w-20 h-20" />
        </div>
      )}

    <div className="px-3 sm:px-6 md:px-10 py-8">
  <form
    onSubmit={handleSubmit}
    className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-xl space-y-6"
  >
    {/* Name Input */}
    <input
      type="text"
      name="customerName"
      value={reviews.customerName}
      onChange={handleChange}
      placeholder="Your Name"
      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm"
    />

    {/* Email Input */}
    <input
      type="email"
      name="email"
      value={reviews.email}
      onChange={handleChange}
      placeholder="Your Email (optional)"
      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm"
    />

    {/* Review Text */}
    <textarea
      name="desc"
      value={reviews.desc}
      onChange={handleChange}
      placeholder="Write your review..."
      rows={5}
      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none transition duration-300 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm"
    />

    {/* Rating Input */}
    <div className="flex items-center justify-center sm:justify-start my-4">
      <ReactStars
        count={5}
        onChange={handleRatingChange}
        size={32}
        isHalf={true}
        value={reviews.rating}
        activeColor="#facc15"
        emptyIcon={<i className="fa-regular fa-star"></i>}
        halfIcon={<i className="fa-solid fa-star-half-stroke"></i>}
        fullIcon={<i className="fa-solid fa-star"></i>}
      />
    </div>

    {/* Image Preview + Upload */}
    <div className="flex flex-wrap gap-4">
      {preview &&
        Array.isArray(preview) &&
        preview.map((img, idx) => (
          <div
            key={`preview-${idx}`}
            className="relative w-28 h-28 border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
          >
            <img
              src={img}
              alt={`preview-img-${idx}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white w-6 h-6 flex items-center justify-center text-xs shadow-md"
            >
              ×
            </button>
          </div>
        ))}

      {files.map((img, id) => (
        <div
          key={`file-${id}`}
          className="relative w-28 h-28 border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
        >
          <img
            src={URL.createObjectURL(img)}
            alt={`img-${id}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* File Upload */}
      <label className="w-28 h-28 border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all shadow-sm">
        <Camera className="h-7 w-7 text-gray-400 group-hover:text-blue-500 transition-colors" />
        <span className="text-xs font-medium text-gray-400 group-hover:text-blue-500">
          Upload
        </span>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
      </label>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full py-3 cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
    >
      Submit Review
    </button>
  </form>

  {/* Error Message */}
  {errorMessage && (
    <div className="mt-6 flex items-center gap-3 p-4 justify-center bg-red-100 border border-red-300 shadow-sm">
      <AlertTriangle className="text-red-600 w-5 h-5" />
      <p className="text-red-700 font-semibold text-base">{errorMessage}</p>
    </div>
  )}
</div>

    </Suspense>
  )
}

export default Createreview

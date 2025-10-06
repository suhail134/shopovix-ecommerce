"use client";
import { useState,useEffect } from "react";
import { HeartPlus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Error from "./Error";
import React from "react";


const ProductSlider = ({ images = [], product }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;
  const [loading, setLoading] = useState(false)
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null)

useEffect(() => {
    fetch("/api/wishlist")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setWishlist(data.wishlist?.products?.map((p) => p._id) || []);

        }
      })
      .catch((err) => console.error(err));
  }, []);


  const handleLike = (product) => { // ✅ product argument add kiya
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const isInWishlist = wishlist.includes(product._id); // ✅ product argument se _id lo
    const raw = JSON.stringify({
      productId: product._id,
    });

    const requestOptions = {
      method: isInWishlist ? "DELETE" : "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("/api/wishlist", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setWishlist((prev) =>
            isInWishlist
              ? prev.filter((id) => id !== product._id) // remove from wishlist
              : [...prev, product._id]                 // add to wishlist
          );
          alert(isInWishlist ? "Removed from wishlist" : "Added to wishlist");
        } else {
          setError(result.message || "Something went wrong");
        }
      })
      .catch((error) => {
        console.error(error);
        setError(error.message || "Server Error Please Try Again ")
      });
  };


  if (!Array.isArray(images) || images.length === 0) return null;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length);
 if(!(images || product) || loading){
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
<div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg">
  {error && <Error error={error} onClose={()=>setError(null)}  />}
  {/* Slides container */}
  <div
    className="flex transition-transform duration-700 ease-in-out"
    style={{ transform: `translateX(-${current * 100}%)` }}
  >
    {images.map((img, idx) => (
      <div key={idx} className="w-full flex-shrink-0 aspect-square relative">
        <img
          src={img}
          alt={`Slide ${idx}`}
          className="w-full h-auto object-cover  rounded-lg"
        />
      </div>
    ))}
  </div>

  {/* In Stock Badge */}
  <span className="absolute top-3 left-3 bg-green-500 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full shadow">
    ✅ In Stock
  </span>

  {/* Discount Badge */}
  {product?.comparision_price &&
    product.comparision_price > product.product_price && (
      <span className="absolute top-3 right-3 bg-red-500 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full shadow-md z-10">
        {Math.round(
          ((product.comparision_price - product.product_price) /
            product.comparision_price) *
            100
        )}
        % OFF
      </span>
    )}

  {/* Controls */}
  <button
    onClick={prevSlide}
    className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer bg-white/70 p-2 sm:p-3 rounded-full hover:bg-white z-10 shadow-md"
  >
    <img src="/previous.svg" alt="Previous" className="w-5 h-5 sm:w-6 sm:h-6" />
  </button>
  <button
    onClick={nextSlide}
    className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer bg-white/70 p-2 sm:p-3 rounded-full hover:bg-white z-10 shadow-md"
  >
    <img src="/nextimage.svg" alt="Next" className="w-5 h-5 sm:w-6 sm:h-6" />
  </button>

  {/* Indicators */}
  <div className="flex justify-center mt-2 space-x-2">
    {images.map((_, idx) => (
      <span
        key={idx}
        onClick={() => setCurrent(idx)}
        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full cursor-pointer ${
          idx === current ? "bg-purple-600" : "bg-gray-400"
        }`}
      ></span>
    ))}
  </div>

  {/* Wishlist button */}
  <div className="absolute bottom-6 sm:bottom-27 md:bottom-21  lg:bottom-8   xl:bottom-8 right-3 z-20">
    <button
      onClick={() => handleLike(product)}
      className={`cursor-pointer p-2 sm:p-3 rounded-full transition shadow-lg ${
        wishlist.includes(product._id)
          ? "bg-red-100 text-red-600"
          : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800"
      }`}
      aria-label="wishlist"
    >
      <HeartPlus className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
  </div>


</div>
  );
};

export default ProductSlider;

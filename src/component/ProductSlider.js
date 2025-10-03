"use client";
import { useState,useEffect } from "react";
import { HeartPlus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";


const ProductSlider = ({ images = [], product }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;
  const [loading, setLoading] = useState(false)
  const [wishlist, setWishlist] = useState([]);

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
          alert(result.message || "Something went wrong");
        }
      })
      .catch((error) => {
        alert("Please login to add to wishlist");
        console.error(error);
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
      {/* Slides container */}
      <div
  className="flex transition-transform duration-700 ease-in-out"
  style={{ transform: `translateX(-${current * 100}%)` }}
>
  {images.map((img, idx) => (
    <div key={idx} className="w-full flex-shrink-0 relative h-64 md:h-96">
      <img
        src={img}
        alt={`Slide ${idx}`}
        className="w-full h-full object-cover"
      />

      {/* Wishlist button bottom-right */}
      <div className="absolute bottom-3 right-3 z-20">
        <button
          onClick={() => handleLike(product)}
          className={`cursor-pointer p-3 rounded-full transition 
            ${
              wishlist.includes(product._id)
                ? "bg-red-100 text-red-600"
                : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 shadow-lg"
            }`}
          aria-label="wishlist"
        >
          <HeartPlus className="w-6 h-6" />
        </button>
      </div>
    </div>
  ))}
</div>

         <span className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow">
              ✅ In Stock
            </span>
 {product?.comparision_price && product.comparision_price > product.product_price && (
              <span className="absolute top-4 z-10 right-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
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
        className="absolute sm:top-50 top-30  cursor-pointer sm:left-2  transform -translate-y-1/2  bg-white/50 p-3 rounded-full hover:bg-white/50 
        z-10"
      >
        <img src="/previous.svg" alt="Previous" className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute sm:top-50  top-30 cursor-pointer sm:right-2 right-2 transform -translate-y-1/2 bg-white/50 p-3 rounded-full hover:bg-white/50 z-10"
      >
        <img src="/nextimage.svg" alt="Next" className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="flex justify-center mt-2 space-x-2">
        {images.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              idx === current ? "bg-purple-600" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
     
    </div>
  );
};

export default ProductSlider;

"use client"
import React from 'react'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Loader, HeartPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Error from '@/component/Error';
const Page = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetch("/api/products") 
      .then(res => res.json())
      .then(data => {
        setProducts(data.products)
        setLoading(false)
      })
  }, [])

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


  const handleLike = (product) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const isInWishlist = wishlist.includes(product._id);
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
         setError(result.message || "Server Error Please try again later")
        }
      })
      .catch((error) => {
        alert("Please login to add to wishlist");
        console.error(error);
      });
  };


  return (
    <div className="min-h-screen py-10 px-1 sm:px-5 bg-gray-50">
     {error && <Error error={error} onClose={()=>setError(null)} />  } 
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <Loader className="animate-spin w-12 h-12 text-blue-500" />
        </div>
      ) : (
        <>
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Product Gallery</h1>
            <p className="text-gray-600 mb-2">
              Explore our diverse range of products across various categories including Beauty, Fitness, Electronics, and Home & Kitchen.
            </p>
            <p className="text-gray-500 font-medium">
              Total Products: <span className="text-blue-600">{products.length}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-8  gap-x-1 gap-y-2 sm:px-10">
            {products.map(product => (
              <Link href={`/singleProduct/${product._id}`} key={product._id}>
                <div className="group relative sm:rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden bg-slate-200 cursor-pointer">
                  <div className="wishlist absolute top-4 right-4 p-2 z-10">
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // Link navigation rokne ke liye
                        handleLike(product);
                      }}
                      className={`cursor-pointer sm:p-3 p-2 rounded-full transition 
        ${wishlist.includes(product._id)
                          ? 'bg-red-100 text-red-600'
                          : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 shadow-lg'}`}
                      aria-label="wishlist"
                    >
                      <HeartPlus className="w-6 h-6" />
                    </button>
                  </div>


                  <div className="relative w-full aspect-square overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={product.product_image[0]?.url || product.product_image[1]?.url || "/placeholder.png"}
                      alt={product.product_title}
                    />
                    {/* Premium Badge */}
                    {product.comparision_price && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        SALE
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col gap-2">
                    <h2 className="font-semibold text-lg text-gray-900 truncate group-hover:text-blue-600">
                      {product.product_title}
                    </h2>

                    <div className="flex items-center gap-2">
                      <p className="text-xl font-bold text-green-600">
                        ₹{product.product_price}
                      </p>
                      {product.comparision_price && (
                        <p className="text-gray-400 line-through text-sm">
                          ₹{product.comparision_price}
                        </p>
                      )}
                    </div>

                    <div>
                      <div onClick={() => router.push(`/singleProduct/${product._id}`)} >
                        <button className="mt-3 w-full cursor-pointer bg-blue-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition duration-300">
                          View Product
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Page

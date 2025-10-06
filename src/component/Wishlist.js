"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { HeartPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import Error from "./error";
export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      setLoading(false);
      return;
    }
    fetch("/api/wishlist")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.wishlist) {
          setWishlist(data.wishlist.products || []);
        } else {
          setWishlist([]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [status]);

  const handleLike = (product) => {
    const isInWishlist = wishlist.some((p) => p._id === product._id);
    fetch("/api/wishlist", {
      method: isInWishlist ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product._id }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setWishlist((prev) =>
            isInWishlist
              ? prev.filter((p) => p._id !== product._id)
              : [...prev, product]
          );
        } else {
          setError(result.message || "Server Error Please Try Again")
        }
      })
      .catch((error) =>{
          console.error(error)
          setError(error.message || "Internal Error Please Try Again Later" )
      });
  };


  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {error && <Error error={error} onClose={()=>setError(null)} />}
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Your Wishlist</h2>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="group relative border rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden bg-white cursor-pointer"
            >
              <div className="absolute top-3 right-3 z-10">
                <button
                  onClick={() => handleLike(product)}
                  className={`p-2 rounded-full transition ${
                    wishlist.some((p) => p._id === product._id)
                      ? "bg-red-100 text-red-600"
                      : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 shadow-lg"
                  }`}
                  aria-label="wishlist"
                >
                  <HeartPlus className="w-6 h-6" />
                </button>
              </div>
              <Link href={`/singleProduct/${product._id}`}>
                <div>
                  {/* Image Section */}
                  <div className="relative w-full aspect-square overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={product.product_image[0]?.url}
                      alt={product.product_title}
                    />
                    {product.comparision_price && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        SALE
                      </div>
                    )}
                  </div>
                  {/* Product Details */}
                  <div className="p-4 flex flex-col gap-2">
                    <h2 className="font-semibold text-lg text-gray-900 truncate group-hover:text-blue-600">
                      {product.product_title}
                    </h2>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-bold text-blue-600">
                        ₹{product.product_price}
                      </p>
                      {product.comparision_price && (
                        <p className="text-gray-400 line-through text-sm">
                          ₹{product.comparision_price}
                        </p>
                      )}
                      {product.comparision_price &&
                        product.comparision_price > product.product_price && (
                          <p className="text-red-500 text-xs ml-2">
                            {Math.round(
                              ((product.comparision_price - product.product_price) /
                                product.comparision_price) *
                                100
                            )}
                            % OFF
                          </p>
                        )}
                    </div>
                    <p className="text-green-400 text-sm">Free Delivery</p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/singleProduct/${product._id}`);
                      }}
                      className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition"
                    >
                      View Product
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No items in wishlist yet.</p>
      )}
    </div>
  );
}
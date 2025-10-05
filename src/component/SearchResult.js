"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useCart } from './CartContext'
import Link from 'next/link';
import { LoaderCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

const SearchResult = () => {
  const pathname = usePathname();
  const { results, setResults } = useCart();
  const [loading, setLoading] = useState(false);
  const ref = useRef();

  // ✅ Clear search results on route change
  useEffect(() => {
    setResults(null);
  }, [pathname, setResults]);

  // ✅ Click outside to close
  useEffect(() => {
    const click = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setResults(null);
      }
    };
    document.addEventListener("mousedown", click);
    return () => document.removeEventListener("mousedown", click);
  }, [setResults]);

  return (
    <div
      ref={ref}
      className={`fixed top-24 left-1/2 -translate-x-1/2 w-[95%] sm:w-[85%] md:w-[70%] p-4 sm:p-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-2xl transition-all duration-500 ease-in-out rounded-xl z-50
        ${results ? "translate-y-0 opacity-100" : "translate-y-[50px] opacity-0 pointer-events-none"}
      `}
      style={{ maxHeight: "70vh", overflowY: "auto" }}
    >
      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
          <LoaderCircle className="animate-spin text-blue-600 w-20 h-20" />
        </div>
      )}

      {/* Custom Scrollbar */}
      <style jsx>{`
        div::-webkit-scrollbar { width: 5px; }
        div::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 10px; }
        div::-webkit-scrollbar-track { background: transparent; }
        div { scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.2) transparent; }
      `}</style>

      {/* Heading */}
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center tracking-wide text-gray-800 dark:text-gray-200">
        Search Results
      </h2>

      {/* No Results */}
      {!results || ((results?.products?.length ?? 0) === 0 && (results?.collections?.length ?? 0) === 0) ? (
        <p className="text-center text-gray-500 dark:text-gray-400 text-base sm:text-lg">No results found</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {results?.products?.map((product) => (
            <Link
              key={product._id}
              href={`/singleProduct/${product._id}`}
              onClick={() => { setLoading(true); setResults(null); }}
              className="group cursor-pointer"
              aria-label={`View details for ${product.product_title}`}
            >
              <div className="p-3 sm:p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 rounded-lg">
                {/* Product Image */}
                <div className="relative overflow-hidden aspect-square rounded-lg">
                  <img
                    src={product.product_image[0]?.url}
                    alt={product.product_title}
                    className="w-full h-full object-cover rounded-lg transform transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* SALE Badge */}
                  {product.comparision_price && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded shadow-md">
                      SALE
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="mt-2 sm:mt-3 flex flex-col gap-1 sm:gap-2">
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-xs sm:text-sm md:text-base truncate">
                    {product.product_title}
                  </p>

                  <div className="flex flex-wrap items-center gap-1 justify-between">
                    <p className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400">
                      ₹{product.product_price}
                    </p>

                    {product.comparision_price && (
                      <p className="text-gray-400 dark:text-gray-500 line-through text-[10px] sm:text-sm">
                        ₹{product.comparision_price}
                      </p>
                    )}
                  </div>

                  {/* Discount % */}
                  {product?.comparision_price &&
                    product.comparision_price > product.product_price && (
                      <p className="text-red-500 text-[10px] sm:text-xs font-medium">
                        {Math.round(
                          ((product.comparision_price - product.product_price) / product.comparision_price) * 100
                        )}
                        % OFF
                      </p>
                    )}

                  {/* Free Delivery */}
                  <p className="text-green-600 dark:text-green-400 text-[10px] sm:text-xs font-medium">
                    Free Delivery
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchResult

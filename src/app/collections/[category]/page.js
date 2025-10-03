"use client";
import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = ({ params }) => {
    const { category } = params;
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => setProduct(data.products))
            .finally(() => setLoading(false));
    }, []);

    const categorySlug = decodeURIComponent(category);
    const originalCategory = categorySlug.replace(/-/g, " ").replace(/and/g, "&");

    const filteredProducts = product.filter(
        (p) => p?.category?.toLowerCase() === originalCategory.toLowerCase()
    );

    return (
        <>
            <div>
                {/* Heading */}
                <div className="relative w-full flex mt-2 justify-center items-center mb-12">
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-center tracking-wide text-gray-900  z-10">
                        {decodeURIComponent(category).toUpperCase()}
                    </h1>

                    {/* Gradient underline */}
                    <div className="absolute -bottom-2 w-32 sm:w-48 h-1 rounded-full bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600"></div>
                </div>


                {/* Product Grid */}
                <div className="products grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-8 px-0.5 gap-x-1 gap-y-2 sm:px-10">
                    {loading ? (
                        <div className="col-span-full flex justify-center items-center">
                            <Loader className="animate-spin w-12 h-12 text-blue-500" />
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Link href={`/singleProduct/${product._id}`} key={product._id}>
                                <div className="group relative border border-gray-200 sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white dark:bg-gray-900 cursor-pointer transform hover:-translate-y-2">
                                    {/* Image Section */}
                                    <div className="relative w-full aspect-square overflow-hidden">
                                        <img
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            src={product.product_image[1] || product.product_image[0]}
                                            alt={product.product_title}
                                        />

                                        {/* Sale Badge */}
                                        {product.comparision_price &&
                                            product.comparision_price > product.product_price && (
                                                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                                                    SALE
                                                </div>
                                            )}

                                        {/* Discount % */}
                                        {product?.comparision_price &&
                                            product.comparision_price > product.product_price && (
                                                <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 text-[11px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-md">
                                                    {Math.round(
                                                        ((product.comparision_price - product.product_price) /
                                                            product.comparision_price) *
                                                        100
                                                    )}
                                                    % OFF
                                                </div>
                                            )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="p-5 flex flex-col gap-3">
                                        <h2 className="font-semibold text-lg text-gray-900 dark:text-white truncate group-hover:text-blue-600">
                                            {product.product_title}
                                        </h2>

                                        {/* Price */}
                                        <div className="flex items-center gap-2">
                                            <p className="text-xl font-bold text-green-600">
                                                ₹{product.product_price}
                                            </p>
                                            {product.comparision_price &&
                                                product.comparision_price > product.product_price && (
                                                    <p className="text-gray-400 line-through text-sm">
                                                        ₹{product.comparision_price}
                                                    </p>
                                                )}
                                        </div>

                                        {/* Button */}
                                        <button
                                            onClick={() =>
                                                router.push(`/singleProduct/${product._id}`)
                                            }
                                            className="mt-2 w-full cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-xl hover:scale-105 transition-transform"
                                        >
                                            View Product
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">
                            No products found for this category
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Page;

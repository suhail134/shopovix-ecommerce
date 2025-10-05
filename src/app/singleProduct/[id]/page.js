"use client";
import React from "react";
import { useCart } from "@/component/CartContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductSlider from "@/component/ProductSlider";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LoaderCircle, User, Mail, HeartPlus, ChevronDown, ChevronUp } from "lucide-react";
import ReactStars from "react-stars";
import ReviewsDisplay from "@/component/CustomerReviews";

const Page = ({ params }) => {
  const { category } = params;
  const router = useRouter();
  const { id } = params;
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buyLoading, setBuyLoading] = useState(false);
  const [reviews, setReviews] = useState([])
  const [showReviews, setShowReviews] = useState(false);
  const [revLoading, setRevLoading] = useState(false)
  const [wishlist, setWishlist] = useState([]);
  const { addToCart } = useCart();
  const [open, setOpen] = useState(false);
  // Fetch single product and related products
  useEffect(() => {
    if (!id) return;

    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.product);

          // ✅ Get ALL products and filter by category on frontend
          fetch("/api/products")
            .then((res) => res.json())
            .then((rdata) => {
              const filtered = rdata.products.filter(
                (p) =>
                  p.category?.toLowerCase() === data.product.category?.toLowerCase() &&
                  p._id !== data.product._id
              );
              setRelatedProducts(filtered);
            });
        }
      });
  }, [id]);

  useEffect(() => {
    setLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);



const images = Array.isArray(product?.product_image)
  ? product.product_image.map(img => img.url)
  : [];


  const handleBuyNow = () => {
    setBuyLoading(true); // ✅ loader start
    setTimeout(() => {
      router.push(`/checkout?products=${product._id}`);
    }, 500); // ✅ thoda delay add kiya smooth feel ke liye
  };

  const handlereview = () => {
    setBuyLoading(true); // ✅ loader start
    setTimeout(() => {
      router.push(`/create-review?products=${product._id}`);
    }, 500);
  }

  //fetch reviews by id
  useEffect(() => {
    if (!product._id) return; // ✅ Jab tak product load nahi hota, request mat bhejna
    setRevLoading(true)
    fetch(`/api/reviews/${product._id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews || []);
        setRevLoading(false)
      })
      .catch((err) => console.error("Error fetching reviews:", err));
  }, [product._id]); // ✅ dependency me product._id daal do

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


  if (!product || loading) {
    return (
      <p className="flex justify-center h-[80vh] relative  items-center" ><LoaderCircle className="text-cyan-800 animate-spin w-20 h-20 " /></p>
    );
  }
  // Custom Prev Button
  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 transform 
             cursor-pointer backdrop-blur-md bg-white/30 
             shadow-lg hover:shadow-xl hover:scale-110 
             transition-all duration-300 ease-in-out 
             text-black rounded-full w-12 h-12 
             flex justify-center items-center z-10 border border-white/50"
    >
      <img src="/previous.svg" alt="Previous" className="w-5 h-5" />
    </button>
  )

  // Custom Next Button 
  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-[-10px]  top-1/2 -translate-y-1/2 transform 
             cursor-pointer backdrop-blur-md bg-white/30 
             shadow-lg hover:shadow-xl hover:scale-110 
             transition-all duration-300 ease-in-out 
             text-black rounded-full w-12 h-12 
             flex justify-center items-center z-10 border border-white/50"
    >
      <img src="/nextimage.svg" alt="Next" className="w-5 h-5" />
    </button>
  );

  // Use first 20 products for related & people also viewed
  const displayProducts = products.slice(0, 20);

  const averageRating = (reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0).toFixed(1)
  // Reviews ka average nikalna
  const averageRatings = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;


  return (
    <>
      {buyLoading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <LoaderCircle className="animate-spin text-blue-600 w-20 h-20" />
        </div>
      )}


      <section className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10 pt-10 pb-20">
        {/* Product Images */}
        <ProductSlider images={images} product={product} />



        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-3">{product.product_title}</h1>

          <div className="flex items-baseline gap-3 mb-4">
            <p className="text-2xl font-bold text-green-600">₹{product.product_price}</p>
            {product.comparision_price && (
              <p className="text-sm font-medium relative bottom-1 text-gray-500 line-through">
                ₹{product.comparision_price}
              </p>
            )}
            {product?.comparision_price && product.comparision_price > product.product_price && (
              <span className="text-sm relative bottom-1 right-2">
                {Math.round(
                  ((product.comparision_price - product.product_price) /
                    product.comparision_price) *
                  100
                )}
                % OFF
              </span>
            )}
          </div>
          <p className="text-gray-500 relative bottom-2" >Free Delivery</p>

          {/* Rating */}
          <div onClick={() => setOpen(!open)} className="flex items-center cursor-pointer gap-2   sm:gap-3 mb-5 bg-gray-50 dark:bg-gray-800 p-2 md:gap-5 sm:p-4 rounded-xl shadow-md">

            <p>{averageRatings}</p>
            <ReactStars
              count={5}
              size={24}
              isHalf={true}
              value={averageRating} // ✅ yaha average use karo
              edit={false}
              activeColor="#facc15"
              emptyIcon={<i className="fa-regular fa-star"></i>}
              halfIcon={<i className="fa-solid fa-star-half-stroke"></i>}
              fullIcon={<i className="fa-solid fa-star"></i>}
            />
            <span  className="text-gray-700  dark:text-gray-300 font-medium">
              ({reviews.length} Reviews)
            </span>
            <span   className="text-gray-500 dark:text-gray-400  relative md:left-45 left-5">
            {open ? <ChevronUp /> : <ChevronDown />}
            </span>
          </div>
          <div>
            {open && <div className="md:col-span-1 md:sticky top-20 mx-2 self-start bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Customer Reviews</h2>

              <div className="flex items-center gap-3 mb-3">
                <ReactStars
                  count={5}
                  size={24}
                  isHalf={true}
                  value={averageRating}
                  edit={false}
                  activeColor="#facc15"
                  emptyIcon={<i className="fa-regular fa-star"></i>}
                  halfIcon={<i className="fa-solid fa-star-half-stroke"></i>}
                  fullIcon={<i className="fa-solid fa-star"></i>}
                />
                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                  {averageRating} / 5
                </span>
              </div>

              <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">{reviews.length} global ratings</p>

              {/* Rating Distribution */}
              <div className="space-y-2 mb-5">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviews.filter((r) => r.rating === star).length;
                  const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="w-12 text-sm text-blue-600 cursor-pointer hover:underline">{star}★</span>
                      <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300 w-8 text-right">{percentage}%</span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handlereview}
                className="w-full px-4 cursor-pointer py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-md transition-all duration-300"
              >
                ✍️ Rate This Product
              </button>
            </div>}

          </div>


          {/* Buttons */}
          <div className=" hidden sm:flex flex-col sm:relative sticky bottom-0 sm:flex-row sm:gap-4 mb-6">
            <button
              onClick={() => addToCart(product)}
              className="relative w-full cursor-pointer sm:w-auto px-8 py-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-600 text-white font-medium hover:scale-105 transition transform"
            >
              🛒 Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="relative w-full cursor-pointer sm:w-auto px-8 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:scale-105 transition transform"
            >
              {buyLoading ? "Redirecting..." : "Buy Now"}
            </button>
          </div>

          {/* Description */}
          <div className="bg-gray-100 p-4 rounded-xl mb-4">
            <h3 className="font-semibold text-black text-lg mb-2">Product Description</h3>
            <p className="text-gray-700">{product.product_desc || "No description available."}</p>
          </div>

          {/* Category */}
          <div className="category mt-2 mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-4 py-2 rounded-full">
              Category: {product.category || "Uncategorized"}
            </span>
          </div>




          <div className=" sm:hidden flex   sticky bottom-3 mt-8 gap-2   mb-6">
            <button
              onClick={() => addToCart(product)}
              className="relative w-full  py-3 rounded-lg border border-green-400 text-black font-medium 
  hover:bg-green-400 active:bg-green-400 focus:bg-green-400 hover:scale-105 transition transform"
            >
              🛒 Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="relative w-full   py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:scale-105 transition  transform"
            >
              {buyLoading ? "Redirecting..." : "Buy Now"}
            </button>
          </div>
        </div>
      </section>

      {/* Related Products */}
<section className="px-1 sm:px-6 lg:px-10 mb-5 mt-10">
  <h2 className="sm:text-2xl text-xl text-gray-800 sm:ml-0 ml-2 font-bold mb-6 uppercase">
    Related Products 
  </h2>

  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-1 gap-y-1 sm:gap-6">
    {relatedProducts.length > 0 ? (
      relatedProducts.map((product) => (
        <Link href={`/singleProduct/${product._id}`} key={product._id}>
          <div className="group relative shadow-xl hover:shadow-2xl transition duration-300 overflow-hidden bg-white cursor-pointer">
            
            {/* Wishlist button (bottom-right corner) */}
            <div className="absolute bottom-42 right-2 z-30">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleLike(product);
                }}
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

            {/* Image Section */}
            <div className="relative w-full aspect-square overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src={product.product_image[0]?.url || product.product_image[1]?.url || "/placeholder.png"}
                alt={product.product_title}
              />

              {/* SALE Badge */}
              {product.comparision_price && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  SALE
                </div>
              )}

              {/* Discount % (right-top corner) */}
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
            <div className="sm:p-4 p-2 flex flex-col gap-2">
              <h2 className="font-semibold text-lg text-gray-900 truncate group-hover:text-blue-600">
                {product.product_title}
              </h2>

              <div className="flex items-center gap-3">
                {/* Product Price */}
                <p className="text-green-600 font-bold text-base sm:text-lg md:text-xl">
                  ₹{product.product_price}
                </p>

                {/* Comparison Price */}
                {product.comparision_price && (
                  <p className="text-gray-400 line-through text-xs sm:text-sm md:text-sm">
                    ₹{product.comparision_price}
                  </p>
                )}
              </div>

              <p className="text-gray-500 relative bottom-2">Free Delivery</p>

              <button
                onClick={() => router.push(`/singleProduct/${product._id}`)}
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-blue-700 active:bg-blue-300 focus:scale-105 transition transform"
              >
                View Product
              </button>
            </div>
          </div>
        </Link>
      ))
    ) : (
      <p className="col-span-full text-center text-gray-500">
        No related products found
      </p>
    )}
  </div>
</section>




      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
        {revLoading ? (
          <div className="col-span-3 flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-4">
              <LoaderCircle className="animate-spin text-blue-600 w-12 h-12" />
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Loading Reviews...
              </p>
            </div>
          </div>
        ) : (
          // yaha tumhara actual reviews render hoga
          <>
            <div className="md:col-span-1 md:sticky top-20 mx-2 self-start bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Customer Reviews</h2>

              <div className="flex items-center gap-3 mb-3">
                <ReactStars
                  count={5}
                  size={24}
                  isHalf={true}
                  value={averageRating}
                  edit={false}
                  activeColor="#facc15"
                  emptyIcon={<i className="fa-regular fa-star"></i>}
                  halfIcon={<i className="fa-solid fa-star-half-stroke"></i>}
                  fullIcon={<i className="fa-solid fa-star"></i>}
                />
                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                  {averageRating} / 5
                </span>
              </div>

              <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">{reviews.length} global ratings</p>

              {/* Rating Distribution */}
              <div className="space-y-2 mb-5">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviews.filter((r) => r.rating === star).length;
                  const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="w-12 text-sm text-blue-600 cursor-pointer hover:underline">{star}★</span>
                      <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300 w-8 text-right">{percentage}%</span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handlereview}
                className="w-full px-4 cursor-pointer py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-md transition-all duration-300"
              >
                ✍️ Rate This Product
              </button>
            </div>


            {/* RIGHT SIDE */}
            <div className="md:col-span-2 space-y-6">
              {/* Customer Reviews with Images */}
              <div>
                <h2 className="text-lg font-semibold mb-3">Customer reviews with Image</h2>
                <div className="grid sm:mx-0 mx-2  grid-cols-6 gap-2 max-h-48 overflow-y-scroll pr-2">
                  {reviews
                    .filter((r) => r.images?.length > 0)
                    .map((item) => (
                      <div key={item._id} className="cursor-pointer aspect-square " onClick={() => setShowReviews(true)} >

                        <img
                          key={item._id}
                          src={item.images[0]} // sirf pehla image dikhana hai
                          alt="review-img"
                          className="w-50 h-auto object-cover rounded-lg"
                        />
                      </div>
                    ))}
                </div>
              </div>

              {/* Top Reviews */}
              <div className="overflow-y-scroll sm:mx-0 mx-2 scrollbar-modern h-[70vh] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200" >
                <h2 className="text-lg font-semibold mb-3">Top Reviews</h2>
                <div className="space-y-4">
                  {reviews.map((item) => (
                    <div
                      key={item._id}
                      className="border-b border-gray-200 pb-3 dark:border-gray-700"
                    >
                      <h3 className="font-semibold flex gap-1 items-center ">
                        <span>
                          <User className="text-gray-700 bg-gray-300 rounded-full p-1" />
                        </span>
                        {item.customerName}
                      </h3>

                      <p className="text-xs text-gray-500 flex gap-1 items-center ">
                        <span>
                          <Mail className="text-blue-500  rounded-full p-1" />
                        </span>
                        {item.email}
                      </p>
                      <ReactStars
                        count={5}
                        size={18}
                        isHalf={true}
                        value={item.rating}
                        edit={false}
                        activeColor="#facc15"
                        emptyIcon={<i className="fa-regular fa-star"></i>}
                        halfIcon={<i className="fa-solid fa-star-half-stroke"></i>}
                        fullIcon={<i className="fa-solid fa-star"></i>}
                      />
                      <p className=" mt-1">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {showReviews && (
              <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center  p-4">
                <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white rounded-xl shadow-lg p-4 sm:p-6">
                  <ReviewsDisplay params={params} />

                  <button
                    onClick={() => setShowReviews(false)}
                    className="relative z-40 bottom-58 left-57 sm:bottom-50 sm:left-160 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm sm:text-base"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}


          </>
        )}
      </section>



    </>
  );
};

export default Page;





"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Subscriber from "@/component/Subscriber";
import { useRouter } from "next/navigation";
import { Loader, LoaderCircle, LoaderPinwheel, RefreshCw, Wallet, Tags, HeartPlus } from "lucide-react";
import Head from "next/head";
import Error from "@/component/error";
export default function Home() {
  const [collection, setCollection] = useState([])
  const [products, setProducts] = useState([])
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);
  const router = useRouter()

  useEffect(() => {
    fetch("/api/collection")
      .then(res => res.json())
      .then(data => {
        setCollection(data.collection)
        setLoading(false)
      })

  }, [])


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
              ? prev.filter((id) => id !== product._id) 
              : [...prev, product._id]                
          );
          // alert(isInWishlist ? "Removed from wishlist" : "Added to wishlist");
        } else {
            setError(result.message || "Something went wrong");    }
        
      })
      .catch((error) => {
  
        console.error(error);
      });
  };
      <Head>
        <title>home - Shopovix</title>
        <meta name="description" content="Best products at the lowest prices. Shop now and experience the difference!" />
      </Head>
  return (
    <>
              <Error error={error} onClose={() => setError(null)} />

    <main  >
      <div className="bg-gray-300 h-[1px] w-full my-2"></div>
      <section className="hero-section relative h-[24vh] sm:h-[60vh] md:h-[70vh] lg:h-[100vh] w-full overflow-hidden flex items-end justify-center">
        <Image
          src="/Shopovix.png"
          alt="banner"
          fill
          priority
          className="object-cover sm:object-contain md:object-cover"
        />
        <div className="mb-10">
          <Link href={'/product'}>
            <button className="bg-white cursor-pointer lg:text-xl text-xs hover:bg-gray-100 text-black font-bold py-2 px-4 rounded-lg">
              Shop Now
            </button>
          </Link>
        </div>
      </section>



    
      <section className="py-10 px-4  sm:px-8">
        <div className="details max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800">
            Welcome to Shopovix
          </h1>

          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl flex  sm:flex-row items-center justify-center sm:justify-between text-center gap-6 sm:gap-8 text-gray-700 transition-transform duration-300 hover:scale-[1.01]">

        
            <p className="flex flex-col items-center gap-3 max-w-[150px]">
              <span className="bg-gray-100 p-4 rounded-full shadow-sm">
                <RefreshCw className="text-xs sm:text-lg text-gray-800" />
              </span>
              <span className="font-medium text-xs sm:text-lg">7 Days Easy Returns</span>
            </p>

            <p className="flex flex-col items-center gap-3 max-w-[150px]">
              <span className="bg-gray-100 p-4 rounded-full shadow-sm">
                <Wallet className="text-xs sm:text-lg text-gray-800" />
              </span>
              <span className="font-medium text-xs sm:text-lg">Cash On Delivery</span>
            </p>

       
            <p className="flex flex-col items-center gap-3 max-w-[150px]">
              <span className="bg-gray-100 p-4 rounded-full shadow-sm">
                <Tags className="sm:w-8 sm:h-8 w-4 h-4 text-gray-800" />
              </span>
              <span className="font-medium text-xs sm:text-lg">Lowest Price</span>
            </p>

          </div>
        </div>
      </section>

      <div className="heading text-center my-12">
        <h1 className="text-2xl md:text-5xl font-bold tracking-wide relative inline-block">
          Explore Our Collections
          <span className="block h-[3px] w-3/4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mx-auto mt-3 rounded-full"></span>
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
          Find the perfect products across all categories, curated just for you
        </p>
      </div>
      <section >
        {loading ? (
        <div className="w-full  flex justify-center items-center">
    <LoaderCircle className="text-cyan-800 animate-spin w-18 h-18" />
  </div>

        ) : (
          <div  className="collections grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 px-4 md:px-8" >
            {collection.length > 0 ? (
              collection.slice(0, 6).map((col) => (
                <div
                  key={col._id}
                  className="rounded-2xl shadow-lg bg-white/80 backdrop-blur-md hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
                >
                  {/* Aspect Ratio Box for Square Cards */}
                  <Link href={`/collections/${col.category}`} className="block w-full aspect-square">
                    <img
                      src={col.collection_image}
                      alt={col.collection_title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </Link>
                  <span className="block text-center mt-3 font-semibold text-gray-800 text-sm sm:text-base tracking-wide">
                    {col.collection_title}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 text-xl font-semibold">
                No Collections Found
              </div>
            )}
          </div>
        )}
      </section>

      <section   >
        <div className="heading text-center my-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide  relative inline-block mt-16 mb-6">
            Trending Products
            <span className="block h-[3px] w-3/4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mx-auto mt-3 rounded-full"></span>
          </h1>
          <p className="text-gray-600 mt-4 text-lg mb-10">
            Discover the hottest products that everyone is talking about!
          </p>
        </div>
        <div   >

         
          {loading ? (
            <p className="flex justify-center  items-center">
              <LoaderPinwheel className="text-cyan-400 animate-spin w-20 h-20" />
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-1 gap-y-2 sm:gap-6 px-1  md:px-8" >
              {products.length > 0 ? (
                products.slice(0, 30).map((product) => {
                  const discount =
                    product.comparision_price &&
                    Math.round(
                      ((product.comparision_price - product.product_price) /
                        product.comparision_price) *
                      100
                    );

                  return (
                    <Link href={`/singleProduct/${product._id}`} key={product._id}>
                      <div className="group relative  l px-0 shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden bg-slate-100 cursor-pointer">
                        <div className="wishlist absolute top-1 right-1  sm:top-3 sm:p-4 sm:right-3 z-20">
                          <button
                            onClick={(e) => {
                              e.preventDefault(); // Link navigation rokne ke liye
                              handleLike(product);
                            }}
                            className={`cursor-pointer p-3 rounded-full transition 
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
                            <p className="text-xl font-bold text-blue-600">
                              ₹{product.product_price}
                            </p>
                            {product.comparision_price && (
                              <p className="text-gray-400 line-through text-sm">
                                ₹{product.comparision_price}
                              </p>
                            )}
                            {product?.comparision_price && product.comparision_price > product.product_price && (
                              <p className="text-red-500 text-[10px] sm:text-[12px]  flex relative bottom-0 sm:right-1 right-1">
                                {Math.round(
                                  ((product.comparision_price - product.product_price) /
                                    product.comparision_price) *
                                  100
                                )}
                                % OFF
                              </p>
                            )}
                          </div>
                          <p className="text-green-400 text-sm   relative sm:bottom-2" >Free Delivery</p>
                          {/* Button */}
                         
                          <div>
                            <button
                              onClick={() => router.push(`/singleProduct/${product._id}`)}
                              className="mt-3 w-full cursor-pointer bg-blue-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition duration-300"
                            >
                              View Product
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="text-center text-gray-500 text-xl font-semibold">
                  No Products Found
                </div>
              )}
            </div>
          )}

        </div>
      </section>
      <section className="bg-gradient-to-r  py-16 px-4 text-center rounded-2xl mx-4 shadow-inner">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-gray-800 tracking-tight">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
         
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <p className="italic text-gray-700 leading-relaxed">
              Amazing products and super fast delivery! Shopovix is my go-to store.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              <span className="font-semibold text-gray-800">Aarav Sharma</span>
            </div>
          </div>

      
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <p className="italic text-gray-700 leading-relaxed">
              Great quality at the lowest price. Customer support is very helpful!
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              <span className="font-semibold text-gray-800">Simran Kaur</span>
            </div>
          </div>

   
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <p className="italic text-gray-700 leading-relaxed">
              Easy returns process and cash on delivery made my shopping stress-free.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              <span className="font-semibold text-gray-800">Rohit Verma</span>
            </div>
          </div>

      
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <p className="italic text-gray-700 leading-relaxed">
              Loved the packaging and super quick delivery. Highly recommended!
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              <span className="font-semibold text-gray-800">Meera Patel</span>
            </div>
          </div>

     
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <p className="italic text-gray-700 leading-relaxed">
              Shopovix never disappoints. Best prices, best service!
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              <span className="font-semibold text-gray-800">Kabir Malhotra</span>
            </div>
          </div>
        </div>
      </section>
      <section className="subscriber" >
        <Subscriber />
      </section>
    </main>
    </>
  );
}



"use client";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactStars from "react-stars";
import { Delete, LoaderCircle } from "lucide-react";
import Error from "@/component/Error";
import Message from "@/component/Message";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [showDesc, setShowDesc] = useState({});
  const [showImages, setShowImages] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLoading(false)
          setReviews(data.reviews)
        }
      });
  }, []);

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this review?")) {
      return;
    }

    fetch(`/api/reviews/${id}`, { method: "Delete" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage("review deleted successfully")
          setReviews(reviews.filter((p) => p._id !== id))
        } else {
          setError(data.message || "Failed to delete review");
        }
      })
      .catch((err) => {
        setError("Error: " + err.message)
      })



  }

  //search bar search by product ID ,review Id,email customer Name
  const filteredReview = reviews.filter((item) => (
    item?.email?.toLowerCase().includes(search.toLowerCase()) || item?.customerName?.toLowerCase().includes(search.toLowerCase()) || item?.ProductId?.toLowerCase().includes(search.toLowerCase()) || item?._id?.toString().toLowerCase().includes(search.toLowerCase())
  ))

  const toggleDesc = (id) => {
    setShowDesc((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleImages = (id) => {
    setShowImages((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  if (!reviews || loading) {
    return <div className="bg-white/80 h-[70vh] backdrop:blur-sm flex justify-center items-center " >
      <LoaderCircle className="text-blue-700 animate-spin w-14 h-14 " />
    </div>
  }
  return (
    <>
    {error && <Error error={error} onClose={()=>setError(null)} />}
    {message && <Message message={message} onClose={()=>setMessage(null)} />}
      <div className="max-w-md mx-auto mt-6 mb-10">
        <input
          type="text"
          placeholder="Search by productID,reviewID,email,customerName..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      {search.trim() && (
        <div className="mt-2 bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-2 text-center">
          <p className="text-indigo-700 font-medium">
            {filteredReview.length > 0
              ? `${filteredReview.length} result${filteredReview.length > 1 ? "s" : ""} matched`
              : "0 results found"}
          </p>
        </div>
      )}
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        <h1>You have {reviews.length} Reviews</h1>
        {filteredReview.length > 0 ? (
          filteredReview.map((item) => (
            <div
              key={item._id}
              className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200 bg-white"
            >
              <div>
                <h3 className=" font-semibold text-xl" >
                  Review ID:  {item._id.slice(0, 6)}
                </h3>
              </div>
              <div className="flex justify-between items-center">

                <h2 className="text-xl font-semibold text-gray-800">
                  {item.customerName}
                </h2>
                <div>
                  <button className="text-white relative bottom-8 left-5 cursor-pointer bg-red-700 py-1 px-3 rounded-lg font-bold" onClick={() => handleDelete(item._id)} >Delete</button>
                  <ReactStars
                    count={5}
                    size={22}
                    isHalf={true}
                    value={item.rating}
                    edit={false}
                    activeColor="#facc15"
                    emptyIcon={<i className="fa-regular fa-star"></i>}
                    halfIcon={<i className="fa-solid fa-star-half-stroke"></i>}
                    fullIcon={<i className="fa-solid fa-star"></i>}
                  />
                </div>
              </div>

              <p className="text-gray-500 text-sm mt-1">
                Product ID: <span className="font-medium">{item.ProductId.slice(0, 6)}</span>
              </p>
              <p className="text-gray-500 text-sm">Email: {item.email}</p>

              {/* Description toggle */}
              <div className="mt-3">
                {showDesc[item._id] ? (
                  <div>
                    <p className="text-gray-700">{item.desc}</p>
                    <button
                      className="text-red-600 cursor-pointer text-sm font-medium hover:underline"
                      onClick={() => toggleDesc(item._id)}
                    >
                      close Description
                    </button>
                  </div>
                ) : (
                  <button
                    className="text-blue-600 cursor-pointer text-sm font-medium hover:underline"
                    onClick={() => toggleDesc(item._id)}
                  >
                    Read Description
                  </button>
                )}
              </div>

              {/* Image toggle */}
              <div className="mt-3">
                {item.images && item.images.length > 0 ? (
                  showImages[item._id] ? (
                    <div>
                      {/* Image gallery */}
                      <div className="grid grid-cols-2 w-[40vw]  sm:grid-cols-3  mb-3">
                        {item.images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`Review ${item._id} image ${i}`}
                            className="w-40 border h-40 object-cover rounded-md cursor-pointer hover:scale-105 transition"
                            onClick={() => setSelectedImage(img)}
                          />
                        ))}
                      </div>
                      <button
                        className="text-red-600 cursor-pointer text-sm font-medium hover:underline"
                        onClick={() => toggleImages(item._id)}
                      >
                        Close Images
                      </button>
                    </div>
                  ) : (
                    <button
                      className="text-blue-600 cursor-pointer text-sm font-medium hover:underline"
                      onClick={() => toggleImages(item._id)}
                    >
                      View Images
                    </button>
                  )
                ) : (
                  <p className="text-gray-400 italic">This review has no images</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No Reviews Found</p>
        )}

        {/* Full Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative">
              <img
                src={selectedImage}
                alt="full"
                className="max-w-[90vw] max-h-[85vh] rounded-lg shadow-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 bg-red-500 rounded-lg  p-2 right-2 text-white text-4xl font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewsPage;

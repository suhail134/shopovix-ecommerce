"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactStars from "react-stars";

export default function MyReviews() {
  const { data: session, status } = useSession();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDesc, setShowDesc] = useState({});
  const [showImages, setShowImages] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (status !== "authenticated") {
      setLoading(false);
      return;
    }

    fetch(`/api/userReviews?email=${session.user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [status, session]);

  if (loading) {
    return (
      <div className="flex justify-center  items-center h-[70vh]">
        <div className="animate-spin   rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (status !== "authenticated") {
    return (
      <div className="flex justify-center items-center h-[70vh] text-lg font-medium text-gray-700">
        Please login to see your Reviews.
      </div>
    );
  }

  const toggleDesc = (id) => {
    setShowDesc((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleImages = (id) => {
    setShowImages((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  if (!reviews.length) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No Reviews"
          className="w-32 h-32 mb-4 opacity-80"
        />
        <p className="text-xl font-semibold text-gray-700">
          You have no reviews yet
        </p>
        <p className="text-gray-500 mt-2">Start rating your orders.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
  <h2 className="text-3xl ml-3 font-bold mb-6 text-black ">
    Your Reviews
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2  w-[65vw] p-4 gap-6 max-h-[75vh] overflow-auto  items-start">
    {reviews.length > 0 ? (
      reviews.map((item) => (
        <div
          key={item._id}
          className="bg-white dark:bg-gray-800 h-auto shadow-lg rounded-2xl p-5 border border-gray-200 dark:border-gray-700 transition-transform hover:scale-[1.02] hover:shadow-2xl"
        >
          {/* Top Section */}
          <div className="mb-3">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  <span className="font-bold text-gray-900 dark:text-gray-100">Review ID: </span>
                  {item._id.slice(0, 6)}
                </h3>
                <h2 className="text-md font-medium text-gray-700 dark:text-gray-300">
                  <span className="font-bold text-gray-900 dark:text-gray-100">Name: </span>
                  {item.customerName}
                </h2>
              </div>

              <ReactStars
                count={5}
                size={20}
                isHalf={true}
                value={item.rating}
                edit={false}
                activeColor="#facc15"
                emptyIcon={<i className="fa-regular fa-star"></i>}
                halfIcon={<i className="fa-solid fa-star-half-stroke"></i>}
                fullIcon={<i className="fa-solid fa-star"></i>}
              />
            </div>

            <p className="text-gray-500 text-sm mt-1">
              Product ID: <span className="font-medium">{item.ProductId.slice(0, 6)}</span>
            </p>
            <p className="text-gray-500 text-sm">Email: {item.email}</p>
          </div>

          {/* Description toggle */}
          <div className="mb-3">
            {showDesc[item._id] ? (
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1 text-center">Description</h4>
                <p className="text-gray-700 dark:text-gray-300 italic text-sm">{item.desc}</p>
                <button
                  className="text-red-600 mt-2 text-sm font-medium hover:underline block mx-auto"
                  onClick={() => toggleDesc(item._id)}
                >
                  Close Description
                </button>
              </div>
            ) : (
              <button
                className="text-blue-600 text-sm font-medium hover:underline"
                onClick={() => toggleDesc(item._id)}
              >
                Read Description
              </button>
            )}
          </div>

          {/* Image toggle */}
          <div>
            {item.images && item.images.length > 0 ? (
              showImages[item._id] ? (
                <div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-2">
                    {item.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Review ${item._id} image ${i}`}
                        className="w-full h-32 object-cover rounded-md cursor-pointer border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform"
                        onClick={() => setSelectedImage(img)}
                      />
                    ))}
                  </div>
                  <button
                    className="text-red-600 text-sm font-medium hover:underline"
                    onClick={() => toggleImages(item._id)}
                  >
                    Close Images
                  </button>
                </div>
              ) : (
                <button
                  className="text-blue-600 text-sm font-medium hover:underline"
                  onClick={() => toggleImages(item._id)}
                >
                  View Images
                </button>
              )
            ) : (
              <p className="text-gray-400 italic text-sm">This review has no images</p>
            )}
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500 col-span-full">No Reviews Found</p>
    )}
  </div>

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
          className="max-w-[90vw] max-h-[85vh] rounded-lg shadow-2xl"
        />
        <button
          onClick={() => setSelectedImage(null)}
          className="absolute top-2 right-2 bg-red-500 rounded-lg p-2 text-white text-3xl font-bold cursor-pointer hover:bg-red-600"
        >
          ×
        </button>
      </div>
    </div>
  )}
</div>


  );
}

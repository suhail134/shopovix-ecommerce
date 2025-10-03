"use client";

import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactStars from "react-stars";
import { Loader } from "lucide-react";

const ReviewsDisplay = ({ params }) => {
  const { id } = params;
  const [reviews, setReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false)

  // Slider controls
  const nextSlide = () => setCurrent((prev) => (prev + 1) % reviews.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);

  // Fetch reviews
  useEffect(() => {
    if (!id) return;
  setLoading(true)
    fetch(`/api/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => {
        
        const imageReviews = (data.reviews || []).filter(
          (item) => item.images?.length > 0
        );
        setReviews(imageReviews);
        setLoading(false)
     
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      });
  }, [id]);
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + Number(r.rating || 0), 0) / reviews.length
      : 0;

  // Round to 1 decimal
  const roundedRating = Number(averageRating.toFixed(1));
  if (loading) {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Loader className="animate-spin text-blue-600 w-20 h-20" />
    </div>
  );
}
  if (reviews.length === 0) return null;
  
  return (
    <>
   
    <div className="fixed inset-0 bg-transparent backdrop:blur-xs bg-opacity-70 flex items-center justify-center z-40 p-4">
      <div className="relative w-full max-w-4xl h-[70vh] bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
        {/* Slider */}
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {reviews.map((item, idx) => (
            <div
              key={idx}
              className="w-full flex-shrink-0 flex flex-col md:flex-row h-full"
            >
              <img
                src={item.images[0]}
                alt={`Slide ${idx}`}
                className="w-full md:w-1/2 h-64 md:h-full object-cover cursor-pointer"
                onClick={() => setSelectedImage(item.images[0])}
              />
              <div className="p-4 md:w-1/2 overflow-y-auto">
                <h2 className="font-semibold text-white flex gap-2 items-center text-lg mb-1">
                  <span>
                    <User className="text-gray-700 bg-gray-300 rounded-full p-1" />
                  </span>
                  {item.customerName}
                </h2>


                <div className="flex gap-2 items-center " >
                  <ReactStars
                    count={5}
                    size={24}
                    isHalf={true}
                    value={item.rating} // ✅ yaha average use karo
                    edit={false}
                    activeColor="#facc15"
                    emptyIcon={<i className="fa-regular fa-star"></i>}
                    halfIcon={<i className="fa-solid fa-star-half-stroke"></i>}
                    fullIcon={<i className="fa-solid fa-star"></i>}
                  />
                  <span className=" text-lg text-white " >Verified Purchase</span>
                </div>
                <div>
                  {item.images.length > 1 && (
                    <div className="flex gap-2 flex-wrap mt-2">
                      {item.images.slice(1).map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`Review ${idx} image ${i}`}
                          className="w-20 h-20 object-cover rounded-md cursor-pointer border"
                          onClick={() => setSelectedImage(img)} // modal me bada karne ke liye
                        />
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-gray-700 mb-2">{item.desc}</p>

              </div>

            </div>

          ))}
        </div>

        {/* Slider controls */}
        {reviews.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute top-50 cursor-pointer left-2 transform -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 z-10"
            >
              <img src="/previous.svg" alt="Previous" className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-50 cursor-pointer right-2 transform -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 z-10"
            >
              <img src="/nextimage.svg" alt="Next" className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-white/80 backdrop:blur-sm bg-opacity-70 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative">
              <img
                src={selectedImage}
                alt="full"
                className="max-w-[90vw] max-h-[90vh] rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute cursor-pointer top-2 right-2 text-black text-4xl font-bold"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ReviewsDisplay;

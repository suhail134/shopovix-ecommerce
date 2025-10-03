"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader } from 'lucide-react';

const Page = () => {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);


  // Utility to slugify
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')      // Replace spaces with -
    .replace(/&/g, 'and')      // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')  // Remove all non-word chars
    .replace(/\-\-+/g, '-')    // Replace multiple - with single -
    .replace(/^-+/, '')        // Trim - from start
    .replace(/-+$/, '');       // Trim - from end
  // use Effect to fetch collections

  useEffect(() => {
    fetch("/api/collection")
      .then(res => res.json())
      .then(data => {
        setCollection(data.collection);
        setLoading(false);
      });
  }, []);

  const categories = [...new Set(collection.map(c => c.category))];
  const categoryImages = categories.map(cat => {
    const col = collection.find(c => c.category === cat);
    return { cat, image: col?.collection_image };
  });

  return (
    <div className="min-h-screen py-10 sm:px-5  px-1 ">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Explore Our Collection</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Explore our diverse range of products across various categories.
        </p>
      </div>

      <div className="grid grid-cols-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-3 sm:gap-8 max-w-6xl mx-auto">
        {loading ? (
          <div className="col-span-full flex justify-center items-center">
            <Loader className="animate-spin w-12 h-12 text-blue-500" />
          </div>
        ) : categoryImages.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No collections found. Please add some collections first.
          </p>
        ) : (
          categoryImages.map(({ cat, image }, id) => (
            <Link key={id} href={`/collections/${slugify(cat)}`}>
              <div className="bg-white rounded-2xl h-auto shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden group">
                <div className=" w-full aspect-square overflow-hidden">
                  <img
                    src={image}
                    alt={cat}
                    className="h-full w-full object-cover transform group-hover:scale-110 transition duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h2 className="text-lg font-semibold text-gray-800 capitalize group-hover:text-blue-600">
                    {cat}
                  </h2>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;

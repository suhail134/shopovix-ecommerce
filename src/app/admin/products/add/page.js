"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { LoaderCircle } from 'lucide-react'
const AddProductPage = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    comparision_price: ''
  });
  const [open, setOpen] = useState(false);
  const [collection, setCollection] = useState([]);
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setloading] = useState(true)
  
  const router = useRouter();
  const searchParams = useSearchParams();
  //This id is collection id for edit mode and undefined for create mode in simple words this variable help to detect edit or create mode
  const id = searchParams.get("id"); 
 
  // Fetch existing product data in edit mode

  useEffect(() => {
    if (id) {
      fetch(`/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          
         if (data.success) {
           
            setForm({
              title: data.product.product_title,
              description: data.product.product_desc,
              price: data.product.product_price,
              category: data.product.category,
              comparision_price: data.product.comparision_price

            });
            setPreview(data.product.product_image); 
          }  setloading(false)
        })
        .catch((err) => {
             setloading(false); 
          console.error("Error fetching Products:", err)
        });
    }else {
    setloading(false);
  }
  }, [id]);
  // Handle form field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
  };

  // Remove selected image
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    if (!form.category) {
      alert("Please select a category before creating product");
      return;
    }
if (id && images.length === 0 && (!preview || preview.length === 0)) {
  alert("Please select at least one image");
  return;
}
    try {
      const formData = new FormData();
      formData.append("product_title", form.title);
      formData.append("product_price", form.price);
      formData.append("product_desc", form.description);
      formData.append("category", form.category);
      formData.append("comparision_price", form.comparision_price || 0);
      if (id) formData.append("id", id);
      images.forEach((img) => {
        formData.append("product_image", img);
      });

      // const response = await fetch("/api/products", {
      //   method: "POST",
      //   body: formData
      // });

      const response = await fetch(id ? `/api/products/${id}` : "/api/products", {
        method: id ? "PATCH" : "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
          setloading(false);
        alert(`Product ${id ? "updated" : "created"} successfully!`);
        router.push("/admin/products");
      } else {
        alert(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error adding/updating Product:", error);
      alert("Server error. Please try again.");
    }


  }


  //  const handleEdit = (id) => {
  //   router.push(`/admin/products/add?id=${id}`);
  // };

  // Fetch collections for category dropdown
  useEffect(() => {
    fetch("/api/collection")
      .then(res => res.json())
      .then(data => setCollection(data.collection))
      .catch(err => console.error(err));
  }, []);

  const categories = [...new Set(collection.map(c => c.category))];
      
  return (
    <>
      {loading && (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
              <LoaderCircle className="animate-spin text-blue-600 w-20 h-20" />
            </div>
          )}
    <div className="p-6 max-w-4xl mx-auto min-h-screen z-50 bg-gray-100">
        <style jsx global>{`
        html,
        body {
          overflow-x: hidden !important;
        }
      `}</style>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* Product Info */}
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
          <div className="flex flex-col relative">
            <label className="absolute -top-3 left-3 text-sm text-gray-500 bg-white px-1">
              Product Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border text-black border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="flex flex-col relative">
            <label className="absolute -top-3 left-3 text-sm text-gray-500 bg-white px-1">
              Product Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full text-black border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4}
              required
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Pricing</h2>
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col relative">
              <label className="absolute -top-3 left-3 text-sm text-gray-500 bg-white px-1">
                Actual Price
              </label>
              <input
                type="text"
                name="price"
                value={form.price}
                placeholder="0.00"
                onChange={handleChange}
                className="w-full text-black border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="flex-1  flex flex-col relative">
              <label className="absolute -top-3 left-3 sm:text-sm text-[11px] text-gray-500 bg-white px-1">
                Comparison Price
              </label>
              <input
                type="text"
                name="comparision_price"
                value={form.comparision_price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full border text-black border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-gray-700 mb-2 font-semibold">Product Images</p>
          <div className="flex flex-wrap gap-4">
            {/* Existing images from DB (edit mode) */}
            {preview && Array.isArray(preview) && preview.map((img, idx) => (
              <div key={`preview-${idx}`} className="relative w-28 h-28 border rounded overflow-hidden">
                <img
                  src={img}
                  alt={`preview-img-${idx}`}
                  className="w-full h-full object-cover"
                />
                 <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute cursor-pointer top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
                {/* Optionally, add a remove button for preview images if you want */}
              </div>
            ))}

            {/* Newly selected images (not yet uploaded) */}
            {images.map((img, idx) => (
              <div key={`new-${idx}`} className="relative z-30 w-28 h-28 border rounded overflow-hidden">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`img-${idx}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute cursor-pointer  top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
            <label className="w-28 h-28 border border-dashed rounded flex items-center justify-center cursor-pointer text-2xl text-gray-400 hover:bg-gray-50">
              +
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>
        </div>

        {/* Category */}
        <div className="bg-white z-20 p-6 rounded-xl shadow-md relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="w-full  cursor-pointer px-4 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            {form.category ? `Selected: ${form.category}` : "Choose Category"}
          </button>

          <div className={`absolute left-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}>
            <ul className="flex flex-col">
              {categories.length > 0 ? categories.map((cat, id) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => {
                      setForm({ ...form, category: cat });
                      setOpen(false);
                    }}
                    className="w-full cursor-pointer  text-left px-4 py-3 hover:bg-purple-50"
                  >
                    {cat}
                  </button>
                </li>
              )) : (
                <li className="px-4 py-3 text-gray-500">No categories available</li>
              )}
            </ul>
            <div className="flex justify-center items-center p-4 border-t border-gray-200">
              <Link href={`/admin/collections/create-collection?selected=${form.category}`}>
                <button className="bg-blue-600 cursor-pointer  text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-md">
                  ➕ Create New Collection
                </button>
              </Link>
            </div>
          </div>
        </div>

        { }
        {/* Submit */}
        <button type="submit" className="bg-green-600 cursor-pointer px-6 py-3 rounded-lg text-white font-semibold hover:bg-green-700 transition">
          {id ? "💾 Update Product" : "🚀 Add Product"}
        </button>

      </form>
    </div>
    </>
  )
}

export default AddProductPage;

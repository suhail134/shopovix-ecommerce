"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import Message from "@/component/Message";
import Error from "@/component/Error";
const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true)
  //This id is collection id for edit mode and undefined for create mode in simple words this variable help to detect edit or create mode
  const id = searchParams.get("id");
  const [form, setForm] = useState({ title: "", description: "", category: "" });
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  //Fetch existing collection for edit mode
  useEffect(() => {
    if (id) {
      fetch(`/api/collection/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setForm({
              title: data.collection.collection_title,
              description: data.collection.collection_desc,
              category: data.collection.category,
            });
            setPreview(data.collection.collection_image); // existing image show
          } setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.error("Error fetching collection:", err)
        });

    } else {
      setLoading(false);
    }
  }, [id]);

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // file select
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreview(URL.createObjectURL(files[0])); // sirf ek image show
  };
  // slugify function for category to make it URL friendly this function convert space to hyphen and remove special characters
  const slugify = (str) => {
    return str
      .toLowerCase()
      .replace(/ /g, "-")  // space -> hyphen
      .replace(/[^a-z0-9-]/g, ""); // special characters remove
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
   setLoading(true);
    if (!id && images.length === 0) {
      setError("Please select an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("collection_title", form.title);
      formData.append("collection_desc", form.description);
      formData.append("category", slugify(form.category)); // slugify category before sending to server
      if (id) formData.append("id", id);
      if (images.length > 0) {
        formData.append("collection_image", images[0]);
      }

      const response = await fetch(id ? `/api/collection/${id}` : "/api/collection", {
        method: id ? "PATCH" : "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
          setLoading(false);
        setMessage(`Collection ${id ? "updated" : "created"} successfully!`);
        router.push("/admin/collections/Your-collections");
      } else {
        setError(result.message || "Something went wrong");
        setLoading(false)
      }
    } catch (error) {
      
      console.error("Error adding/updating collection:", error);
      setError("Server error. Please try again.");
      setLoading(false)
    }
  };

  return (
    <Suspense   fallback={ <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <LoaderCircle className="animate-spin text-blue-600 w-20 h-20" />
        </div>}>
      {loading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <LoaderCircle className="animate-spin text-blue-600 w-20 h-20" />
        </div>
      )}
      {error && <Error error={error} onClose={()=>setError(null)} />}
      {message && <Message message={message} onClose={()=>setMessage(null)} />}

      <div className="max-w-2xl mx-auto p-8 bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl shadow-xl border border-gray-200">
        <div className="px-4 sm:px-6 lg:px-10 py-6">

      
          <h1 className="text-xl  sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
            {id ? "✏️ Edit Collection" : "✨ Create New Collection"}
          </h1>

       
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 p-5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-md gap-4 sm:gap-0">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center sm:text-left">
              Go To Collections
            </h2>

            <Link href="/admin/collections/Your-collections">
              <button className="bg-white text-purple-700 px-4 sm:px-5 py-2 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold shadow-md w-full sm:w-auto">
                ➕ Your Collections
              </button>
            </Link>
          </div>

        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
         
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col gap-6">
            <div className="flex flex-col relative">
              <label className="absolute -top-3 left-3 text-sm font-medium text-purple-700 bg-white px-2">
                Collection Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full text-black border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                placeholder="Enter collection title"
                required
              />
            </div>
            <div className="flex flex-col relative">
              <label className="absolute -top-3 left-3 text-sm font-medium text-purple-700 bg-white px-2">
                Collection Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border text-black border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                rows={4}
                placeholder="Write something about this collection..."
                required
              />
            </div>
          </div>

         
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col gap-4">
            <div className="flex flex-col relative">
              <label className="absolute -top-3 left-3 text-sm font-medium text-purple-700 bg-white px-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full text-black border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                placeholder="Enter category name"
                required
              />
            </div>
          </div>

          
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <p className="text-gray-800 mb-3 font-semibold text-lg">Collection Image</p>
            {preview && (
              <div className="relative w-32 h-32 border rounded-lg overflow-hidden shadow-md mb-3">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <label className="w-28 h-28 border-2 border-dashed border-purple-300 rounded-lg flex items-center justify-center cursor-pointer text-3xl text-purple-400 hover:bg-purple-50 hover:border-purple-500 transition-all duration-300">
              +
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>

          
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 cursor-pointer text-white text-lg font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            {id ? "💾 Update Collection" : "🚀 Create Collection"}
          </button>
        </form>
      </div>
    </Suspense>
  );
};

export default Page;

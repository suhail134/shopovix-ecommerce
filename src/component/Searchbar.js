"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { usePathname } from "next/navigation";

const Searchbar = ({ setSidebarOpen }) => {
  const [search, setSearch] = useState("");
  const { setResults } = useCart();
  const pathname = usePathname();

  // ✅ Route change par search aur results reset
  useEffect(() => {
    setSearch("");
    setResults(null);
  }, [pathname, setResults]);

  // ✅ Debounced search
  useEffect(() => {
    if (!search.trim()) {
      setResults(null);
      return;
    }

    const delayDebounce = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleSearch = async () => {
    try {
      const res = await fetch(`/api/search?query=${search}`);
      const data = await res.json();
      setResults(data.results || { products: [], collections: [] });
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-60 sm:w-72">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="peer w-full pl-10 pr-16 py-2 rounded-full bg-gray-100 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all"
        />
        <img
          src="/search.svg"
          alt="search now"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-70 peer-focus:opacity-100 transition"
        />
      </div>
    </div>
  );
};

export default Searchbar;

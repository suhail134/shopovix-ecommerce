"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-2 py-2 rounded-lg cursor-pointer absolute right-25 md:right-35 top-5 sm:top-4.5 lg:top-3 md:top-3.5  lg:right-38 xl:right-40 text-black dark:text-white transition-colors"
    >
      {theme === "dark" ? <><div className="z-auto   cursor-pointer " ><img width={30} src="/light.svg" alt="" /> <p className="text-gray-800 text-xs relative sm:top-0 top-1 " >Light</p></div> </>  : <><div className="z-50  cursor-pointer "  ><img width={30} src="/dark.svg" alt="" />  <p className="text-gray-800 text-xs relative sm:top-0 top-1 " >Dark</p> </div></>}
    </button>
  );
}

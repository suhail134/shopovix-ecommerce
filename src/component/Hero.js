"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative w-full top-3 overflow-hidden bg-black flex items-end justify-center">
      <div className="relative w-full h-auto sm:h-[60vh] md:h-[75vh] lg:h-[90vh] xl:h-[100vh]">
        <Image
          src="/Shopovix.png"
          alt="Shopovix Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover sm:object-contain md:object-cover lg:object-cover object-center"
        />

        {/* Optional overlay for better visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Button */}
      <div className="absolute bottom-6 flex justify-center w-full z-20">
        <Link href="/shop">
          <button className="bg-white cursor-pointer relative right-[40vw] bottom-[15vw] active:bg-green-400 active:text-white hover:text-white hover:bg-green-400 text-sm sm:text-base lg:text-xl text-black font-bold py-2 px-4 rounded-lg shadow-md transition-all">
            Shop Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;

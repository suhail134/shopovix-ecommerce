"use client";
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <main className="min-h-screen py-16 px-4 md:px-20">
      {/* Heading */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold   mb-4">
          About Shopovix
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Shopovix is dedicated to bringing you premium products at unbeatable prices. Our mission is to make online shopping simple, reliable, and enjoyable for everyone.
        </p>
      </section>

      {/* Our Story */}
      <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-semibold   mb-4">Our Story</h2>
          <p className="text-gray-700 text-lg">
            Founded with passion and commitment, Shopovix started as a small idea to make quality products accessible to everyone. Today, we have a wide range of categories and collections curated just for you.
          </p>
        </div>
        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
          <img src="/Shopovix.png" alt="Shopovix"  className="object-cover"/>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mb-16 text-center">
        <h2 className="text-3xl font-semibold   mb-8">Why Choose Us</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-semibold   mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Receive your products quickly and reliably.</p>
          </div>
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-semibold   mb-2">Easy Returns</h3>
            <p className="text-gray-600">Hassle-free returns within 7 days.</p>
          </div>
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-semibold   mb-2">Cash on Delivery</h3>
            <p className="text-gray-600">Pay only when you receive your order.</p>
          </div>
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-semibold   mb-2">Best Prices</h3>
            <p className="text-gray-600">Premium quality without breaking the bank.</p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="mb-16 text-center">
        <h2 className="text-3xl font-semibold   mb-8">Meet the Founder</h2>
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg">
           <Image src={"https://instagram.fdel65-1.fna.fbcdn.net/v/t51.2885-19/527341829_18051540551627466_5466598364211098721_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby44MDAuYzIifQ&_nc_ht=instagram.fdel65-1.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QFs2gGq0YmzVKDsg9cmB_nispmUXee2vsGI5bepmTg1-Oh-cfH-Ql125h49BSqkTmdjLW6uHnY-sGVKt1L9ufzu&_nc_ohc=HSQPFnWSenkQ7kNvwFvA8p3&_nc_gid=ifVnqfj6EqIfvAgA1rBsng&edm=AE-LrgUBAAAA&ccb=7-5&oh=00_AfakMtuTPfglMAW6Qflhm5XEb9xMC5En8DQBaygwCqZ04A&oe=68D1DE4E&_nc_sid=8353fa"} alt="Suhail"  className="object-cover" fill />
          </div>
          <h3 className="text-xl font-bold  ">Suhail</h3>
          <p className="text-gray-600">
            Founder of Shopovix. Passionate about delivering premium products with ease and reliability.
          </p>
          <Link href="https://instagram.com/ardsuhail" target="_blank" className="text-red-600 underline mt-2">
            Follow on Instagram: @ardsuhail
          </Link>
        </div>
      </section>

      {/* Contact Info */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold   mb-4">Get in Touch</h2>
        <p className="text-gray-600 text-lg mb-2">Email: <a href="mailto:example@gmail.com" className="text-red-600 underline">example@gmail.com</a></p>
        <p className="text-gray-600 text-lg">Phone: <span className=" ">+91 98765 43210</span></p>
      </section>
    </main>
  );
}

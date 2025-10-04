"use client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Script from "next/script";
import { ChevronDown, ChevronUp, LoaderCircle } from "lucide-react";
import { set } from "mongoose";
import { Suspense } from "react";
const Page = () => {
    const [form, setForm] = useState({
        email: "",
        number: "",
        country: "",
        firstName: "",
        lastName: "",
        fullAddress: "",
        apartment: "",
        city: "",
        state: "",
        pincode: "",
        paymentMethod: ""
    });
    const [products, setProducts] = useState([]); // Array of products
    const [open, setOpen] = useState(false);
    const searchParams = useSearchParams();
    const productsParam = searchParams.get("products");
    const [paymentMethod, setPaymentMethod] = useState({ method: "" });
    const [payLoading, setPayLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!productsParam) {
            router.push("/");
            return;
        }
        try {
            let parsed = productsParam;
            // Agar sirf productId hai (single product page se), toh API se fetch karo
            if (!parsed.startsWith("%5B") && !parsed.startsWith("[")) {
                // Single product id, fetch details
                fetch(`/api/products/${parsed}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.success && data.product) {
                            setProducts([{ ...data.product, quantity: 1 }]);
                        } else {
                            router.push("/");
                        }
                    });
            } else {
                // Cart ya buy now se JSON array aaya hai
                const productsArr = JSON.parse(decodeURIComponent(productsParam));
                const finalProducts = productsArr.map(p => ({
                    ...p,
                    quantity: p.quantity || 1
                }));
                setProducts(finalProducts);
            }
        } catch (err) {
            console.error("Invalid product query:", err);
            router.push("/");
        }
    }, [productsParam]);

    const handlechange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Optional: handle form submit if needed
    };

  

    const handleBuyNow = async () => {
    setPayLoading(true);

    if (!products.length || !products[0].product_price) {
        alert("Product data not loaded. Try again.");
        setPayLoading(false);
        return;
    }

    // Total amount calculate karna
    const amount = products.reduce((acc, p) => acc + (p.product_price * p.quantity), 0);

    const res = await fetch("/api/customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            amount,
            ...form,
            products,
            totalAmount: amount,
            paymentMethod: form.paymentMethod,
            image: Array.isArray(products[0].product_image) ? products[0].product_image[0] : products[0].product_image,
            customerName: form.firstName,
            customerAddress: form.fullAddress,
        })
    });

    const data = await res.json();
    if (!data.success) {
        setPayLoading(false);
        alert(data.message || "Order creation failed");
        return;
    }

    // Razorpay order ID ko backend se fetch karna
    const orderID = data.order?.razorpayOrderId || data.order?.id;

    // Razorpay options
    const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: amount * 100, // Razorpay ko paisa paise me chahiye
        currency: "INR",
        name: "Shopovix",
        description: "Thanks for your purchase!",
        image: "https://www.shopovix.store/cdn/shop/files/Screenshot_2025-03-11_000546.png",
        order_id: orderID,
        handler: async function (response) {
            try {
                const verifyRes = await fetch("/api/verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        orderId: orderID,
                        paymentId: response.razorpay_payment_id,
                        signature: response.razorpay_signature
                    })
                });

                const verifyData = await verifyRes.json();
                if (verifyData.success) {
                    localStorage.setItem("orderCompleted", "true");
                    router.push(`/thank-you?name=${form.firstName}&orderId=${orderID}&total=${amount}&payment=ONLINE&address=${form.fullAddress}`);
                } else {
                    setPayLoading(false);
                    alert("⚠️ Payment verification failed!");
                }
            } catch (err) {
                console.error(err);
                setPayLoading(false);
                alert("Something went wrong while verifying payment.");
            }
        },
        prefill: {
            name: form.firstName,
            email: form.email,
            contact: form.number
        },
        theme: { color: "#3399cc" }
    };

    // Razorpay SDK check
    if (typeof window !== "undefined" && window.Razorpay) {
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    } else {
        console.error("❌ Razorpay SDK not loaded");
        alert("Payment gateway not loaded. Please refresh and try again.");
        setPayLoading(false);
    }
};

    const handleCOD = async () => {
        setPayLoading(true);
        try {
            const amount = products.reduce((acc, p) => acc + (p.product_price * p.quantity), 0);
            const res = await fetch("/api/customer", {
                method: "POST",
                body: JSON.stringify({
                    amount,
                    ...form,
                    products,
                    totalAmount: amount,
                    razorpayOrderId: "",
                    image: products[0].product_image,
                    customerName: form.firstName,
                    customerAddress: form.fullAddress,
                    paymentMethod: form.paymentMethod,
                }),
                headers: { "Content-Type": "application/json" }
            });

            if (!res.ok) {
                const text = await res.text();
                console.error("Server Error Response:", text);
                alert("Server error: " + text);
                return;
            }

            const data = await res.json();
            if (data.success) {
                localStorage.setItem("orderCompleted", "true");
                setPayLoading(false);
                setTimeout(() => {
                   
                        router.push(`/thank-you?name=${form.firstName}&orderId=${data.order._id}&total=${amount}&payment=${paymentMethod.method}&address=${form.fullAddress}`);
                    
                    // Optional: clear cart if needed
                }, 500);
            } else {
                alert(data.message || "Order failed");
            }
        } catch (err) {
            console.error("COD Error:", err);
            alert("Something went wrong while placing order.");
        }
    };

    if (!products.length) return <p className="text-center mt-10">Loading...</p>;

    return (
        <Suspense fallback={
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
                <Loader className="animate-spin text-blue-600 w-20 h-20" />
            </div>
        }>
            {payLoading && (
                <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
                    <LoaderCircle className="animate-spin text-blue-600 w-20 h-20" />
                </div>
            )}
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 py-10 px-6">
                {/* LEFT SECTION - ADDRESS + PAYMENT */}
                <div className="flex flex-col justify-center items-center">
                    <form
                        method="POST"
                        onSubmit={handleSubmit}
                        className="bg-white shadow-2xl rounded-2xl w-full max-w-lg p-8 flex flex-col gap-5"
                    >
                        {/* CONTACT DETAILS */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Contact Details</h2>
                            <input
                                className="bg-gray-100 mb-3 text-lg text-gray-700 w-full px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                                type="email"
                                placeholder="Your Email"
                                name="email"
                                value={form.email}
                                onChange={handlechange}
                            />
                            <input
                                className="bg-gray-100 text-lg text-gray-700 w-full px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                                type="number"
                                placeholder="Your Contact Number"
                                name="number"
                                value={form.number}
                                onChange={handlechange}
                            />
                        </div>

                        {/* DELIVERY DETAILS */}
                        <h2 className="text-2xl font-bold text-gray-800">Delivery Address</h2>
                        <input
                            className="bg-gray-100 text-lg text-gray-700 w-full px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                            type="text"
                            placeholder="Country/Region"
                            name="country"
                            value={form.country}
                            onChange={handlechange}
                        />
                        <div className="flex gap-3">
                            <input
                                className="bg-gray-100 text-lg text-gray-700 w-1/2 px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                value={form.firstName}
                                onChange={handlechange}
                            />
                            <input
                                className="bg-gray-100 text-lg text-gray-700 w-1/2 px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                                type="text"
                                placeholder="Last Name (optional)"
                                name="lastName"
                                value={form.lastName}
                                onChange={handlechange}
                            />
                        </div>
                        <input
                            className="bg-gray-100 text-lg text-gray-700 w-full px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                            type="text"
                            placeholder="Full Address"
                            name="fullAddress"
                            value={form.fullAddress}
                            onChange={handlechange}
                        />
                        <input
                            className="bg-gray-100 text-lg text-gray-700 w-full px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                            type="text"
                            placeholder="Apartment, Suite (optional)"
                            name="apartment"
                            value={form.apartment}
                            onChange={handlechange}
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                className="bg-gray-100 text-lg text-gray-700 px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                                type="text"
                                placeholder="City"
                                name="city"
                                value={form.city}
                                onChange={handlechange}
                            />
                            <input
                                className="bg-gray-100 text-lg text-gray-700 px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                                type="text"
                                placeholder="State"
                                name="state"
                                value={form.state}
                                onChange={handlechange}
                            />
                        </div>
                        <input
                            className="bg-gray-100 text-lg text-gray-700 w-full px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
                            type="number"
                            placeholder="Pincode"
                            name="pincode"
                            value={form.pincode}
                            onChange={handlechange}
                        />

                        {/* PAYMENT METHOD */}
                        <div className="paymentMethod mt-3">
                            <button
                                type="button"
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 flex justify-between   cursor-pointer  items-center px-4 py-3 rounded-xl text-white font-semibold w-full shadow-md"
                                onClick={() => setOpen(!open)}
                            >
                                {paymentMethod.method
                                    ? `Selected: ${paymentMethod.method}`
                                    : "Choose Payment Method"}
                                {open ? <ChevronUp /> : <ChevronDown />}
                            </button>
                            {open && (
                                <div className="flex flex-col gap-3 mt-3">
                                    <button
                                        type="button"
                                        className="bg-green-500  cursor-pointer  text-white rounded-xl py-3 shadow hover:bg-green-600 transition"
                                        onClick={() => {
                                            setPaymentMethod({ method: "COD" });
                                            setForm(prev => ({ ...prev, paymentMethod: "COD" }));
                                            setOpen(false);
                                        }}
                                    >
                                        {payLoading ? "redirecting..." : " Cash on Delivery"}
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-yellow-400 cursor-pointer  text-black rounded-xl py-3 shadow hover:bg-yellow-500 transition"
                                        onClick={() => {
                                            setPaymentMethod({ method: "ONLINE" });
                                            setForm(prev => ({ ...prev, paymentMethod: "ONLINE" }));
                                            setOpen(false);
                                        }}
                                    >
                                        Online Payment
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* SUBMIT BUTTON */}
                        <div className="mt-5">
                            <button
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (paymentMethod.method === "COD") {
                                        handleCOD();
                                    } else if (paymentMethod.method === "ONLINE") {
                                        handleBuyNow();
                                    } else {
                                        alert("Please select a payment method");
                                    }
                                }}
                                className="w-full cursor-pointer py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold shadow-lg hover:scale-[1.02] transition-transform"
                            >
                                PLACE ORDER
                            </button>
                        </div>
                    </form>
                </div>

                {/* RIGHT SECTION - PRODUCT SUMMARY */}
                <div className="flex flex-col justify-center items-center mt-8 md:mt-0">
                    <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6">
                        <h1 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h1>
                        {products.map((product, idx) => (
                            <div key={product._id || idx} className="flex gap-4 mb-4">
                                <img src={product.product_image[0]} alt={product.product_title} className="w-20 h-20 rounded-xl object-cover" />
                                <div>
                                    <h2 className="text-lg font-semibold">{product.product_title}</h2>
                                    <p className="text-gray-700 font-bold">₹{product.product_price} x {product.quantity}</p>
                                </div>
                            </div>
                        ))}
                        <div className="border-t pt-3 flex justify-between text-lg">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-semibold">
                                ₹{products.reduce((acc, p) => acc + (p.product_price * p.quantity), 0)}
                            </span>
                        </div>
                        <div className="flex justify-between text-lg mt-2">
                            <span className="text-gray-600 font-semibold">Total</span>
                            <span className="font-bold text-gray-900">
                                ₹{products.reduce((acc, p) => acc + (p.product_price * p.quantity), 0)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default Page;

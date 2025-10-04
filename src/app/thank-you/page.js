"use client"
// export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";
// export const revalidate = 0;
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Truck, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
export default function ThankYouPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    // Agar orderId nahi hai toh home pe redirect karo
    if (!orderId) {
      router.push("/");
    } else {
      // Order complete ho gaya to flag hata do taki repeat refresh pr redirect ho
      localStorage.removeItem("orderCompleted");
    }
  }, [searchParams, router]);

  const name = searchParams.get("name") || "Customer";
  const orderId = searchParams.get("orderId") || "N/A";
  const total = searchParams.get("total") || "N/A";
  const paymentMethod = searchParams.get("payment") || "N/A";
  const address = searchParams.get("address") || "Your provided address";

  return (
    <Suspense  fallback={<div className="flex justify-center items-center h-96"> <Loader className="animate-spin w-12 h-12 text-blue-500" />
        <LoaderCircle className="animate-spin text-blue-600 w-20 h-20" />
     </div>}>
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      {/* Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full text-center">
        {/* Success Icon */}
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Thank You, {name}! 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. A confirmation email has been sent to you.
        </p>

        {/* Order Summary */}
        <div className="bg-gray-100 rounded-xl p-5 text-left space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Order ID:</span>
            <span className="text-gray-900">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Total Amount:</span>
            <span className="text-gray-900">₹{total}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Payment Method:</span>
            <span className="text-gray-900">{paymentMethod}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">Delivery Address:</span>
            <span className="text-gray-900">{address}</span>
          </div>
        </div>

        {/* Track Order Section */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Truck className="text-blue-500 w-5 h-5" />
          <span className="text-gray-700">Your order will be delivered within 3-5 business days.</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
          {/* <Link
            href={`/TrackOrderP?orderId=${orderId}`}
            className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium text-gray-700"
          >
            Track Your Order
          </Link> */}
        </div>
      </div>
    </div>
    </Suspense>
  );
}

import crypto from "crypto";
import Order from "@/models/Orders";
import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB(); // DB connect

    const body = await req.json();
    const { orderId, paymentId, signature } = body;

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json({
        success: false,
        message: "Missing required payment fields",
      });
    }

    // Signature generate karna Razorpay secret se
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(orderId + "|" + paymentId)
      .digest("hex");

    if (generated_signature !== signature) {
      return NextResponse.json({ success: false, message: "Invalid signature" });
    }

    // Payment verified → order update
    const updatedOrder = await Order.findOneAndUpdate(
      { razorpayOrderId: orderId },
      { paymentStatus: "paid", orderStatus: "confirmed" },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ success: false, message: "Order not found" });
    }

    // Auto status update (demo ke liye fast transitions)
    setTimeout(async () => {
      try {
        const nextStatuses = ["shipped", "out for delivery", "delivered"];
        const delay = 10000; // 10s delay har step ke liye

        for (let status of nextStatuses) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          await Order.findByIdAndUpdate(updatedOrder._id, { orderStatus: status });
        }
      } catch (err) {
        console.error("Auto status update failed:", err.message);
      }
    }, 1000);

    return NextResponse.json({ success: true, message: "Payment verified and order updated" });
  } catch (err) {
    console.error("Verify API error:", err);
    return NextResponse.json({ success: false, message: err.message });
  }
}

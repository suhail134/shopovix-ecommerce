import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import Orders from "@/models/Orders";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { orderId } = await req.json();
    if (!orderId) {
      return NextResponse.json({ success: false, message: "Order ID is required" }, { status: 400 });
    }

    const order = await Orders.findById(orderId);
    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    // Cancel sirf tab ho jab order abhi ship/deliver nahi hua
    if (["Shipped", "delivered", "Cancelled"].includes(order.orderStatus)) {
      return NextResponse.json({ success: false, message: "Order cannot be cancelled" }, { status: 400 });
    }

    order.orderStatus = "Cancelled";
    await order.save();

    return NextResponse.json({ success: true, message: "Order cancelled successfully", order });
  } catch (error) {
    console.error("Cancel error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

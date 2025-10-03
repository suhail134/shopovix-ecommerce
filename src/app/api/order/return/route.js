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

    const { orderId, reason, action } = await req.json();
    if (!orderId) {
      return NextResponse.json({ success: false, message: "Order ID is required" }, { status: 400 });
    }

    const order = await Orders.findById(orderId);
    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    // CASE 1: Customer request
    if (action === "request" && order.orderStatus === "delivered") {
      order.orderStatus = "return requested";
      order.returnStatus = "pending";
      if (reason) order.returnReason = reason;
      await order.save();
      return NextResponse.json({ success: true, message: "Return request submitted", order });
    }

    // CASE 2: Admin accepts (merge + auto next statuses)
    if (action === "accept" && order.orderStatus === "return requested") {
      order.orderStatus = "accepted return request";
      order.returnStatus = "accepted";
      await order.save();

      // Auto next statuses (demo delay)
      setTimeout(async () => {
        try {
          const nextStatuses = ["Return in process", "Out for pickup", "Return picked up", "Return delivered"];
          let delay = 20000; // demo ke liye fast

          for (let i = 0; i < nextStatuses.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, delay));

            await Orders.findByIdAndUpdate(order._id, {
              orderStatus: nextStatuses[i],
              returnStatus: nextStatuses[i] === "Return delivered" ? "returned" : "",
            });


          }
        } catch (err) {
          console.error("Auto status update failed:", err.message);
        }
      }, 1000);

      return NextResponse.json({ success: true, message: "Return request accepted", order });
    }

    // CASE 3: Admin cancels
    if (action === "cancel request" && order.orderStatus === "return requested") {
      order.orderStatus = "cancelled return request";
      order.returnStatus = "cancelled";
      await order.save();
      return NextResponse.json({ success: true, message: "Return request cancelled", order });
    }

    // CASE 4: Customer cancels (allowed only till pickup not done)
    if (
      action === "cancel" &&
      (order.orderStatus === "return requested" || order.orderStatus === "accepted return request")
    ) {
      order.orderStatus = "delivered"; // back to normal
      order.returnStatus = "";
      order.returnReason = "";
      await order.save();
      return NextResponse.json({ success: true, message: "Return request cancelled by customer", order });
    }

    if (
      action === "cancel" &&
      (order.orderStatus === "Return in process" ||
        order.orderStatus === "Out for pickup" ||
        order.orderStatus === "Return picked up")
    ) {
      return NextResponse.json(
        { success: false, message: "Return already in progress, cannot cancel" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Invalid action or order status" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Return error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

import Orders from "@/models/Orders";
import connectDB from "@/db/connectDB";

export async function GET(req, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const order = await Orders.findById(id);
    if (!order) {
      return Response.json({ success: false, message: "Order not found" });
    }
    // ✅ Yaha correct key send karo (order)
    return Response.json({ success: true, order });
  } catch (error) {
    console.error("Error fetching single order:", error);
    return Response.json({ success: false, message: "Server error" });
  }
}


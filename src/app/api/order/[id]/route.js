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

// import Order from "@/models/Orders";
// import connectDB from "@/db/connectDB";
// import { NextResponse } from "next/server";

// export async function GET(req, { params }) {
//   await connectDB();
//   try {
//     const { id } = params;

//     // Populate product details from Product model
//     const order = await Order.findById(id)
//       .populate("products.productId", "product_title product_price product_image comparision_price")
//       .lean();

//     if (!order) {
//       return NextResponse.json({ success: false, message: "Order not found" });
//     }

//     // Map products for frontend
//     const productsWithDetails = order.products.map(item => ({
//       quantity: item.quantity,
//       product: item.productId // populated product object
//     }));

//     return NextResponse.json({ success: true, order: { ...order, products: productsWithDetails } });
//   } catch (error) {
//     return NextResponse.json({ success: false, message: error.message });
//   }
// }
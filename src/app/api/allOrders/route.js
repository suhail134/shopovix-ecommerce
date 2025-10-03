// import Order from "@/models/Orders";
// import connectDB from "@/db/connectDB";
// import { NextResponse } from "next/server";

// export async function GET(req){
//   await connectDB();
//   try {
//   const returnRequests = await Order.find({ returnStatus: "pending" });
//     const allorders=await Order.find().sort({createdAt:-1});
//     if (!allorders || allorders.length === 0) {
//       return NextResponse.json({ success: false, message: "No orders found" });
//     }

//     return NextResponse.json({success:true,allorders,returnRequests})
//   } catch (error) {
//     return NextResponse.json({success:false,message:error.message})
//   }
// }



import Order from "@/models/Orders";
import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  try {
    // Sabhi orders ek hi query me lao aur product details populate karo
    const allorders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("products._id", "product_title product_price product_image comparision_price")
      .lean();

    if (!allorders || allorders.length === 0) {
      return NextResponse.json({ success: false, message: "No orders found" });
    }

    // Return requests nikalne ke liye filter
    const returnRequests = allorders.filter(order => order.returnStatus === "pending");

    return NextResponse.json({ success: true, allorders, returnRequests });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

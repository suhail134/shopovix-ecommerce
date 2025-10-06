import Reviews from "@/models/Reviews";
import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function GET(req) {
  await connectDB();

  try {
    // Get session securely
    const session = await getServerSession();

    if (!session || !session.user?.email) {

      return NextResponse.json({ success: false, message: "Please Sign In First" }, { status: 401 });
    }

    const email = session.user.email.toLowerCase();

    const reviews = await Reviews.find({ email }).sort({ createdAt: -1 });
    if (!reviews || reviews.length === 0) {

      return NextResponse.json({ success: true, reviews: [] });
    }
    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}




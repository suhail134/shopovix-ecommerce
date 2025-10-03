import Admin from "@/models/Admin";
import connectDB from "@/db/connectDB";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password } = body; // username remove, use nahi ho raha

    // Admin check
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json({
        success: false,
        error: true,
        message: "Admin not found",
      });
    }

    // Password verify
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        error: true,
        message: "Invalid password",
      });
    }

    // JWT token generate
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET, // .env me JWT_SECRET set karna
      { expiresIn: "1d" }
    );

    return NextResponse.json({
      success: true,
      error: false,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({
      success: false,
      error: true,
      message: "Server error",
    });
  }
}

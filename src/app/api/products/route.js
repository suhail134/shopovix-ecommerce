import Product from "@/models/Product";
import connectDB from "@/db/connectDB";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const product_title = formData.get("product_title");
    const product_desc = formData.get("product_desc");
    const product_price = formData.get("product_price");
    const comparision_price = formData.get("comparision_price") || 0;
    const category = formData.get("category");
    const imagesFiles = formData.getAll("product_image");

    if (!product_title || !product_desc || !product_price || !category || imagesFiles.length === 0) {
      return new Response(JSON.stringify({ success: false, message: "All fields are required" }), { status: 400 });
    }

    const uploadedImages = [];

    for (let file of imagesFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });
      uploadedImages.push(result.secure_url);
    }

    const newProduct = await Product.create({
      product_title,
      product_desc,
      product_price,
      comparision_price,
      category,
      product_image: uploadedImages
    });

    return new Response(JSON.stringify({ success: true, product: newProduct }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, message: "Server error" }), { status: 500 });
  }
}



export async function GET() {
  try {
    await connectDB();
    // const product = await Product.findById(params.id);
    const products = await Product.find().sort({ createdAt: -1 }); // latest first
    return Response.json({ success: true, products });
  } catch (error) {
    return Response.json({ success: false, message: "Server error" });
  }
}


// src/app/api/products/[id]/route.js



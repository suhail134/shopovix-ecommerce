import Product from "@/models/Product";
import connectDB from "@/db/connectDB";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function GET(req, { params }) {
  await connectDB();
  const { id } = params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return Response.json({ success: false, message: "Product not found" });
    }
    return Response.json({ success: true, product });
  } catch (error) {
    return Response.json({ success: false, message: "Server error" });
  }
}


export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ success: false, message: "Product ID is required" }), { status: 400 });
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return new Response(JSON.stringify({ success: false, message: "Product not found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true, message: "Product deleted successfully" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}


export async function PATCH(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const id = formData.get("id");
    const product_title = formData.get("product_title");
    const product_desc = formData.get("product_desc");
    const category = formData.get("category");
    const product_price = formData.get("product_price");
    const comparision_price = formData.get("comparision_price");

    // Get all images (array)
    const imagesFiles = formData.getAll("product_image");
    let uploadedImages = [];
   if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: "Product ID is required" }),
        { status: 400 }
      );
    }
    // Upload each image to Cloudinary
    for (let file of imagesFiles) {
      if (file && file.size > 0) {
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
    }

    // Prepare update fields
    let updatedFields = {
      product_title,
      category,
      product_desc,
      product_price,
      comparision_price,
    };

    // Only update images if new images are uploaded
    if (uploadedImages.length > 0) {
      updatedFields.product_image = uploadedImages;
    }

    const updateproduct = await Product.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );

    if (!updateproduct) {
      return new Response(
        JSON.stringify({ success: false, message: "Product not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Product updated successfully",
        products: updateproduct,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /Product error:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message || "Server error" }),
      { status: 500 }
    );
  }
}
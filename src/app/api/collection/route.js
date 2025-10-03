import connectDB from "@/db/connectDB";
import Collection from "@/models/Collection";
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
    const collection_title = formData.get("collection_title");
    const collection_desc = formData.get("collection_desc");
    // const category = formData.get("category");
    let category=formData.get("category");
    const imageFile = formData.get("collection_image"); // ✅ Single image

    // ✅ Validate fields first
    if (!collection_title || !collection_desc || !imageFile || !category) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields are required" }),
        { status: 400 }
      );
    }
category = encodeURIComponent(category.trim());
    // ✅ Check for existing collection
    const existingCollection = await Collection.findOne({ category });
    if (existingCollection) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Collection Already Exists. Please choose different category",
        }),
        { status: 409 }
      );
    }

    // ✅ Upload single image to Cloudinary
    const buffer = Buffer.from(await imageFile.arrayBuffer());
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

    // ✅ Create new collection with single image URL
    const newCollection = await Collection.create({
      collection_title,
      collection_desc,
      collection_image: result.secure_url, // ✅ single image URL
      category,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Collection Created successfully",
        collection: newCollection,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /collection error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Server error",
      }),
      { status: 500 }
    );
  }
}



export async function GET() {
  try {
    await connectDB();
    // const Collection=decodeURIComponent(require('@/models/Collection').default);
    const collection = await Collection.find().sort({ createdAt: -1 });
    // Decode category names before sending response
    
    const decodedCollections = collection.map((col) => ({
      ...col._doc,
      category: decodeURIComponent(col.category),
    }));
    return new Response(
      JSON.stringify({ success: true, collection: decodedCollections }),
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /collection error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
}


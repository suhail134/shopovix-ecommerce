import Collection from "@/models/Collection";
import connectDB from "@/db/connectDB";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { id } = params;
        if (!id) {
            return new Response(JSON.stringify({ success: false, message: "Collection id is requird" }), { status: 400 });
        }
        const deletedCollection = await Collection.findByIdAndDelete(id);
        if (!deletedCollection) {
            return new Response(JSON.stringify({ success: false, message: "Collection not found" }), { status: 404 });
        }
        return new Response(JSON.stringify({ success: true, message: "Collection deleted successfully" }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
    }
}




export async function PATCH(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const id = formData.get("id");
    const collection_title = formData.get("collection_title");
    const collection_desc = formData.get("collection_desc");
    const category = formData.get("category");
    const imageFile = formData.get("collection_image");

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: "Collection ID is required" }),
        { status: 400 }
      );
    }

    let updatedFields = { collection_title, collection_desc, category };

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "collections" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      updatedFields.collection_image = result.secure_url;
    }

    const updatedCollection = await Collection.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );

    if (!updatedCollection) {
      return new Response(
        JSON.stringify({ success: false, message: "Collection not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Collection updated successfully",
        collection: updatedCollection,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /collection error:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message || "Server error" }),
      { status: 500 }
    );
  }
}


export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = params;
    if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: "Collection ID is required" }),
        { status: 400 }
      );
    }

    const collection = await Collection.findById(id);

    if (!collection) {
      return new Response(
        JSON.stringify({ success: false, message: "Collection not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, collection }),
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /collection/[id] error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
}

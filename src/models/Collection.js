import mongoose from "mongoose";
// import { unique } from "next/dist/build/utils";

const CollectionSchema = new mongoose.Schema({
    collection_title: {
        type: String,
        required: true
    },
    collection_desc: {
        type: String,
        required: true,

    },

   collection_image: {
        type: String, // URL store karega
        required: true
    },
    category: {
        type: String,
        required: true,
        unique: true ,// Ensure category is unique to prevent duplicate collections
        index: true // Create an index on the category field for faster lookups

    }

},
    { timestamps: true });

export default mongoose.models.Collection || mongoose.model("Collection", CollectionSchema);
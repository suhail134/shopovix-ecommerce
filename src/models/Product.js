import mongoose from "mongoose";
// import { unique } from "next/dist/build/utils";

const ProductSchema = new mongoose.Schema({
    product_title: {
        type: String,
        required: true
    },
    product_desc: {
        type: String,
        required: true,

    },
    product_price: {
        type: Number,
        required: true
    },
    comparision_price: {
        type: Number,
        // required: true
    },

    product_image: {
        type: [String], // URL store karega
        required: true
    },
    category: {
        type: String,
        required: true
    }

},
    { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
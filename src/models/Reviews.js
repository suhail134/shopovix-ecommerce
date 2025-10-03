import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  ProductId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  customerName: { type: String, required: true },
  email: { type: String },
  rating: { type: Number, min: 1, max: 5, required: true },
  desc: { type: String },
  images: [String], // Uploaded images URLs
  // videos: [String], // Uploaded video URLs
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);

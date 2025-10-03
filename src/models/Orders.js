import mongoose from "mongoose";
//lets create customer name also in this schema 
const OrderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  products: [
    {
      productId: String,
      quantity: Number,
      product_image:String,
      product_title: String,
      product_price: Number,
      comparision_price: Number,
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
    }
  ],
  customerName: String,// New field for customer name
  customerAddress: String,

  razorpayOrderId: {
    type: String, required: function () {
      return this.paymentMethod !== "COD"
    }
  },
  totalAmount: Number,
  email: {
    type: String,
    required: true,
    lowercase: true,
    // unique: true
  },
  returnReason: {
    type: String,
    default: "",
  },
  returnRequestedAt: {
    type: Date,
  },
  returnStatus: {
    type: String,
    default: "pending", // pending, requested, in process, returned

  },
  deliveredAt: {
    type: Date,
  },

  paymentStatus: { type: String, default: "pending" },
  paymentMethod: { type: String, default: "COD" },
  orderStatus: { type: String, default: "processing", lowercase: true },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
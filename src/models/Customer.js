import mongoose from "mongoose";
// import { unique } from "next/dist/build/utils";

const CustomerSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        // unique: true
    },
    country: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String
    },

    fullAddress: {
        type: String,

    },

    apartment: {
        type: String,

    },

    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    pincode: {
        type: Number,
        required: true
    },
    
    oid: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true });

export default mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);
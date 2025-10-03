import mongoose from "mongoose";
// import { unique } from "next/dist/build/utils";

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function () {
            // Sirf tab required hoga jab provider "credentials" hoga
            return this.provider === "credentials";
        }
    }
  


},
{ timestamps: true });

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
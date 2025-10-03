import Admin from "@/models/Admin";
import connectDB from "@/db/connectDB";
import bcrypt from 'bcrypt'
export async function POST(req) {
    try {


        await connectDB()
        const body = await req.json()
        const { username, email, password } = body
        const existinguser = await Admin.findOne({ email })
        if (existinguser) {
            return Response.json({ success: false, error: true, message: "Admin Already Exists please choose different Adminname and email" })
        }
        const hashedpassword = await bcrypt.hash(password, 10)
        const newAdmin = await Admin.create({
            email,
            username,
            password: hashedpassword
        })
        return Response.json({ success: true, error: false, message: "signup successfull", admin: newAdmin })
    } catch (error) {
        return Response.json({
            success: false,
            error: true,
            message: "Server error",
        });
    }
}


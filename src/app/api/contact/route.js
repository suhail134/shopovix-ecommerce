import connectDB from "@/db/connectDB";
import Contact from "@/models/Contact";

export async function POST(req){
    try {
        await connectDB()
        const body=await req.json()
        const {name,email,message}=body
        if(!name || !email ||!message){
            return Response.json({success:false,message:"All fields are required"})
        }

        const newContact=await  Contact.create({
            name,
            email,
            message
        })
        // await newContact.save()
        return Response.json({
            success:true,message:"Message sent successfully",contact:newContact
        })
    } catch (error) {
        
        return Response.json({
            success:false, error:true,message:"Server error please try again later"
        })
    }
}
export async function GET(req){
    try {
        await connectDB()
        const contacts=await Contact.find().sort({createdAt:-1}) // latest first
        return Response.json({success:true,contacts})
    } catch (error) {
        return Response.json({
            success:false,message:"Server error please try again later"
        })
    }
}
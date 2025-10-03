import connectDB from "@/db/connectDB";
import Subscriber from "@/models/Subscriber";

export async function POST(req){
    try {
        await connectDB()
        const body=await req.json()
        const {email}=body
        if(!email ){
            return Response.json({success:false,message:"Email is required"})
        }

        const newSubscriber=await  Subscriber.create({
            email       
        })
        // await newSubscriber.save()
        return Response.json({
            success:true,message:"Subscribed  successfully",Subscriber:newSubscriber
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
        const Subscribers=await Subscriber.find().sort({createdAt:-1}) // latest first
        return Response.json({success:true,Subscribers})
    } catch (error) {
        return Response.json({
            success:false,message:"Server error please try again later"
        })
    }
}
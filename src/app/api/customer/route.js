import Customer from "@/models/Customer";
// import Order from "@/models/Orders";
import Order from "@/models/Orders";
import connectDB from "@/db/connectDB";
import Razorpay from "razorpay";
import { NextResponse } from "next/server";
// import payments from "razorpay/dist/types/payments";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { paymentMethod, ...rest } = body;
    const email = body.email?.toLowerCase(); // lowercase email

    if (paymentMethod === "COD") {
      const {
        number, country, firstName, fullAddress, apartment, city, state, pincode,
        products, totalAmount, image, customerAddress, customerName
      } = rest;

      if (!email || !number || !country || !firstName || !fullAddress || !city || !state || !pincode) {
        return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
      }

      const customer = await Customer.findOneAndUpdate(
        { email, number },
        { email, number, country, firstName, fullAddress, apartment, city, state, pincode },
        { new: true, upsert: true }
      );

      // const order = await Order.create({
      //   customer: customer._id,
      //   email,
      //   customerAddress,
      //   products,
      //   totalAmount,
      //   image,
      //   customerName,
      //   razorpayOrderId: null,
      //   paymentMethod,
      //   paymentStatus: "pending",
      //   orderStatus: "processing"
      // });

      const order = await Order.create({
        customer: customer._id,
        email,
        customerAddress,
        products: products.map(p => ({
          ...p,
          product_image: Array.isArray(p.product_image) ? p.product_image[0] : p.product_image
        })),
        totalAmount,
        image: Array.isArray(products[0].product_image) ? products[0].product_image[0] : products[0].product_image,
        customerName,
        razorpayOrderId: null,
        paymentMethod,
        paymentStatus: "pending",
        orderStatus: "processing"
      });


     
// sirf COD ya paid ke liye auto status update
if(order.paymentMethod === "COD"){
 setTimeout(async () => {
  try {
    const nextStatuses = ["shipped", "out for delivery", "delivered"];
    let delay = 30000; // 30s delay
    for (let i = 0; i < nextStatuses.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      
      // agar last status "delivered" hai to paymentStatus bhi update karo
      const updateData = { orderStatus: nextStatuses[i] };
      if (nextStatuses[i] === "delivered") {
        updateData.paymentStatus = "paid";
      }

      await Order.findByIdAndUpdate(order._id, updateData);
      
    }
  } catch (err) {
    console.error("Auto status update failed:", err.message);
  }
}, 1000);

}
 
      return NextResponse.json({
        success: true,
        error: false,
        message: "Order created Successfully",
        order,
        customer
      });
    } else {
      const {
        amount, number, country, firstName, fullAddress, apartment, city, state, pincode,
        products, totalAmount, razorpayOrderId, image, customerAddress, customerName
      } = body;

      if (!email || !number || !country || !firstName || !fullAddress || !city || !state || !pincode) {
        return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
      }

      var instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET
      });

      let options = {
        amount: amount * 100, // amount in the smallest currency unit
        currency: "INR"
      };

      let razorpayOrder;
      try {
        razorpayOrder = await instance.orders.create(options);
      } catch (err) {
        return NextResponse.json({
          success: false,
          message: err.error?.description || err.message
        });
      }

      const customer = await Customer.findOneAndUpdate(
        { email, number },
        {
          oid: razorpayOrder.id,
          email,
          number,
          country,
          firstName,
          fullAddress,
          apartment,
          city,
          state,
          pincode
        },
        { new: true, upsert: true }
      );

      const order = await Order.create({
        customer: customer._id,
        email,
        customerAddress,
        products:products.map(p => ({
          ...p,
          product_image: Array.isArray(p.product_image) ? p.product_image[0] : p.product_image
        })),
        totalAmount,
        image: Array.isArray(products[0].product_image) ? products[0].product_image[0] : products[0].product_image,
        customerName,
        razorpayOrderId: razorpayOrder.id,
        paymentStatus: "pending",
        orderStatus: "processing",
        paymentMethod,
      });

      // const order = await Order.create({
      //   customer: customer._id,
      //   email,
      //   customerAddress,
      //   products: products.map(p => ({
      //     ...p,
      //     product_image: Array.isArray(p.product_image) ? p.product_image[0] : p.product_image
      //   })),
      //   totalAmount,
      //   image: Array.isArray(products[0].product_image) ? products[0].product_image[0] : products[0].product_image,
      //   customerName,
      //   razorpayOrderId: razorpayOrder.id,
      //   paymentMethod,
      //   paymentStatus: "pending",
      //   orderStatus: "processing"
      // });

    // sirf COD ya paid ke liye auto status update
if(order.paymentStatus === "paid"){
  setTimeout(async () => {
    try {
      const nextStatuses = ["shipped", "out for delivery", "delivered"];
      let delay = 30000; // 30s delay for demo
      for (let i = 0; i < nextStatuses.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        await Order.findByIdAndUpdate(order._id, {
          orderStatus: nextStatuses[i],
        });

      }
    } catch (err) {
      console.error("Auto status update failed:", err.message);
    }
  }, 1000);
}


      return NextResponse.json({
        success: true,
        order: razorpayOrder,
        order,
        customer
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.stack
    });
  }
}


// Get latest customer (for pre-filling form) this api is called from the frontend when the user is about to place an order so that we can pre-fill the form with the latest customer details if available in simple words it fetches the most recent customer details from the database to make it easier for returning customers to place orders without re-entering their information and it is a GET request and you can see that in the frontend we are calling this api using fetch("/api/customer") and it returns the latest customer details in json format and if there is no customer found it returns a message "No customer found" you should call thsis api in the checkout page when the user is about to place an order inside chekout page you can use useEffect to call this api and then set the form fields with the returned customer details and if there is no customer found you can leave the form fields empty and the work of sort({createdAt:-1}) is to sort the customers in descending order based on their creation date so that the latest customer comes first for example  if there are 3 customers in the database customer A created on 1st Jan customer B created on 5th Jan and customer C created on 10th Jan when we call this api it will return customer C first then customer B and then customer A because customer C is the latest customer and if there are no customers in the database it will return a message "No customer found"

export async function GET(req) {
  await connectDB();

  try {
    const customer = await Customer.findOne().sort({ createdAt: -1 }); // latest customer
    if (!customer) {
      return NextResponse.json({ success: false, message: "No customer found" });
    }

    return NextResponse.json({ success: true, customer });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message });
  }
}


import { NextResponse } from "next/server";
import Product from "@/models/Product";
import Collection from "@/models/Collection";
import connectDB from "@/db/connectDB";

export async function GET(req) {
  try {
    await connectDB();
// Extract the search query from the request URL and if there is no query return an empty array for both products and collections ,search query is a string that the user wants to search for in the products and collections and it is passed as a query parameter in the URL

//searchParams is a built-in object in JavaScript that allows you to work with the query string of a URL and URL is a built-in object in JavaScript that represents a URL and provides methods to work with its components and req.url is the full URL of the incoming request so we create a new URL object using req.url and then we extract the searchParams from that URL object
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || ""; // ✅ match with frontend
//if there is no query return an empty array for both products and collections
    if (!query) {
      return NextResponse.json({
        success: true,
        results: {
          products: [],
          collections: [],
        },
      });
    }
//in this opbject we are searching the products and collections in the database using the query provided by the user and returning the results to the frontend and limiting the results to 10 for both products and collections work of limit is to limit the number of results returned to 10 for example if there are 100 products in the database only 10 will be returned to the frontend when the user searches for a product or collection if user search for a product or collection that does not exist in the database an empty array will be returned to the frontend 
    const products = await Product.find({
      //the work of "$or" is to search in multiple fields in details this case product_title, product_desc, category fields 
      $or: [
        { product_title: { $regex: query, $options: "i" } },
        { product_desc: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    }).limit(10);

    const collections = await Collection.find({
      $or: [
        { collection_title: { $regex: query, $options: "i" } },
        { collection_desc: { $regex: query, $options: "i" } },
      ],
    }).limit(10);
//returning the results to the frontend
    return NextResponse.json({
      success: true,
      results: {
        products,
        collections,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error" });
  }
}
// src/app/api/search/route.js
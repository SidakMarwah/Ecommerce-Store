import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/database";
import Product from "@/lib/models/Product.model";
import { NextResponse as NextResponseType } from "next/server";
import { Types } from "mongoose";

export async function POST(request: Request): Promise<NextResponseType> {
    // Connect to the database
    await connectToDB();

    try {
        // Parse the incoming JSON request body
        const { productIds } = await request.json();

        // Validate that productIds is an array
        if (!productIds || !Array.isArray(productIds)) {
            return NextResponse.json(
                { message: "Invalid or missing product IDs" },
                { status: 400 }
            );
        }

        // Validate all product IDs
        const invalidIds = productIds.filter((id) => !Types.ObjectId.isValid(id));
        if (invalidIds.length > 0) {
            return NextResponse.json(
                { message: `Invalid product IDs: ${invalidIds.join(", ")}` },
                { status: 400 }
            );
        }

        // Fetch product details for the provided IDs
        const products = await Product.find({ _id: productIds });

        // If no products are found, return an appropriate message
        if (products.length === 0) {
            return NextResponse.json(
                { message: "No products found for the provided IDs" },
                { status: 404 }
            );
        }

        // Return the fetched products as JSON
        return NextResponse.json(products, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error fetching cart products:", error);
            return NextResponse.json(
                { message: "Failed to fetch products. " + error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "An unexpected error occurred." },
            { status: 500 }
        );
    }
}

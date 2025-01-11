import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/database";
import Category from "@/lib/models/Category.model";
import Product from "@/lib/models/Product.model";
import { NextResponse as NextResponseType } from "next/server";
import { Types } from "mongoose";

export async function GET(request: Request): Promise<NextResponseType> {
    await connectToDB();

    try {
        const url = new URL(request.url);
        const categoryId = url.searchParams.get("category");

        // If category is not provided, return all products
        if (!categoryId) {
            const products = await Product.find().limit(10); // Fetch general products
            return NextResponse.json(products, { status: 200 });
        }

        // If category is provided, validate the category ID
        if (!Types.ObjectId.isValid(categoryId)) {
            return NextResponse.json(
                { message: "Invalid Category ID" },
                { status: 400 }
            );
        }

        // Fetch the requested category
        const category = await Category.findById(categoryId);

        if (!category) {
            return NextResponse.json(
                { message: "Category not found" },
                { status: 404 }
            );
        }

        // If the category is a parent, find its child categories
        const childCategories = await Category.find({ parent: category._id });

        // Prepare an array of category IDs (current + children)
        const categoryIds = [category._id, ...childCategories.map((child) => child._id)];

        // Fetch products that belong to any of these categories
        const products = await Product.find({ category: { $in: categoryIds } }).limit(10);

        return NextResponse.json({ products, category }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error fetching category products:", error);
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

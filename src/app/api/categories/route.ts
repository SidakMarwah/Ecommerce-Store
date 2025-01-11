import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/database";
import Category from "@/lib/models/Category.model";
import { NextResponse as NextResponseType } from "next/server";
import { Category as CategoryType } from "@/types";

export async function GET(): Promise<NextResponseType> {
    // Connect to the database
    await connectToDB();

    try {
        // Fetch all categories
        const categories: Array<CategoryType> = await Category.find().populate<{ parent: CategoryType }>('parent').exec();

        // Return the categories with a 200 status
        return NextResponse.json(categories, { status: 200 });
    } catch (error: unknown) {
        // Handle any errors and send a 500 response with the error message
        if (error instanceof Error) {
            console.error("Error fetching categories:", error);
            return NextResponse.json({ message: "Failed to fetch categories. " + error.message }, { status: 500 });
        }

        // Catch any unexpected errors
        return NextResponse.json({ message: "An unexpected error occurred." }, { status: 500 });
    }
}

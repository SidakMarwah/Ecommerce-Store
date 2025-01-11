import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/database";
import Product from "@/lib/models/Product.model";
import { Product as ProductType } from "@/types";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    await connectToDB();

    try {
        const productId = (await params).id;

        if (!productId) {
            return NextResponse.json({ message: "Product ID is required." }, { status: 400 });
        }
        console.log(productId);


        const product: ProductType | null = await Product.findById(productId)
            .populate("category") // Populate the category field if needed
            .lean();

        if (!product) {
            return NextResponse.json({ message: "Product not found." }, { status: 404 });
        }

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json({ message: "An error occurred while fetching the product." }, { status: 500 });
    }
}

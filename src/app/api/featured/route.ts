import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/database";
import Featured from "@/lib/models/Featured.model";
// import Product from "@/lib/models/Product.model";
import { NextResponse as NextResponseType } from "next/server";
import { Product as ProductType } from "@/types";
import { Featured as FeaturedType } from "@/types";

export async function GET(): Promise<NextResponseType> {
    await connectToDB();

    try {
        const featuredProducts: (FeaturedType & { product: ProductType })[] = await Featured.find().populate<{ product: ProductType }>("product");
        return NextResponse.json(featuredProducts, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error fetching featured products:", error);
            return NextResponse.json({ message: "Failed to fetch featured products. " + error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "An unexpected error occurred." }, { status: 500 });
    }
}

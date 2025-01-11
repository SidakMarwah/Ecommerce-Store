import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/database";
import Product from "@/lib/models/Product.model";
import { NextResponse as NextResponseType } from "next/server";
// import { Types } from "mongoose";
import Order from "@/lib/models/Order.model";

export async function POST(request: Request): Promise<NextResponseType> {
    // Connect to the database
    await connectToDB();

    try {
        // Parse the incoming JSON request body
        const { name, email, address, city, postalCode, country, phone, products } = await request.json();

        // console.log({ name, email, address, city, postalCode, country, phone, products });

        const productIds: string[] = products;

        const uniqueIds = [...new Set(productIds)];
        const productsInfos = await Product.find({ _id: uniqueIds });

        let totalAmount = 0;

        const itemsOrdered = [];
        for (const productId of uniqueIds) {
            const productInfo = productsInfos.find(p => p._id.toString() === productId);
            const quantity = productIds.filter(id => id === productId).length || 0;

            if (quantity > 0 && productInfo) {
                // Calculate the subtotal for the item
                const price = productInfo.price || 0;
                const subTotal = Number(productInfo.price) * quantity;
                totalAmount += subTotal;

                itemsOrdered.push({
                    productId: productInfo._id.toString(),
                    title: productInfo.title,
                    price: Number(price),
                    quantity: quantity,
                    subTotal: subTotal,
                });
            }
        }

        const orderInfo = await Order.create({
            customerInfo: {
                name, email, address, city, postalCode, country, phone
            },
            itemsOrdered,
            totalAmount: totalAmount,
            paid: false
        })

        // Send the response with the line items
        return NextResponse.json({ orderInfo }, { status: 200 });

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error while checkout.", error);
            return NextResponse.json(
                { message: "Failed to checkout." + error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "An unexpected error occurred." },
            { status: 500 }
        );
    }
}

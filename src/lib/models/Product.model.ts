import { Product as ProductType } from "@/types";
import mongoose, { Model, model, models, Schema } from "mongoose";

const ProductSchema: Schema = new Schema({
    title: { type: String, required: [true, 'Product title is required.'] },
    description: { type: String },
    price: { type: String, required: [true, 'Product price is required.'] },
    images: [{ type: String }],
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    properties: { type: Object }
}, {
    timestamps: true,
});

const Product: Model<ProductType> = models.Product || model<ProductType>('Product', ProductSchema);

export default Product;
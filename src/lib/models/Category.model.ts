import { Category as CategoryType } from '@/types';
import mongoose, { model, models, Schema, Model } from 'mongoose';


// Create the schema for Category
const CategorySchema: Schema = new Schema<CategoryType>({
    name: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId, ref: 'Category' },
    properties: [{ type: Object }]
});

// Create or retrieve the model for Category
const Category: Model<CategoryType> = models.Category || model<CategoryType>('Category', CategorySchema);

export default Category;

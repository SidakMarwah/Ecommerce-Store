import mongoose, { model, models, Schema, Model } from 'mongoose';
import { Featured as FeaturedType } from '@/types'; // Adjust the path as necessary

// Create the schema for Featured
const FeaturedProductSchema: Schema = new Schema<FeaturedType>({
    product: { type: mongoose.Types.ObjectId, ref: 'Product', required: true }
});

// Create or retrieve the model for Featured
const Featured: Model<FeaturedType> = models.Featured || model<FeaturedType>('Featured', FeaturedProductSchema);

export default Featured;

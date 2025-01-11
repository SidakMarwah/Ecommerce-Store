import mongoose from 'mongoose';

let isConnected = false; // Track the connection status

export const connectToDB = async (): Promise<void> => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        // MongoDB is already connected
        return;
    }

    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        await mongoose.connect(process.env.MONGODB_URI);

        isConnected = true;
        // MongoDB connected successfully
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Failed to connect to MongoDB:', error.message);
        } else {
            console.error('An unknown error occurred while connecting to MongoDB');
        }
    }
};

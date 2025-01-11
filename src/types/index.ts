import { Types } from "mongoose";

export type Product = {
    _id?: string;
    title: string;
    description?: string;
    price: string;
    images: string[];
    category: Types.ObjectId | Category; // It can either be an ObjectId or a populated Category object
    properties?: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
};

export type Featured = {
    _id?: string;
    product: Types.ObjectId | Product; // It can either be an ObjectId or a populated Product object
};

export type Category = {
    _id?: string;
    name: string;
    parent?: Types.ObjectId | Category; // Parent category ID as a string
    properties?: Record<string, any>[]; // Array of properties
    createdAt?: Date;
    updatedAt?: Date;
};

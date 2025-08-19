import mongoose, { Schema, Document } from "mongoose";

export interface Review {
    rating: number;
    comment: string;
    date: Date;
    reviewerName: string;
    reviewerEmail: string;
}

export interface Dimensions {
    width: number;
    height: number;
    depth: number;
}

export interface Product extends Document {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: Dimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: {
        createdAt: Date;
        updatedAt: Date;
        barcode: string;
        qrCode: string;
    };
    images: string[];
    thumbnail: string;
}

const productSchema = new Schema<Product>({
    id: { type: String, required: true },
    title: String,
    description: String,
    category: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    tags: [String],
    brand: String,
    sku: String,
    weight: Number,
    dimensions: {
        width: Number,
        height: Number,
        depth: Number,
    },
    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: String,
    reviews: [
        {
            rating: Number,
            comment: String,
            date: Date,
            reviewerName: String,
            reviewerEmail: String,
        },
    ],
    returnPolicy: String,
    minimumOrderQuantity: Number,
    meta: {
        createdAt: Date,
        updatedAt: Date,
        barcode: String,
        qrCode: String,
    },
    images: [String],
    thumbnail: String,
});

export default mongoose.model<Product>("Product", productSchema);

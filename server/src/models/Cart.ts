import mongoose, { Schema, Document } from "mongoose";

export interface Cart extends Document {
    id: string;
    title: string;
    price: number;
    count: number;
    thumbnail: string;
    discountPercentage: number;
}

const cartSchema = new Schema<Cart>({
    id: String,
    title: String,
    price: Number,
    count: Number,
    thumbnail: String,
    discountPercentage: Number,
});

export default mongoose.model<Cart>("Cart", cartSchema);

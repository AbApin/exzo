import mongoose, { Schema, Document } from "mongoose";

export interface Favourite extends Document {
    id: string;
    title: string;
    category: string;
    price: number;
    thumbnail: string;
    discountPercentage: number;
}

const favouriteSchema = new Schema<Favourite>({
    id: String,
    title: String,
    category: String,
    price: Number,
    thumbnail: String,
    discountPercentage: Number,
});

export default mongoose.model<Favourite>("Favourite", favouriteSchema);

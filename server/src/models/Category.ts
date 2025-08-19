import mongoose, { Schema, Document } from "mongoose";

export interface Category extends Document {
    id: string;
    slug: string;
    name: string;
}

const categorySchema = new Schema<Category>({
    id: String,
    slug: String,
    name: String,
});

export default mongoose.model<Category>("Category", categorySchema);

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import productRoutes from "./routes/productRoutes";
import favouriteRoutes from "./routes/favouriteRoutes";
import cartRoutes from "./routes/cartRoutes";
import categoryRoutes from "./routes/categoryRoutes";

dotenv.config();
const app = express();

app.use(cors({
    origin: "https://exzo.vercel.app"
}));
app.use(express.json());

app.use("/products", productRoutes);
app.use("/favourites", favouriteRoutes);
app.use("/carts", cartRoutes);
app.use("/categories", categoryRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI as string).then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

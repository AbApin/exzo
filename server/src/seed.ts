import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product";
import Category from "./models/Category";
import Favourite from "./models/Favourite";
import Cart from "./models/Cart";
import data from "../db.json"; // adjust path

dotenv.config();

const run = async () => {
    await mongoose.connect(process.env.MONGO_URI as string);
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Favourite.deleteMany({});
    await Cart.deleteMany({});

    await Product.insertMany(data.products);
    await Category.insertMany(data.categories);

    console.log("Database seeded!");
    process.exit();
};

run();

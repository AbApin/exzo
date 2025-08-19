import express from "express";
import Product from "../models/Product";

const router = express.Router();

// GET all products or filter by category
router.get("/", async (req, res) => {
    const { category, _limit } = req.query;
    let query: any = {};
    if (category) query.category = category;

    let products = Product.find(query);
    if (_limit) products = products.limit(Number(_limit));

    res.json(await products);
});

// GET product by id
router.get("/:id", async (req, res) => {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
});

export default router;

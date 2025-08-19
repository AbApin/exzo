"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Product_1 = __importDefault(require("../models/Product"));
const router = express_1.default.Router();
// GET all products or filter by category
router.get("/", async (req, res) => {
    const { category, _limit } = req.query;
    let query = {};
    if (category)
        query.category = category;
    let products = Product_1.default.find(query);
    if (_limit)
        products = products.limit(Number(_limit));
    res.json(await products);
});
// GET product by id
router.get("/:id", async (req, res) => {
    const product = await Product_1.default.findOne({ id: req.params.id });
    if (!product)
        return res.status(404).json({ message: "Not found" });
    res.json(product);
});
exports.default = router;

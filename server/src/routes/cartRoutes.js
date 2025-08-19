"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Cart_1 = __importDefault(require("../models/Cart"));
const router = express_1.default.Router();
router.get("/", async (_, res) => res.json(await Cart_1.default.find()));
router.post("/", async (req, res) => {
    const cart = new Cart_1.default(req.body);
    await cart.save();
    res.status(201).json(cart);
});
router.patch("/:id", async (req, res) => {
    const updated = await Cart_1.default.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(updated);
});
router.delete("/:id", async (req, res) => {
    await Cart_1.default.deleteOne({ id: req.params.id });
    res.json({ success: true });
});
exports.default = router;

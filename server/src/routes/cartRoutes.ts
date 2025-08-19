import express from "express";
import Cart from "../models/Cart";

const router = express.Router();

router.get("/", async (_, res) => res.json(await Cart.find()));

router.post("/", async (req, res) => {
    const cart = new Cart(req.body);
    await cart.save();
    res.status(201).json(cart);
});

router.patch("/:id", async (req, res) => {
    const updated = await Cart.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(updated);
});

router.delete("/:id", async (req, res) => {
    await Cart.deleteOne({ id: req.params.id });
    res.json({ success: true });
});

export default router;

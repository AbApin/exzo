import express from "express";
import Favourite from "../models/Favourite";

const router = express.Router();

router.get("/", async (_, res) => res.json(await Favourite.find()));
router.post("/", async (req, res) => {
    const fav = new Favourite(req.body);
    await fav.save();
    res.status(201).json(fav);
});
router.delete("/:id", async (req, res) => {
    await Favourite.deleteOne({ id: req.params.id });
    res.json({ success: true });
});

export default router;

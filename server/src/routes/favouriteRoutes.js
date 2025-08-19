"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Favourite_1 = __importDefault(require("../models/Favourite"));
const router = express_1.default.Router();
router.get("/", async (_, res) => res.json(await Favourite_1.default.find()));
router.post("/", async (req, res) => {
    const fav = new Favourite_1.default(req.body);
    await fav.save();
    res.status(201).json(fav);
});
router.delete("/:id", async (req, res) => {
    await Favourite_1.default.deleteOne({ id: req.params.id });
    res.json({ success: true });
});
exports.default = router;

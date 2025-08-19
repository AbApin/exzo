import express from "express";
import Category from "../models/Category";

const router = express.Router();

router.get("/", async (_, res) => res.json(await Category.find()));

export default router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const favouriteRoutes_1 = __importDefault(require("./routes/favouriteRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/products", productRoutes_1.default);
app.use("/favourites", favouriteRoutes_1.default);
app.use("/carts", cartRoutes_1.default);
app.use("/categories", categoryRoutes_1.default);
const PORT = process.env.PORT || 5000;
mongoose_1.default.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

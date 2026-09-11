import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js"
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.use("/Hello", userRoutes);
app.use("/api", productRoutes);
app.use(errorHandler);
export default app;
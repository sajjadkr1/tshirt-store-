import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        color: String,
        description: String,
        imgUrl: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    color: {
        type: String,
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

    imgUrl: {
        type: String,
        trim: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
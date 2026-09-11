import express from "express";

import {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller.js";

const router = express.Router();

// Ajouter un produit
router.post("/products", addProduct);

// Récupérer tous les produits
router.get("/products", getAllProducts);

// Récupérer un produit par ID
router.get("/products/:id", getProductById);

// Modifier un produit
router.put("/products/:id", updateProduct);

// Supprimer un produit
router.delete("/products/:id", deleteProduct);

export default router;
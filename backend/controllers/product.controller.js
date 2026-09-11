import Product from "../models/product.model.js";

// Ajouter un produit
export const addProduct = async (req, res) => {
    try {
        const product = new Product(req.body);

        await product.save();

        res.status(201).json({
            message: "Produit ajouté",
            product
        });

    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de l'ajout",
            error
        });
    }
};


// Récupérer tous les produits
export const getAllProducts = async (_req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération des produits",
            error
        });
    }
};


// Trouver un produit par son ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
           // return res.status(404).json({
               // message: "Produit non trouvé"
               const error = new error("product non trové");
               error.statusCode = 404;
              throw error;
               
            };
        }

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération du produit",
            error
        });
    }
};


// Supprimer un produit
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Produit non trouvé"
            });
        }

        res.status(200).json({
            message: "Produit supprimé"
        });

    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la suppression du produit",
            error
        });
    }
};


// Modifier un produit
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                message: "Produit non trouvé"
            });
        }

        res.status(200).json({
            message: "Produit modifié",
            product
        });

    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la modification du produit",
            error
        });
    }
};
export const transformProduct = (req, res, next) => {
    //Nettoyer le nom
    if (req.body.name) req.body.name = req.body.name.trim();

    //Normalisation (trés utile en recherche/filtre)
    if(req.body.name) req.body.name = req.body.name.toLowerCase();

    //Ajouter une valeur par défaut
    // if(!req.body.stock) req.body.stock = 0;

    //Si le client n'envoie pas de stock
    if (req.body.stock === undefined) req.body.stock = 0;

    next();
}
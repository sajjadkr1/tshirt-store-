import Joi from "joi";

export const validateProduct = (req, res, next) => {
    const Schema = Joi.object({
        name : Joi.string().min(3).required().messages({
            "string.base": "Le nom doit etre une chaine de caractère",
            "string.empty": "Le nom est obligatoire",
            "string.min": "Le nom doit avoir au moins 3 caractères",
            "any.required": "Le champ nom est obligatoire"
        }),
        price : Joi.number().required().messages({
            "number.base": "Le prix doit etre un nombre",
            "any.required": "Le prix est obligatoire"
        }),
        description: Joi.string().max(200).optional().messages({
             "string.base": "La description doit etre une chaine de caractère",
             "string.max": "La description ne doit pas dépasser 200 caractères"
        }),
        imgURL: Joi.string().required().messages({
             "string.base": "L'URL doit etre une chaine de caractère",
             "any.required": "L'URL est obligatoire"
        }),
        stock: Joi.number().required().messages({
            "number.base": "Le stock doit etre un nombre",
            "any.required": "Stock est obligatoire"
        })
    });

    const {error} = Schema.validate(req.body, {abortEarly:false})
    //abortEarly:false => ne pas arreter à la 1ere erreur=> Donner toutes les erreurs

    if (error) {
        return res.status(400).json({
            message: "Erreur de validation",
            errors: error.details.map(err=>err.message)
        });
    };

    next();
    //La validation est OK, tu peux passer au middleware/controller suivant
}
import cakeSchema from "../Schemas/cakeSchema.js";

export function validateCakeMIddleware(req, res, next) {
    const { name, price, description, image } = req.body
    const validation = cakeSchema.validate(req.body)
    if (validation.error) return res.status(400).send(validation.error)

    if (name.length <= 2) return res.sendStatus(400);
    if (price < 0) return res.sendStatus(400);

    next();
}
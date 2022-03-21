import cakeSchema from "../Schemas/cakeSchema.js";
import linkSchema from "../Schemas/linkSchema.js";

export function validateCakeMIddleware(req, res, next) {
    const { name, price, description, image, flavourId } = req.body
    const validationLink = linkSchema.validate({ image })
    if (validationLink.error) return res.status(422).send(validationLink.error)
    const validation = cakeSchema.validate({ name, price, description, flavourId })
    if (validation.error) return res.status(400).send(validation.error)


    if (name.length < 2) return res.sendStatus(400);
    if (price < 0) return res.sendStatus(400);

    next();
}
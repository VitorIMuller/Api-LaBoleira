import clientSchema from "../Schemas/clientSchema.js";


export default function validateClientMiddleware(req, res, next) {
    const { phone } = req.body
    const validation = clientSchema.validate(req.body)
    if (validation.error) return res.sendStatus(400);

    if (isNaN(phone)) return res.sendStatus(400);
    if (phone.length < 10 || phone.length > 11) return res.sendStatus(400);

    next();
}
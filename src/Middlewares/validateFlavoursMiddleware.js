import flavoursSchema from "../Schemas/flavoursSchema.js";

export default function validateFlavoursMiddleware(req, res, next) {
    const { name } = req.body
    const validation = flavoursSchema.validate(req.body)
    if (validation.error) return res.status(400).send(validation.error)

    if (!name || name.length <= 2) return res.status(400).send("error")

    next()
}
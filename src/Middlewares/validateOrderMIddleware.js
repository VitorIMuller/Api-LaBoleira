import orderSchema from "../Schemas/orderSchema.js";

export default function validateOrderMiddleware(req, res, next) {
    const { quantity } = req.body
    const validation = orderSchema.validate(req.body)
    if (validation.error) return res.sendStatus(400);

    if (quantity <= 0 || quantity > 5) return res.sendStatus(400);
    if (!Number.isInteger(quantity)) return res.sendStatus(400)

    next()
}
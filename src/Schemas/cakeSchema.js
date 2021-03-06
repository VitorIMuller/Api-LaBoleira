import joi from 'joi';

const cakeSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string().allow(""),
    flavourId: joi.number().required()
})

export default cakeSchema
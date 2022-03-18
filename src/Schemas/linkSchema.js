import joi from "joi"

const linkSchema = joi.object({
    image: joi.string().uri().required()
})


export default linkSchema
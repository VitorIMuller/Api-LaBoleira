import joi from 'joi'

const flavoursSchema = joi.object({
    name: joi.string().required()
})

export default flavoursSchema
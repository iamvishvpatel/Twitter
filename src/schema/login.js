import Joi from "joi"

const loginSchema = Joi.object({
  email: Joi.string()
            .min(6)
            .max(40)
            .required(),
  password: Joi.string()
                .alphanum()
                .required()
})

export {loginSchema}
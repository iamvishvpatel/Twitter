import Joi from 'joi'

const signupSchema = Joi.object({
  fname: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
  lname: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
  username: Joi.string()
            .alphanum()
            .min(6)
            .required(),
  email: Joi.string()
            .min(6)
            .max(40)
            .required(),
  bio: Joi.string()
  .min(0)
  .max(100)
})

export {signupSchema};
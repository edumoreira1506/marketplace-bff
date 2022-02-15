import Joi from 'joi'

export const storeDealSchema = Joi.object({
  value: Joi.number().required(),
  description: Joi.string(),
})

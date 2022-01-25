import Joi from 'joi'

export const storeAdvertisingQuestionSchema = Joi.object({
  question: Joi.object().required()
})

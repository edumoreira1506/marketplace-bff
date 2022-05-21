import { Response } from 'express'
import { BaseController, NotFoundError } from '@cig-platform/core'
import { AuthenticatedRequest } from '@cig-platform/types'

import AdvertisingQuestionAggregator from '@Aggregators/AdvertisingQuestionAggregator'

class AdvertisingQuestionController {
  constructor() {
    this.store = this.store.bind(this)
    this.storeAnswer = this.storeAnswer.bind(this)
  }

  @BaseController.errorHandler()
  async store(req: AuthenticatedRequest, res: Response) {
    const user = req.user
    const question = req.body.question
    const advertisingId = req.params.advertisingId
    const breederId = req.params.breederId
    const breeders = req.breeders

    if (!user || !breeders) throw new NotFoundError()

    const breeder = req?.breeders?.[0]
    const savedQuestion = await AdvertisingQuestionAggregator.postQuestion(
      breederId,
      advertisingId,
      { ...question, externalId: `${user.id}___${breeder?.id}` }
    )

    return BaseController.successResponse(res, { question: savedQuestion })
  }

  @BaseController.errorHandler()
  async storeAnswer(req: AuthenticatedRequest, res: Response) {
    const merchant = req.merchant
    const user = req.user
    const answer = req.body.answer
    const advertisingId = req.params.advertisingId
    const questionId = req.params.questionId

    if (!merchant || !user) throw new NotFoundError()

    const savedQuestionAnswer = await AdvertisingQuestionAggregator.postQuestionAnswer(
      merchant.id,
      advertisingId,
      questionId,
      { ...answer, externalId: user.id }
    )

    return BaseController.successResponse(res, { answer: savedQuestionAnswer })
  }
}

export default new AdvertisingQuestionController()

import { Response } from 'express'
import { BaseController, NotFoundError } from '@cig-platform/core'
import { AuthenticatedRequest } from '@cig-platform/types'

import AdvertisingQuestionAggregator from '@Aggregators/AdvertisingQuestionAggregator'

class AdvertisingQuestionController {
  constructor() {
    this.store = this.store.bind(this)
  }

  @BaseController.errorHandler()
  async store(req: AuthenticatedRequest, res: Response) {
    const merchant = req.merchant
    const user = req.user
    const question = req.body.question
    const advertisingId = req.params.advertisingId

    if (!merchant || !user) throw new NotFoundError()

    const savedQuestion = await AdvertisingQuestionAggregator.postQuestion(
      merchant.id,
      advertisingId,
      { ...question, externalId: user.id }
    )

    return BaseController.successResponse(res, { question: savedQuestion })
  }
}

export default new AdvertisingQuestionController()

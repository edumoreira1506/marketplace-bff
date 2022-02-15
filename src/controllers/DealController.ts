import { Response } from 'express'
import { BaseController, NotFoundError } from '@cig-platform/core'
import { AuthenticatedRequest } from '@cig-platform/types'

import DealAggregator from '@Aggregators/DealAggregator'

class DealController {
  constructor() {
    this.store = this.store.bind(this)
  }

  @BaseController.errorHandler()
  async store(req: AuthenticatedRequest, res: Response) {
    const user = req.user
    const merchant = req.merchant
    const advertisingId = req.params.advertisingId
    const breederId = req.params.breederId
    const value = Number(req?.body?.value)
    const description = req?.body?.description ?? ''

    if (!user || !merchant) throw new NotFoundError()

    const deal = await DealAggregator.registerDeal(
      breederId,
      advertisingId,
      merchant.id,
      { value, description }
    )

    return BaseController.successResponse(res, { deal })
  }
}

export default new DealController()

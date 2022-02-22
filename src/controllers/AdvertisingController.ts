import { Request, Response } from 'express'
import { BaseController } from '@cig-platform/core'

import AdvertisingAggregator from '@Aggregators/AdvertisingAggregator'

class AdvertisingFavoriteController {
  constructor() {
    this.home = this.home.bind(this)
  }

  @BaseController.errorHandler()
  async home(_: Request, res: Response) {
    const data = await AdvertisingAggregator.home()

    return BaseController.successResponse(res, data)
  }
}

export default new AdvertisingFavoriteController()

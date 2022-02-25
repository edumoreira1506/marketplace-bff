import { Request, Response } from 'express'
import { BaseController } from '@cig-platform/core'

import AdvertisingAggregator from '@Aggregators/AdvertisingAggregator'

class AdvertisingFavoriteController {
  constructor() {
    this.home = this.home.bind(this)
    this.search = this.search.bind(this)
  }

  @BaseController.errorHandler()
  async home(_: Request, res: Response) {
    const data = await AdvertisingAggregator.home()

    return BaseController.successResponse(res, data)
  }

  @BaseController.errorHandler()
  async search(req: Request, res: Response) {
    const gender = req.query?.gender?.toString().split(',') ?? []
    const type = req.query?.type?.toString().split(',') ?? []
    const tail = req.query?.tail?.toString().split(',') ?? []
    const dewlap = req.query?.dewlap?.toString().split(',') ?? []
    const crest = req.query?.crest?.toString().split(',') ?? []
    const keyword = req?.query?.keyword?.toString()
    const genderCategory = req?.query?.genderCategory?.toString().split(',') ?? []
    const prices = req?.query?.prices && JSON.parse(req.query.prices.toString())
    const sort = req?.query?.sort?.toString()
    const favoriteIds = req?.query?.favoriteIds?.toString()
    const advertisings = await AdvertisingAggregator.search({
      crest,
      dewlap,
      gender,
      genderCategory,
      keyword,
      prices,
      sort,
      tail,
      type,
      favoriteIds
    })

    return BaseController.successResponse(res, { advertisings })
  }
}

export default new AdvertisingFavoriteController()

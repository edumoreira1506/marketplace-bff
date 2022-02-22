import { BaseController, NotFoundError } from '@cig-platform/core'
import { AuthenticatedRequest } from '@cig-platform/types'

import AdvertisingFavoriteAggregator from '@Aggregators/AdvertisingFavoriteAggregator'
import i18n from '@Configs/i18n'

class AdvertisingFavoriteController {
  constructor() {
    this.store = this.store.bind(this)
    this.remove = this.remove.bind(this)
  }

  @BaseController.errorHandler()
  @BaseController.actionHandler(i18n.__('common.success'))
  async store(req: AuthenticatedRequest) {
    const user = req.user
    const advertisingId = req.params.advertisingId
    const breederId = req.params.breederId

    if (!user) throw new NotFoundError()

    await AdvertisingFavoriteAggregator.postFavorite(
      breederId,
      advertisingId,
      user.id
    )
  }

  @BaseController.errorHandler()
  @BaseController.actionHandler(i18n.__('common.success'))
  async remove(req: AuthenticatedRequest) {
    const user = req.user
    const advertisingId = req.params.advertisingId
    const breederId = req.params.breederId
    const favoriteId = req.params.favoriteId

    if (!user) throw new NotFoundError()

    await AdvertisingFavoriteAggregator.removeFavorite(
      breederId,
      advertisingId,
      favoriteId,
    )
  }
}

export default new AdvertisingFavoriteController()

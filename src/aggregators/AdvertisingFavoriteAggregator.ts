import { AdvertisingServiceClient as IAdvertisingServiceClient  } from '@cig-platform/core'

import AdvertisingServiceClient from '@Clients/AdvertisingServiceClient'

export class AdvertisingFavoriteAggregator {
  private _advertisingServiceClient: IAdvertisingServiceClient
  
  constructor(
    advertisingServiceClient: IAdvertisingServiceClient,
  ) {
    this._advertisingServiceClient = advertisingServiceClient

    this.postFavorite = this.postFavorite.bind(this)
  }

  async postFavorite(
    breederId: string,
    advertisingId: string,
    externalId: string
  ) {
    const merchants = await this._advertisingServiceClient.getMerchants(breederId)

    if (merchants.length) {
      return this._advertisingServiceClient.postAdvertisingFavorite(
        merchants[0].id,
        advertisingId,
        externalId
      )
    }
  }

  async removeFavorite(
    breederId: string,
    advertisingId: string,
    favoriteId: string
  ) {
    const merchants = await this._advertisingServiceClient.getMerchants(breederId)

    if (merchants.length) {
      return this._advertisingServiceClient.removeAdvertisingFavorite(
        merchants[0].id,
        advertisingId,
        favoriteId
      )
    }
  }
}

export default new AdvertisingFavoriteAggregator(AdvertisingServiceClient)

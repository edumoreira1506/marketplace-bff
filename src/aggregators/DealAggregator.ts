import {
  DealServiceClient as IDealServiceClient,
  AdvertisingServiceClient as IAdvertisingServiceClient
} from '@cig-platform/core'
import { DealEventValueEnum } from '@cig-platform/enums'

import DealServiceClient from '@Clients/DealServiceClient'
import AdvertisingServiceClient from '@Clients/AdvertisingServiceClient'

export class DealAggregator {
  private _dealServiceClient: IDealServiceClient
  private _advertisingServiceClient: IAdvertisingServiceClient
  
  constructor(
    dealServiceClient: IDealServiceClient,
    advertisingServiceClient: IAdvertisingServiceClient
  ) {
    this._dealServiceClient = dealServiceClient
    this._advertisingServiceClient = advertisingServiceClient

    this.registerDeal = this.registerDeal.bind(this)
  }

  async registerDeal(
    breederId: string,
    advertisingId: string,
    merchantId: string,
    { description, value }: { description: string; value: number }
  ) {
    const merchants = await this._advertisingServiceClient.getMerchants(breederId)

    const sellerId = merchants?.[0]?.id ?? ''

    const deal = await this._dealServiceClient.registerDeal({
      advertisingId,
      buyerId: merchantId,
      sellerId,
    })

    await this._dealServiceClient.registerDealEvent(deal.id, {
      value: DealEventValueEnum.placed,
      metadata: { description, value }
    })

    return { deal }
  }
}

export default new DealAggregator(DealServiceClient, AdvertisingServiceClient)

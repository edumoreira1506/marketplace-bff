import {
  AdvertisingServiceClient as IAdvertisingServiceClient,
  PoultryServiceClient as IPoultryServiceClient
} from '@cig-platform/core'
import { PoultryGenderCategoryEnum } from '@cig-platform/enums'
import { IPoultry } from '@cig-platform/types'

import AdvertisingServiceClient from '@Clients/AdvertisingServiceClient'
import PoultryServiceClient from '@Clients/PoultryServiceClient'

type Poultry = IPoultry & { mainImage: string; breederId: string }

export class AdvertisingFavoriteAggregator {
  private _advertisingServiceClient: IAdvertisingServiceClient;
  private _poultryServiceClient: IPoultryServiceClient;

  constructor(
    advertisingServiceClient: IAdvertisingServiceClient,
    poultryServiceClient: IPoultryServiceClient
  ) {
    this._advertisingServiceClient = advertisingServiceClient
    this._poultryServiceClient = poultryServiceClient
  }

  async home() {
    const femaleChickens = await this._poultryServiceClient.findPoultries({
      genderCategory: PoultryGenderCategoryEnum.MaleChicken,
      forSale: 'true'
    })
    const maleChickens = await this._poultryServiceClient.findPoultries({
      genderCategory: PoultryGenderCategoryEnum.FemaleChicken,
      forSale: 'true'
    })
    const matrixes = await this._poultryServiceClient.findPoultries({
      genderCategory: PoultryGenderCategoryEnum.Matrix,
      forSale: 'true'
    })
    const reproductives = await this._poultryServiceClient.findPoultries({
      genderCategory: PoultryGenderCategoryEnum.Reproductive,
      forSale: 'true'
    })

    const getPoultriesEntireData = async (poultries: Poultry[] = []) => Promise.all(poultries.map(async (poultry: Poultry) => {
      const merchants = await this._advertisingServiceClient.getMerchants(poultry.id)
      const breeder = await this._poultryServiceClient.getBreeder(poultry.breederId)

      if (!merchants.length) return { poultry, breeder }

      const advertising = await this._advertisingServiceClient.getAdvertisings(merchants[0].id, poultry.id)

      return { poultry, advertising, breeder }
    }))

    const femaleChickensWithAdvertising = await getPoultriesEntireData(femaleChickens)
    const maleChickensWithAdvertising = await getPoultriesEntireData(maleChickens)
    const reproductivesWithAdvertising = await getPoultriesEntireData(reproductives)
    const matrixesWithAdvertising = await getPoultriesEntireData(matrixes)

    return {
      femaleChickens: femaleChickensWithAdvertising,
      maleChickens: maleChickensWithAdvertising,
      reproductives: reproductivesWithAdvertising,
      matrixes: matrixesWithAdvertising
    }
  }
}

export default new AdvertisingFavoriteAggregator(
  AdvertisingServiceClient,
  PoultryServiceClient
)

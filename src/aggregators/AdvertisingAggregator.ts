import {
  AdvertisingServiceClient as IAdvertisingServiceClient,
  PoultryServiceClient as IPoultryServiceClient
} from '@cig-platform/core'
import { PoultryGenderCategoryEnum, RegisterTypeEnum } from '@cig-platform/enums'
import { IPoultry } from '@cig-platform/types'

import AdvertisingServiceClient from '@Clients/AdvertisingServiceClient'
import PoultryServiceClient from '@Clients/PoultryServiceClient'

type Poultry = IPoultry & { mainImage: string; breederId: string }

export class AdvertisingAggregator {
  private _advertisingServiceClient: IAdvertisingServiceClient
  private _poultryServiceClient: IPoultryServiceClient

  constructor(
    advertisingServiceClient: IAdvertisingServiceClient,
    poultryServiceClient: IPoultryServiceClient
  ) {
    this._advertisingServiceClient = advertisingServiceClient
    this._poultryServiceClient = poultryServiceClient
  }

  getPoultriesEntireData = async (poultries: Poultry[] = []) => Promise.all(poultries.map(async (poultry: Poultry) => {
    const merchants = await this._advertisingServiceClient.getMerchants(poultry.breederId)
    const breeder = await this._poultryServiceClient.getBreeder(poultry.breederId)

    if (!merchants.length) return { poultry, breeder }

    const advertisings = await this._advertisingServiceClient.getAdvertisings(merchants[0].id, poultry.id, false)
    const measurementAndWeight = await this._poultryServiceClient.getRegisters(breeder.id, poultry.id, RegisterTypeEnum.MeasurementAndWeighing)

    return { poultry, advertising: advertisings?.[0], breeder, measurementAndWeight: measurementAndWeight?.[0] }
  }))

  async home() {
    const { poultries: femaleChickens } = await this._poultryServiceClient.findPoultries({
      genderCategory: [PoultryGenderCategoryEnum.MaleChicken],
      forSale: 'true',
      page: 0,
    })
    const { poultries: maleChickens } = await this._poultryServiceClient.findPoultries({
      genderCategory: [PoultryGenderCategoryEnum.FemaleChicken],
      forSale: 'true',
      page: 0,
    })
    const { poultries: matrixes } = await this._poultryServiceClient.findPoultries({
      genderCategory: [PoultryGenderCategoryEnum.Matrix],
      forSale: 'true',
      page: 0,
    })
    const { poultries: reproductives } = await this._poultryServiceClient.findPoultries({
      genderCategory: [PoultryGenderCategoryEnum.Reproductive],
      forSale: 'true',
      page: 0,
    })

    const femaleChickensWithAdvertising = await this.getPoultriesEntireData(femaleChickens)
    const maleChickensWithAdvertising = await this.getPoultriesEntireData(maleChickens)
    const reproductivesWithAdvertising = await this.getPoultriesEntireData(reproductives)
    const matrixesWithAdvertising = await this.getPoultriesEntireData(matrixes)

    return {
      femaleChickens: femaleChickensWithAdvertising,
      maleChickens: maleChickensWithAdvertising,
      reproductives: reproductivesWithAdvertising,
      matrixes: matrixesWithAdvertising
    }
  }

  async search({
    gender,
    type,
    tail,
    dewlap,
    crest,
    keyword,
    genderCategory,
    prices,
    sort,
    favoriteIds,
    page = 0
  }: {
    gender?: string[];
    type?: string[];
    tail?: string[];
    dewlap?: string[];
    crest?: string[];
    keyword?: string;
    genderCategory?: string[];
    prices?: { min: number; max: number };
    sort?: string;
    favoriteIds?: string;
    page?: number;
  }) {
    const { poultries, pages } = await this._poultryServiceClient.findPoultries({
      crest,
      description: keyword,
      dewlap,
      forSale: 'true',
      gender,
      genderCategory,
      name: keyword,
      tail,
      type,
      prices,
      sort,
      page,
    })
    const poultriesWithAllData = await this.getPoultriesEntireData(poultries)

    const filteredPoultries = poultriesWithAllData.filter(p => {
      const favoritedIdsArray = favoriteIds?.split(',').filter(Boolean) ?? []

      if (!favoritedIdsArray.length || !p.advertising?.id) return p

      return favoritedIdsArray.includes(p.advertising.id)
    })

    return { advertisings: filteredPoultries, pages }
  }
}

export default new AdvertisingAggregator(
  AdvertisingServiceClient,
  PoultryServiceClient
)

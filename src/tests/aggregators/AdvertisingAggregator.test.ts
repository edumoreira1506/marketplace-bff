import { advertisingFactory, breederFactory, merchantFactory, poultryFactory } from '@cig-platform/factories'

import { AdvertisingAggregator } from '@Aggregators/AdvertisingAggregator'

describe('AdvertisingAggregator', () => {
  describe('.getPoultriesEntireData', () => {
    it('returns data without advertisings and register', async () => {
      const poultry = poultryFactory()
      const merchants = [] as any[]
      const poultries = [poultry] as any[]
      const breeder = breederFactory()
      const mockAdvertisingServiceClient: any = {
        getMerchants: jest.fn().mockResolvedValue(merchants)
      }
      const mockPoultryServiceClient: any = {
        getBreeder: jest.fn().mockResolvedValue(breeder)
      }
      const advertisingAggregator = new AdvertisingAggregator(
        mockAdvertisingServiceClient,
        mockPoultryServiceClient
      )
      const data = await advertisingAggregator.getPoultriesEntireData(poultries)

      expect(data).toMatchObject([{
        poultry,
        breeder
      }])
      expect(mockAdvertisingServiceClient.getMerchants).toHaveBeenCalledTimes(1)
      expect(mockPoultryServiceClient.getBreeder).toHaveBeenCalledTimes(1)
    })

    it('returns data with advertisings and register', async () => {
      const poultry = poultryFactory()
      const merchant = merchantFactory()
      const advertising = advertisingFactory()
      const register = {}
      const merchants = [merchant] as any[]
      const poultries = [poultry] as any[]
      const breeder = breederFactory()
      const mockAdvertisingServiceClient: any = {
        getMerchants: jest.fn().mockResolvedValue(merchants),
        getAdvertisings: jest.fn().mockResolvedValue([advertising]),
      }
      const mockPoultryServiceClient: any = {
        getBreeder: jest.fn().mockResolvedValue(breeder),
        getRegisters: jest.fn().mockResolvedValue([register])
      }
      const advertisingAggregator = new AdvertisingAggregator(
        mockAdvertisingServiceClient,
        mockPoultryServiceClient
      )
      const data = await advertisingAggregator.getPoultriesEntireData(poultries)

      expect(data).toMatchObject([{
        poultry,
        breeder,
        measurementAndWeight: register,
        advertising
      }])
      expect(mockAdvertisingServiceClient.getMerchants).toHaveBeenCalledTimes(1)
      expect(mockPoultryServiceClient.getBreeder).toHaveBeenCalledTimes(1)
      expect(mockAdvertisingServiceClient.getAdvertisings).toHaveBeenCalledTimes(1)
      expect(mockPoultryServiceClient.getRegisters).toHaveBeenCalledTimes(1)
    })
  })
})

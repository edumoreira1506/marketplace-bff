import { createDoc } from '@cig-platform/docs'

export default {
  ...createDoc('/breeders/{breederId}/poultries/{poultryId}/advertisings/{advertisingId}/deals', ['Deals'], [
    {
      method: 'post',
      title: 'Register deal',
      headerParams: [{ type: 'string', name: 'X-Cig-Token' }],
    },
  ], {
    pathVariables: [
      { type: 'string', name: 'breederId' },
      { type: 'string', name: 'poultryId' },
      { type: 'string', name: 'advertisingId' },
    ]
  }),
}

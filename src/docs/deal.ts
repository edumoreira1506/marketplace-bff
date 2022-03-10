import { createDoc } from '@cig-platform/docs'

import { storeDealSchema } from '@Schemas/DealSchemas'

export default {
  ...createDoc('/breeders/{breederId}/poultries/{poultryId}/advertisings/{advertisingId}/deals', ['Deals'], [
    {
      method: 'post',
      title: 'Register deal',
      headerParams: [{ type: 'string', name: 'X-Cig-Token' }],
      objectSchema: storeDealSchema
    },
  ], {
    pathVariables: [
      { type: 'string', name: 'breederId' },
      { type: 'string', name: 'poultryId' },
      { type: 'string', name: 'advertisingId' },
    ]
  }),
}

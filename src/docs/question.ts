import { createDoc } from '@cig-platform/docs'

import { storeAdvertisingQuestionSchema } from '@Schemas/AdvertisingQuestionSchemas'

export default {
  ...createDoc('/breeders/{breederId}/poultries/{poultryId}/advertisings/{advertisingId}/questions', ['Advertising question'], [
    {
      method: 'post',
      title: 'Register poultry advertising question',
      description: 'Route to register poultry advertising question',
      headerParams: [{ type: 'string', name: 'X-Cig-Token' }],
      objectSchema: storeAdvertisingQuestionSchema
    },
  ], {
    pathVariables: [
      { type: 'string', name: 'breederId' },
      { type: 'string', name: 'poultryId' },
      { type: 'string', name: 'advertisingId' },
    ]
  }),
}

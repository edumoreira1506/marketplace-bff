import { createDoc } from '@cig-platform/docs'

export default {
  ...createDoc('/breeders/{breederId}/poultries/{poultryId}/advertisings/{advertisingId}/favorites', ['Advertising favorite'], [
    {
      method: 'post',
      title: 'Register poultry advertising favorite',
      description: 'Route to register poultry advertising favorite',
      headerParams: [{ type: 'string', name: 'X-Cig-Token' }],
    },
  ], {
    pathVariables: [
      { type: 'string', name: 'breederId' },
      { type: 'string', name: 'poultryId' },
      { type: 'string', name: 'advertisingId' },
    ]
  }),
  ...createDoc('/breeders/{breederId}/poultries/{poultryId}/advertisings/{advertisingId}/favorites/{favoriteId}', ['Advertising favorite'], [
    {
      method: 'delete',
      title: 'Remove poultry advertising favorite',
      description: 'Route to remove poultry advertising favorite',
      headerParams: [{ type: 'string', name: 'X-Cig-Token' }],
    },
  ], {
    pathVariables: [
      { type: 'string', name: 'breederId' },
      { type: 'string', name: 'poultryId' },
      { type: 'string', name: 'advertisingId' },
      { type: 'string', name: 'favoriteId' },
    ]
  }),
}

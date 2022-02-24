import { createDoc } from '@cig-platform/docs'

export default {
  ...createDoc('/home', ['Home'], [
    {
      method: 'get',
      title: 'Get home advertisings',
      description: 'Route to get advertisings',
    },
  ]),
  ...createDoc('/search', ['Search'], [
    {
      method: 'get',
      title: 'Search advertisings',
      description: 'Route to search advertisings',
      queryParams: [
        {
          type: 'string',
          name: 'gender'
        },
        {
          type: 'string',
          name: 'type'
        },
        {
          type: 'string',
          name: 'tail'
        },
        {
          type: 'string',
          name: 'dewlap'
        },
        {
          type: 'string',
          name: 'crest'
        },
        {
          type: 'string',
          name: 'keyword'
        },
        {
          type: 'string',
          name: 'genderCategory'
        },
        {
          type: 'string',
          name: 'prices'
        },
        {
          type: 'string',
          name: 'sort'
        },
        {
          type: 'string',
          name: 'favoriteIds'
        },
      ]
    },
  ]),
}

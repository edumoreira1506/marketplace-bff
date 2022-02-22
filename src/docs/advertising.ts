import { createDoc } from '@cig-platform/docs'

export default {
  ...createDoc('/home', ['Home'], [
    {
      method: 'get',
      title: 'Get home advertisings',
      description: 'Route to get advertisings',
    },
  ]),
}

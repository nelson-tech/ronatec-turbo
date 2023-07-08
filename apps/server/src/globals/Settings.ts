import type { GlobalConfig } from 'payload/types'
import colorField from '../fields/colorPicker/config'

export const Settings: GlobalConfig = {
  slug: 'settings',
  typescript: {
    interface: 'Settings',
  },
  graphQL: {
    name: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'logos',
          label: 'Logos',
          fields: [
            { name: 'main', type: 'upload', relationTo: 'media' },
            { name: 'favIcon', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          name: 'colors',
          label: 'Colors',
          fields: [colorField('primary'), colorField('secondary')],
        },
      ],
    },
  ],
}

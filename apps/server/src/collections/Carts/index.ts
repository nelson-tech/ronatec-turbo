import { CollectionConfig } from 'payload/dist/collections/config/types'

import adminsAndUser from './access/adminsAndUser'
import beforeChange from './hooks/beforeChange'
import afterChange from './hooks/afterChange'
import afterDelete from './hooks/afterDelete'
import afterRead from './hooks/afterRead'

export const Carts: CollectionConfig = {
  slug: 'carts',
  fields: [
    {
      name: 'items',
      label: 'Items',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
        },
        {
          name: 'quantity',
          type: 'number',
          min: 1,
          admin: {
            step: 1,
          },
        },
      ],
    },
    {
      name: 'count',
      label: 'Items in cart',
      type: 'number',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      hasMany: false,
      admin: { hidden: false, position: 'sidebar' },
    },
    {
      name: 'lastEdit',
      type: 'number',
      hidden: true,
    },
  ],
  access: {
    read: adminsAndUser,
    create: adminsAndUser,
    update: adminsAndUser,
    delete: adminsAndUser,
  },
  hooks: { afterRead, beforeChange, afterChange, afterDelete },
  admin: { group: 'Shop', hidden: false },
}

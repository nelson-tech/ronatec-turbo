import type { CollectionConfig } from 'payload/types'
import CustomView from './Custom'
import endpoints from './endpoints'
import fields from './fields'

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    group: 'Shop',
    useAsTitle: 'title',
    components: {
      AfterList: [CustomView],
    },
  },
  versions: {
    drafts: { autosave: true },
  },
  access: {
    read: () => true,
  },
  endpoints,
  fields,
}

export default Categories

import { CollectionConfig } from 'payload/types'
import { Archive } from '../../blocks/Archive'
import { CallToAction } from '../../blocks/CallToAction'
import { Content } from '../../blocks/Content'
import { MediaBlock } from '../../blocks/Media'
import { slugField } from '../../fields/slug'
import { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types'
import { meta } from '../../fields/meta'

const wcFields: CollectionConfig['fields'] = [
  {
    name: 'wc',
    label: false,
    type: 'group',
    fields: [{ name: 'title', type: 'text' }],
    admin: {
      condition: (data, siblingData, { user }) => {
        if (data.wc.id) {
          return true
        } else {
          return false
        }
      },
    },
  },
]

export const ProductFields: CollectionConfig['fields'] = [
  {
    name: 'title',
    type: 'text',
    required: true,
  },
  {
    name: 'publishedDate',
    type: 'date',
    admin: {
      position: 'sidebar',
    },
  },
  {
    type: 'tabs',
    tabs: [
      {
        label: 'Description',
        fields: [
          {
            name: 'shortDescription',
            type: 'textarea',
            admin: { description: 'Shown on product card.' },
          },
          {
            name: 'layout',
            type: 'blocks',
            required: true,
            blocks: [CallToAction, Content, MediaBlock, Archive],
            admin: { description: 'Shown on product details page.' },
          },
        ],
      },
      {
        label: 'Images',
        description:
          'Used for gallery on product details page. \
          First image in gallery will be the featured image, then the images here will be added.',
        fields: [
          {
            name: 'gallery',
            label: 'Product Images',
            type: 'array',
            labels: {
              singular: 'Slide',
              plural: 'Slides',
            },
            fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
            admin: {
              components: {
                RowLabel: ({ data, index }: RowLabelArgs) => {
                  return data?.title || `Slide ${String(index).padStart(2, '0')}`
                },
              },
            },
          },
        ],
      },
      {
        label: 'Variations',
        description: 'Add variations such as Size, Color, etc.',
        fields: [
          {
            name: 'variations',
            type: 'array',
            fields: [
              { name: 'name', type: 'text' },
              slugField('name'),
              {
                type: 'array',
                name: 'options',
                fields: [
                  { name: 'label', type: 'text' },
                  { name: 'sku', type: 'text', unique: true },
                ],
              },
            ],
          },
          {
            name: 'hasVariation',
            type: 'checkbox',
            hidden: false,
            admin: { readOnly: true, hidden: true },
          },
        ],
      },
      {
        label: 'WC Import',
        description: 'Data imported from WooCommerce',
        fields: wcFields,
      },
    ],
  },
  { name: 'sku', type: 'text', unique: true, admin: { position: 'sidebar' } },
  {
    name: 'categories',
    type: 'relationship',
    relationTo: 'categories',
    hasMany: true,
    admin: {
      position: 'sidebar',
    },
  },
  slugField(),
  {
    name: 'featuredImage',
    type: 'upload',
    relationTo: 'media',
    admin: {
      position: 'sidebar',
    },
  },
  meta({
    generateTitle: ({ doc }) => `${(doc as { title: { value: string } }).title.value} - Ronatec`,
    generateDescription: ({ doc }) =>
      (doc as { shortDescription: { value: string } }).shortDescription.value,
    generateImage: ({ doc }) => (doc as { featuredImage: { value: string } }).featuredImage?.value,
    generateURL: async ({ doc }) => {
      const baseURL = process.env.PAYLOAD_PUBLIC_SITE_URL

      const fields = (doc as { fields: { slug: { value: string } } }).fields

      return `${baseURL}/products/${fields.slug.value}`
    },
  }),
]

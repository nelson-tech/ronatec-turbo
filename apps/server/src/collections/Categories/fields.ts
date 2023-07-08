import { Field } from 'payload/types'
import { Content } from '../../blocks/Content'
import createParentField from '@payloadcms/plugin-nested-docs/dist/fields/parent'
import createBreadcrumbsField from '@payloadcms/plugin-nested-docs/dist/fields/breadcrumbs'
import { slugField } from '../../fields/slug'

const fields: Field[] = [
  {
    name: 'title',
    type: 'text',
  },
  slugField(),
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    admin: { position: 'sidebar' },
  },

  createParentField(
    // First argument is equal to the slug of the collection
    // that the field references
    'categories',

    // Second argument is equal to field overrides that you specify,
    // which will be merged into the base parent field config
    {
      admin: {
        position: 'sidebar',
      },
      // Note: if you override the `filterOptions` of the `parent` field,
      // be sure to continue to prevent the document from referencing itself as the parent like this:
      // filterOptions: ({ id }) => ({ id: {not_equals: id }})`
    },
  ),
  {
    type: 'tabs',
    tabs: [
      {
        label: 'Description',
        fields: [
          {
            name: 'shortDescription',
            type: 'textarea',
            admin: { description: 'Shown on category products page. Also used for SEO.' },
          },
          {
            name: 'layout',
            type: 'blocks',
            required: false,
            blocks: [Content],
            admin: { description: 'Shown on category details page.' },
          },
          createBreadcrumbsField(
            // First argument is equal to the slug of the collection
            // that the field references
            'categories',

            // Argument equal to field overrides that you specify,
            // which will be merged into the base `breadcrumbs` field config
            {
              label: 'Breadcrumbs',
              admin: { hidden: true },
            },
          ),
        ],
      },
      {
        label: 'WC Import',
        fields: [
          {
            name: 'wc',
            type: 'group',
            label: false,
            fields: [
              {
                name: 'wc_id',
                label: 'ID',
                type: 'number',
              },
              {
                name: 'name',
                type: 'text',
              },
              {
                name: 'slug',
                type: 'text',
              },
              {
                name: 'description',
                type: 'textarea',
              },
              {
                name: 'parent',
                type: 'number',
              },
              {
                name: 'count',
                type: 'number',
              },
              {
                name: 'image',
                type: 'group',
                fields: [
                  {
                    name: 'wc_id',
                    label: 'ID',
                    type: 'number',
                  },
                  {
                    name: 'src',
                    type: 'text',
                  },
                  {
                    name: 'thumbnail',
                    type: 'text',
                  },
                  {
                    name: 'srcset',
                    type: 'text',
                  },
                  {
                    name: 'sizes',
                    type: 'text',
                  },
                  {
                    name: 'name',
                    type: 'text',
                  },
                  {
                    name: 'alt',
                    type: 'text',
                  },
                ],
              },
              {
                name: 'review_count',
                type: 'number',
              },
              {
                name: 'permalink',
                type: 'text',
              },
            ],
            admin: {
              condition: (data, siblingData, { user }) => {
                if (data?.wc?.wc_id) {
                  return true
                } else {
                  return false
                }
              },
              readOnly: true,
            },
          },
        ],
      },
    ],
  },
]

export default fields

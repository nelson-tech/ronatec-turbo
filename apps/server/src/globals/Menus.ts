import { Field, GlobalConfig } from 'payload/types'
import link from '../fields/link'

const linkWithChildren: ({ mega }?: { mega?: boolean }) => Field[] = ({ mega = false } = {}) => [
  link({
    appearances: false,
    mega,
  }),
  {
    name: 'children',
    type: 'array',
    label: 'Child Links',
    labels: {
      singular: 'Child Link',
      plural: 'Child Links',
    },
    fields: [
      link({
        appearances: false,
      }),
      {
        name: 'children',
        type: 'array',
        label: 'Sub Child Links',
        labels: {
          singular: 'Sub Child Link',
          plural: 'Sub Child Links',
        },
        fields: [
          link({
            appearances: false,
          }),
        ],
        admin: {
          components: {
            RowLabel: ({ data }) => {
              return data?.link.label || `Sub Child Menu Item`
            },
          },
        },
      },
    ],
    admin: {
      components: {
        RowLabel: ({ data }) => {
          return data?.link.label || `Child Menu Item`
        },
      },
    },
  },
]

const Menus: GlobalConfig = {
  slug: 'menus',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'mainMenu',
          label: 'Main Menu',
          fields: [
            {
              name: 'links',
              type: 'array',
              label: 'Links',
              labels: {
                singular: 'Main Menu Item',
                plural: 'Main Menu Items',
              },
              fields: linkWithChildren({ mega: true }),

              admin: {
                components: {
                  RowLabel: ({ data }) => {
                    return data?.link.label || `Menu Item`
                  },
                },
              },
            },
          ],
        },
        {
          name: 'mobileMenu',
          label: 'Mobile Menu',
          fields: [
            {
              name: 'links',
              type: 'array',
              label: 'Links',
              labels: {
                singular: 'Mobile Menu Item',
                plural: 'Mobile Menu Items',
              },
              fields: linkWithChildren({ mega: true }),
              admin: {
                components: {
                  RowLabel: ({ data }) => {
                    return data?.label || `Menu Item`
                  },
                },
              },
            },
          ],
        },
        {
          name: 'footerMenu',
          label: 'Footer Menu',
          fields: [
            {
              name: 'links',
              type: 'array',
              label: 'Links',
              labels: {
                singular: 'Footer Menu Item',
                plural: 'Footer Menu Items',
              },
              fields: [
                link({
                  appearances: false,
                }),
              ],
              admin: {
                components: {
                  RowLabel: ({ data }) => {
                    return data?.label || `Menu Item`
                  },
                },
              },
            },
          ],
        },
      ],
    },
  ],
}

export default Menus

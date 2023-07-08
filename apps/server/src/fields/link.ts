import type { Field } from 'payload/types';

import deepMerge from '../utils/deepMerge';

export const appearanceOptions = {
  primary: {
    label: 'Primary Button',
    value: 'primary',
  },
  secondary: {
    label: 'Secondary Button',
    value: 'secondary',
  },
  default: {
    label: 'Default',
    value: 'default',
  },
};

export type LinkAppearances = 'primary' | 'secondary' | 'default';

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false;
  disableLabel?: boolean;
  overrides?: Record<string, unknown>;
  mega?: boolean;
}) => Field;

const link: LinkType = ({
  appearances,
  disableLabel = false,
  overrides = {},
  mega = false,
} = {}) => {
  const linkResult: Field = {
    name: 'link',
    type: 'group',
    label: false,
    interfaceName: 'NavLink',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
            defaultValue: 'reference',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
          },
        ],
      },
    ],
  };

  const linkTypes: Field[] = [
    {
      name: 'reference',
      label: 'Document to link to',
      type: 'relationship',
      relationTo: ['pages', 'products'],
      required: true,
      maxDepth: 1,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
    },
    {
      name: 'url',
      label: 'Custom URL',
      type: 'text',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
    },
  ];

  if (!disableLabel) {
    linkTypes[0].admin.width = '50%';
    linkTypes[1].admin.width = '50%';

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    });
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes];
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [
      appearanceOptions.default,
      appearanceOptions.primary,
      appearanceOptions.secondary,
    ];

    if (appearances) {
      appearanceOptionsToUse = appearances.map(
        appearance => appearanceOptions[appearance]
      );
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      defaultValue: 'default',
      options: appearanceOptionsToUse,
      admin: {
        description: 'Choose how the link should be rendered.',
      },
    });
  }

  // Add link options to bottom of link group
  linkResult.fields.push({
    type: 'row',
    fields: [
      {
        name: 'newTab',
        label: 'Open in new tab',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          width: '50%',
          style: {
            alignSelf: 'flex-end',
          },
        },
      },
      {
        name: 'megaMenu',
        label: 'MegaMenu',
        type: 'checkbox',
        defaultValue: false,
        hidden: !mega,
        admin: {
          width: '50%',
          style: {
            alignSelf: 'flex-end',
          },
        },
      },
    ],
  });

  return deepMerge(linkResult, overrides);
};

export default link;

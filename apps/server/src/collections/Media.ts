import type { CollectionConfig } from 'payload/types';

const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    // staticDir: path.resolve(__dirname, '../../media'),
    imageSizes: [
      {
        height: 400,
        width: 400,
        crop: 'center',
        name: 'square',
      },
      {
        width: 900,
        height: 450,
        crop: 'center',
        name: 'sixteenByNineMedium',
      },
    ],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      admin: {
        elements: ['link'],
      },
    },
  ],
};

export default Media;

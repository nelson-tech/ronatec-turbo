import path from 'path';
import type { CollectionConfig } from 'payload/types';

const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: path.resolve(__dirname, '../../media'),
    // Specify the size name that you'd like to use as admin thumbnail
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        height: 400,
        width: 400,
        crop: 'center',
        name: 'thumbnail',
      },
      {
        width: 900,
        height: 450,
        crop: 'center',
        name: 'sixteenByNineMedium',
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories'
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
    },
    // {
    //   name: 'content',
    //   type: 'richText'
    // },
  ],
};

export default Media;

import type { CollectionConfig } from 'payload/types';

import { admins } from '../../access/admins';
import { anyone } from '../../access/anyone';
import { populateArchiveBlock } from '../../hooks/populateArchiveBlock';
import { populatePublishedDate } from '../../hooks/populatePublishedDate';
import { beforeProductChange } from './hooks/beforeChange';
import { deleteProductFromCarts } from './hooks/deleteProductFromCarts';
import { checkRole } from '../../access/checkRole';
import { ProductFields } from './fields';

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    group: 'Shop',
    useAsTitle: 'title',
    defaultColumns: ['title', '_status'],
  },
  hooks: {
    beforeChange: [populatePublishedDate, beforeProductChange],
    afterRead: [populateArchiveBlock],
    afterDelete: [deleteProductFromCarts],
  },
  versions: {
    drafts: { autosave: true },
  },
  access: {
    read: anyone,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: ProductFields,
  endpoints: [
    {
      path: '/sync/wc',
      method: 'get',
      handler: async (req, res, next) => {
        const isAdmin = checkRole(['admin'], req.user);

        if (isAdmin) {
          const id = req.query.id;

          if (id) {
            res.status(200).send({ id });
          } else {
            res.status(200).send({ id: 'none' });
          }

          // const url = 'https://dev.api.ronatec.us/wp-json/wc/store/v1/products'
          // const productsResponse = await fetch(url)
          // const rawProducts: WCProduct[] = await productsResponse.json()

          // const products: Product[] = []

          // rawProducts.forEach(rawProduct => {
          //   const product: Partial<Product> = { sku: rawProduct.sku, title: rawProduct.name }
          // })
          // console.log('Products', rawProducts)
        } else {
          res.status(200).send({ error: 'Authorization denied' });
        }
      },
    },
  ],
};

export default Products;

import type { CollectionConfig } from 'payload/types';

import { admins } from '../../access/admins';
import { anyone } from '../../access/anyone';
import adminsAndUser from './access/adminsAndUser';
import { checkRole } from '../../access/checkRole';
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin';
import { loginAfterCreate } from './hooks/loginAfterCreate';
import purgeOldCarts from './hooks/purgeOldCarts';

export const UserFields: CollectionConfig['fields'] = [
  {
    name: 'name',
    type: 'text',
  },
  {
    name: 'roles',
    type: 'select',
    hasMany: true,
    defaultValue: ['customer'],
    options: [
      {
        label: 'admin',
        value: 'admin',
      },
      {
        label: 'customer',
        value: 'customer',
      },
    ],
    hooks: {
      beforeChange: [ensureFirstUserIsAdmin],
    },
    access: {
      read: admins,
      create: admins,
      update: admins,
    },
  },
  {
    name: 'purchases',
    label: 'Purchases',
    type: 'relationship',
    relationTo: 'products',
    hasMany: true,
  },
  {
    name: 'cart',
    type: 'relationship',
    relationTo: 'carts',
    hasMany: false,
    required: false,
    admin: { hidden: false },
    maxDepth: 0,
  },
];

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user),
  },
  auth: {
    cookies: {
      domain: 'localhost',
    },
    tokenExpiration: 3 * 24 * 60 * 60, // 3 days
  },
  hooks: {
    beforeChange: [],
    afterChange: [loginAfterCreate],
    afterLogin: [purgeOldCarts],
  },
  fields: UserFields,
  timestamps: true,
};

export default Users;

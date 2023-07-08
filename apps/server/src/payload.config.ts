// import { payloadCloud } from '@payloadcms/plugin-cloud'
import nestedDocs from '@payloadcms/plugin-nested-docs';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import path from 'path';
import { buildConfig } from 'payload/config';

import Categories from './collections/Categories';
import Media from './collections/Media';
import Orders from './collections/Orders';
import { Pages } from './collections/Pages';
import Products from './collections/Products';
import Users from './collections/Users';
import Logo from './components/Logo';
import BeforeDashboard from './components/BeforeDashboard';
import Menus from './globals/Menus';
import { Settings } from './globals/Settings';
import adapter from './utils/s3adapter';
import { Carts } from './collections/Carts';
import customGraphQLOperations from './graphql';
import AfterDashboard from './components/AfterDashboard';

const mockModulePath = path.resolve(__dirname, './emptyModuleMock.js');

const SITE_URL = process.env.PAYLOAD_PUBLIC_SITE_URL;

export default buildConfig({
  admin: {
    user: Users.slug,
    components: {
      // The BeforeDashboard component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import BeforeDashboard statement on line 15.
      beforeDashboard: [BeforeDashboard],
      afterDashboard: [AfterDashboard],
      graphics: {
        Logo,
        Icon: Logo,
      },
    },
    css: path.resolve(__dirname, 'styles.scss'),
    meta: {
      titleSuffix: ` - Ronatec`,
    },
    webpack: config => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          [path.resolve(__dirname, 'collections/Products/hooks/beforeChange')]:
            mockModulePath,
          [path.resolve(__dirname, 'routes/checkout')]: mockModulePath,
          express: mockModulePath,
        },
      },
    }),
  },
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  cookiePrefix: 'ronatec',
  collections: [Pages, Media, Products, Categories, Users, Carts, Orders],
  globals: [Menus, Settings],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    ...customGraphQLOperations,
  },
  cors: [SITE_URL, 'http://localhost:8140'].filter(Boolean),
  csrf: [SITE_URL, 'http://localhost:8140'].filter(Boolean),

  plugins: [
    nestedDocs({
      collections: ['categories'],
      parentFieldSlug: 'parent',
      breadcrumbsFieldSlug: 'breadcrumbs',
      generateLabel: (_, doc) => doc.title as string,
      generateURL: docs => `${SITE_URL}/products/${docs.at(-1).slug}`,
    }),
    cloudStorage({
      collections: {
        media: {
          adapter,
        },
      },
    }),
  ],
});

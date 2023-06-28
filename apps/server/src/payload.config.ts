import path from 'path';
import { buildConfig } from 'payload/config';
import Categories from './collections/Categories';
import Customers from './collections/Customers';
import Media from './collections/Media';
import Posts from './collections/Posts';
import Tags from './collections/Tags';
import Users from './collections/Users';

const clientUrls = [
  'http://localhost:5173',
  process.env.PAYLOAD_PUBLIC_SERVER_URL,
];

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
  },
  cors: clientUrls,
  csrf: clientUrls,
  collections: [Customers, Categories, Posts, Tags, Users, Media],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});

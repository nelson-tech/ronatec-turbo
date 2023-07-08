import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3'

const adapter = s3Adapter({
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    forcePathStyle: false,
  },
  bucket: process.env.S3_BUCKET,
})

export default adapter

import { CustomGraphQLMutationType } from '../../../../graphql/types'

export type ResolverArgs = {
  slug: String
}

const getProductBySlug: CustomGraphQLMutationType<ResolverArgs, 'products'> = (
  GraphQL,
  payload,
) => {
  return {
    getProductBySlug: {
      args: { slug: { type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLString) } },
      resolve: async (obj, args, context, info) => {
        const products = await context.req.payload.find({
          collection: 'products',
          where: { slug: { equals: args.slug } },
          depth: 0,
        })

        if (products.totalDocs > 0 && products.docs.length > 0) {
          const firstDoc = products.docs[0]

          if (firstDoc.slug === args.slug) return firstDoc
        }
        return null
      },
      type: payload.collections['products'].graphQL?.type,
    },
  }
}

export default getProductBySlug

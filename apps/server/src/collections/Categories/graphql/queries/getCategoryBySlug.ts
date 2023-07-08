import { CustomGraphQLMutationType } from '../../../../graphql/types'

export type ResolverArgs = {
  slug: String
}

const getCategoryBySlug: CustomGraphQLMutationType<ResolverArgs, 'categories'> = (
  GraphQL,
  payload,
) => {
  return {
    getCategoryBySlug: {
      args: { slug: { type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLString) } },
      resolve: async (obj, args, context, info) => {
        const categories = await context.req.payload.find({
          collection: 'categories',
          where: { slug: { equals: args.slug } },
          depth: 0,
        })

        if (categories.totalDocs > 0 && categories.docs.length > 0) {
          const firstDoc = categories.docs[0]

          if (firstDoc.slug === args.slug) return firstDoc
        }
        return null
      },
      type: payload.collections['categories'].graphQL?.type,
    },
  }
}

export default getCategoryBySlug

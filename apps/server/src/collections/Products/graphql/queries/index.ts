import { GraphQLExtension } from 'payload/config'
import getProductBySlug from './getProductBySlug'

const cartGraphQLQueries: GraphQLExtension = (GraphQL, payload) => {
  return {
    ...getProductBySlug(GraphQL, payload),
  }
}

export default cartGraphQLQueries

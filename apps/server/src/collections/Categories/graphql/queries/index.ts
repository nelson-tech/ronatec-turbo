import { GraphQLExtension } from 'payload/config'
import getCategoryBySlug from './getCategoryBySlug'

const cartGraphQLQueries: GraphQLExtension = (GraphQL, payload) => {
  return {
    ...getCategoryBySlug(GraphQL, payload),
  }
}

export default cartGraphQLQueries

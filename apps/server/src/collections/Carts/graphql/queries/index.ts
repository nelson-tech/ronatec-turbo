import { GraphQLExtension } from 'payload/config'
import getCart from './getCart'

const cartGraphQLQueries: GraphQLExtension = (GraphQL, payload) => {
  return {
    ...getCart(GraphQL, payload),
  }
}

export default cartGraphQLQueries

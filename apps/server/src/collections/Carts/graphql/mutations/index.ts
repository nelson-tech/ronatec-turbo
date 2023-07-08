import { GraphQLExtension } from 'payload/config'
import addCartItems from './addCartItems'
import removeCartItem from './removeCartItem'
import updateCartItem from './updateCartItem'

const cartGraphQLMutations: GraphQLExtension = (GraphQL, payload) => {
  return {
    ...removeCartItem(GraphQL, payload),
    ...addCartItems(GraphQL, payload),
    ...updateCartItem(GraphQL, payload),
  }
}

export default cartGraphQLMutations

import { Cart } from 'payload/generated-types'
import { CustomGraphQLMutationType } from '../../../../graphql/types'
import getCart from '../utils/getCart'

export type ResolverArgs = {
  product: string
  quantity: number
}

const updateCartItem: CustomGraphQLMutationType<ResolverArgs, 'carts'> = (GraphQL, payload) => {
  return {
    updateCartItemQuantity: {
      args: {
        product: { type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLString) },
        quantity: { type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLInt) },
      },
      resolve: async (obj, args, context, info) => {
        const cart = await getCart(context)

        const updatedItems = cart.items.map(item =>
          item.product === args.product ? { ...item, ...args } : item,
        )

        const updatedCart = await payload.update({
          collection: 'carts',
          id: cart.id,
          data: { items: updatedItems },
        })
        return updatedCart
      },
      type: payload.collections['carts'].graphQL?.type,
    },
  }
}

export default updateCartItem

import getCart from '../utils/getCart'
import { CustomGraphQLMutationType } from '../../../../graphql/types'

export type ResolverArgs = {
  product: string
}

const removeCartItem: CustomGraphQLMutationType<ResolverArgs, 'carts'> = (GraphQL, payload) => {
  return {
    removeCartItem: {
      args: {
        product: {
          type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLString),
        },
      },
      resolve: async (obj, args, context, info) => {
        const cart = await getCart(context)

        const filteredItems = cart.items.filter(item => item.product !== args.product)

        const updatedCart = await payload.update({
          collection: 'carts',
          id: cart.id,
          data: { items: filteredItems },
        })

        return updatedCart
      },
      type: payload.collections['carts'].graphQL?.type,
    },
  }
}

export default removeCartItem

import { Cart } from 'payload/generated-types'
import { CustomGraphQLMutationType } from '../../../../graphql/types'
import getCart from '../utils/getCart'
import mergeCartItems from '../utils/mergeCartItems'

export type ResolverArgs = {
  items: Cart['items']
}

const addCartItems: CustomGraphQLMutationType<ResolverArgs, 'carts'> = (GraphQL, payload) => {
  const mutationFields = payload.Mutation.fields
  const updateCartDataFields = mutationFields.updateCart.args.data.type.ofType._fields()
  const itemsType = updateCartDataFields.items.type

  return {
    addCartItems: {
      args: {
        items: {
          type: new GraphQL.GraphQLNonNull(itemsType),
        },
      },
      resolve: async (obj, args, context, info) => {
        const cart = await getCart(context)

        const mergedItems = mergeCartItems({ newItems: args.items, existingItems: cart.items })

        const updatedCart = await payload.update({
          collection: 'carts',
          id: cart.id,
          data: { items: mergedItems },
        })
        return updatedCart
      },
      type: payload.collections['carts'].graphQL?.type,
    },
  }
}

export default addCartItems

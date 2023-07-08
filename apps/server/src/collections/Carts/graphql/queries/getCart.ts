import { Cart } from 'payload/generated-types'
import { CustomGraphQLMutationType } from '../../../../graphql/types'
import getCartUtil from '../utils/getCart'

const getCart: CustomGraphQLMutationType<{}, 'carts'> = (GraphQL, payload) => {
  return {
    getCart: {
      args: {},
      resolve: async (obj, args, context, info) => {
        const cart = await getCartUtil(context)
        return cart
      },
      type: payload.collections['carts'].graphQL?.type,
    },
  }
}

export default getCart

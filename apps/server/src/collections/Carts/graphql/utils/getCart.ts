import { User } from 'payload/generated-types'
import { PayloadRequest } from 'payload/types'
import { GraphQLContextType } from '../../../../graphql/types'
import getCartID from './getCartID'

const getCart = async (context: GraphQLContextType) => {
  const { req, res } = context

  const cartID = await getCartID({ req, res })

  try {
    const cart = await req.payload.findByID({
      collection: 'carts',
      id: cartID,
      depth: 0,
    })

    if (cart) return cart

    return null
  } catch (error) {
    throw new Error('No cart found. Either an issue with cart ID or authentication.')
  }
}

export default getCart

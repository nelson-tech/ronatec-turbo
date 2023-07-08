import { Cart } from 'payload/generated-types'
import { CollectionBeforeChangeHook } from 'payload/types'

const updateLastEdit: CollectionBeforeChangeHook<Cart> = async ({ data, req }): Promise<Cart> => {
  const updatedCart = { ...data, lastEdit: new Date().getTime() } as Cart

  return updatedCart
}

export default updateLastEdit

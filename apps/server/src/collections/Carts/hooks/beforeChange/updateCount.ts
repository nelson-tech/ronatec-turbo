import { CollectionBeforeChangeHook } from 'payload/types'
import { Cart } from '../../../../payload-types'

const updateCountHook: CollectionBeforeChangeHook<Cart> = async ({ data }) => {
  let count = 0
  data?.items &&
    data?.items.length > 0 &&
    data.items.forEach(item => {
      count += item.quantity
    })

  const updatedCart = { ...data, count }

  return updatedCart
}

export default updateCountHook

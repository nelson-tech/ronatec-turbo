import { Cart } from 'payload/generated-types'

type MergeCartItemsInputType = {
  newItems: Cart['items']
  existingItems: Cart['items']
}

type MergeCartItemsType = (args: MergeCartItemsInputType) => Cart['items']

const mergeCartItems: MergeCartItemsType = ({ newItems, existingItems }) => {
  let mergedItems = new Map<string, Cart['items'][0]>()
  ;[...newItems, ...existingItems].forEach(item => {
    const productID = item.product as string

    mergedItems.has(productID)
      ? mergedItems.set(productID, {
          ...item,
          quantity: mergedItems.get(productID).quantity + item.quantity,
        })
      : mergedItems.set(productID, item)
  })

  return Array.from(mergedItems.values())
}

export default mergeCartItems

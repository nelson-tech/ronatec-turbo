import { Product } from 'payload/generated-types'
import { CollectionBeforeChangeHook } from 'payload/types'

export const beforeProductChange: CollectionBeforeChangeHook<Product> = async ({
  req,
  data,
  originalDoc,
}) => {
  const { payload } = req

  const newDoc = {
    ...data,
    hasVariation: data.variations.length > 0,
  }

  return newDoc
}

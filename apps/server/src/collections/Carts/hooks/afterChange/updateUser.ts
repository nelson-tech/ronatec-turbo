import { CollectionAfterChangeHook } from 'payload/types'
import { Cart, User } from '../../../../payload-types'
import { checkRole } from '../../../../access/checkRole'
import removeCartFromUser from '../../utils/removeCartFromUser'

const updateUserHook: CollectionAfterChangeHook<Cart> = async ({
  doc, // full document data
  req, // full express request
  previousDoc, // document data before updating the collection
  operation, // name of the operation ie. 'create', 'update'
}) => {
  const user = req.user as User

  const currentOwner = doc.user as string | null
  const previousOwner = previousDoc?.user as string | null

  const newOwner = previousOwner !== currentOwner

  if (newOwner && user) {
    const isAdmin = checkRole(['admin'], user)

    // remove cart from previous owner if exists
    if (previousOwner && (isAdmin || previousOwner === user.id)) {
      await removeCartFromUser(previousOwner, req.payload)
    }

    // add cart to new owner if admin or actual user
    if (currentOwner && (isAdmin || user.id === currentOwner)) {
      const newOwnerData = await req.payload.findByID({ collection: 'users', id: currentOwner })

      const response = await req.payload.update({
        collection: 'users',
        id: currentOwner,
        data: { ...newOwnerData, cart: doc.id } as User,
      })
    }
  }

  return doc
}

export default updateUserHook

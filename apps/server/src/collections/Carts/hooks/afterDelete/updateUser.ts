import { CollectionAfterDeleteHook } from 'payload/types'
import removeCartFromUser from '../../utils/removeCartFromUser'

const updateUser: CollectionAfterDeleteHook = async ({ req, id, doc }) => {
  // remove cart from previous owner if exists
  if (doc.user?.id) {
    await removeCartFromUser(doc.user.id, req.payload)
  }
}

export default updateUser

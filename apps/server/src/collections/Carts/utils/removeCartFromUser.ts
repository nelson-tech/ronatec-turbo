import { Payload } from 'payload'
import { User } from '../../../payload-types'

const removeCartFromUser = async (userID: string, payload: Payload) => {
  // get user data
  const userData = (await payload.findByID({ collection: 'users', id: userID })) as User

  // if user found and cart exists, remove it
  userData.cart &&
    (await payload.update({
      collection: 'users',
      id: userID,
      data: { ...userData, cart: null } as User,
    }))
}

export default removeCartFromUser

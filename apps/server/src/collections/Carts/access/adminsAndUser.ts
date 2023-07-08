import type { Access } from 'payload/types'

import { checkRole } from '../../../access/checkRole'
import { Cart, User } from 'payload/generated-types'

const adminsAndUser: Access<Cart, User> = ({ req: { user }, id }) => {
  if (user) {
    if (checkRole(['admin'], user)) {
      return true
    }

    return {
      'user.id': { equals: user.id },
    }
  }

  return {
    user: { equals: null },
  }
}

export default adminsAndUser

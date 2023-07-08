import type { Access } from 'payload/types'

import { checkRole } from '../../../access/checkRole'
import { User } from '../../../payload-types'

const adminsAndUser: Access<User, User> = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin'], user)) {
      return true
    }

    return {
      id: { equals: user.id },
    }
  }

  return false
}

export default adminsAndUser

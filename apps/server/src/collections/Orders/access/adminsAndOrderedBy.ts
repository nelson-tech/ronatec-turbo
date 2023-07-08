import type { Access } from 'payload/config'

import { checkRole } from '../../../access/checkRole'
import { Order, User } from '../../../payload-types'

export const adminsAndOrderedBy: Access<Order, User> = ({ req: { user }, data }) => {
  if (user) {
    if (checkRole(['admin'], user)) {
      return true
    }

    return {
      'orderedBy.user.id': { equals: user.id },
    }
  }

  return true
}

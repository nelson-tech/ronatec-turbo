import type { AccessArgs } from 'payload/config'

import { checkRole } from './checkRole'
import type { User } from '../payload-types'

type isAdmin = (args: AccessArgs<any, User>) => boolean

export const admins: isAdmin = ({ req: { user } }) => {
  return checkRole(['admin'], user)
}

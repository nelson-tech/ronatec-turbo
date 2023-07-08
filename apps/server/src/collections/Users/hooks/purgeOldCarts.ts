import { User } from 'payload/generated-types'
import { CollectionAfterLoginHook } from 'payload/types'
import { checkRole } from '../../../access/checkRole'

const purgeOldCarts: CollectionAfterLoginHook<User> = async ({ req: { payload }, user }) => {
  const ONE_DAY = 24 * 60 * 60 * 1000
  const EXP_LENGTH = ONE_DAY * 30
  const oldestOkay = new Date().getTime() - EXP_LENGTH

  if (checkRole(['admin'], user)) {
    // don't await so admin doesn't see lag when logging in
    payload.delete({
      collection: 'carts',
      where: {
        and: [
          { user: { exists: false } },
          { or: [{ lastEdit: { exists: false } }, { lastEdit: { less_than: oldestOkay } }] },
        ],
      },
      depth: 0,
      user,
    })
  }

  return user
}

export default purgeOldCarts

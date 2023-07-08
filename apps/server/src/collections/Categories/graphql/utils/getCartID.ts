import Cookie from 'cookie'

import { GraphQLContextType } from '../../../../graphql/types'
import mergeCartItems from './mergeCartItems'

const getCartID = async ({ req, res }: GraphQLContextType) => {
  // cookies
  const cookies = req.headers.cookie ? Cookie.parse(req.headers.cookie) : null
  const { cookiePrefix } = req.payload.config
  const cartCookieKey = `${cookiePrefix}-cart`
  const cartIDFromCookie = cookies ? cookies[cartCookieKey] : null

  let cartID: string | null

  if (req.user?.id) {
    // user logged in

    const cartIDFromUser = !!req.user?.cart ? (req.user.cart as string) : null

    if (cartIDFromUser) {
      // user has cart assigned

      if (cartIDFromCookie) {
        // merge carts and delete cookie

        try {
          const cartFromCookie = await req.payload
            .findByID({
              collection: 'carts',
              id: cartIDFromCookie,
              depth: 0,
            })
            .catch(() => ({ items: [] }))
          const cartFromUser = await req.payload.findByID({
            collection: 'carts',
            id: cartIDFromUser,
            depth: 0,
          })

          const mergedItems = mergeCartItems({
            newItems: cartFromCookie.items,
            existingItems: cartFromUser.items,
          })

          await req.payload.update({
            collection: 'carts',
            id: cartIDFromUser,
            data: { items: mergedItems },
          })

          // delete merged guest cart
          await req.payload.delete({ collection: 'carts', id: cartIDFromCookie })
        } catch (error) {
          console.warn('No guest cart found')
        }
        res.set(
          'set-cookie',
          `${cartCookieKey}=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
        )
      }

      cartID = cartIDFromUser
    } else {
      // user has no cart assigned

      if (cartIDFromCookie) {
        // assign user to cart
        await req.payload.update({
          collection: 'carts',
          id: cartIDFromCookie,
          data: { user: req.user.id },
        })

        // assign cart to user
        await req.payload.update({
          collection: 'users',
          id: req.user.id,
          data: { cart: cartIDFromCookie },
        })

        // delete cart cookie
        res.set(
          'set-cookie',
          `${cartCookieKey}=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
        )

        cartID = cartIDFromCookie
      } else {
        // create cart and assign user
        const newCart = await req.payload.create({
          collection: 'carts',
          data: { user: req.user.id, items: [] },
          depth: 0,
        })

        // assign cart to user
        await req.payload.update({
          collection: 'users',
          id: req.user.id,
          data: { cart: newCart.id },
        })

        cartID = newCart.id
      }
    }
  } else {
    // guest user

    if (cartIDFromCookie) {
      cartID = cartIDFromCookie
    } else {
      // no cart assigned to guest
      // create cart and set cookie
      const newCart = await req.payload.create({
        collection: 'carts',
        data: { items: [], count: 0 },
        depth: 0,
      })

      cartID = newCart?.id

      const cartExpLength = 30 * 24 * 60 * 60 * 1000 // 30 days
      const cookieOptions: { [key: string]: string | boolean } = {
        [cartCookieKey]: newCart.id,
        path: '/',
        expires: new Date(Date.now() + cartExpLength).toUTCString(),
        httpOnly: true,
        // secure: true,
      }

      const cookieString = Object.entries(cookieOptions)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ')

      res.set('set-cookie', cookieString)
    }
  }

  return cartID
}

export default getCartID

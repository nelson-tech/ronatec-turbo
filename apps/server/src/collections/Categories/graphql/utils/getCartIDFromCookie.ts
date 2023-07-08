import Cookie from 'cookie'
import { GraphQLContextType } from '../../../../graphql/types'

const getCartIDFromCookie = ({ req, res }: GraphQLContextType) => {
  const authCookie = Cookie.parse(req.headers.cookie)
  // const parseCookie = cookie => JSON.parse(Buffer.from(cookie.split('.')[1], 'base64').toString())
  console.log('Res', authCookie)
}

export default getCartIDFromCookie

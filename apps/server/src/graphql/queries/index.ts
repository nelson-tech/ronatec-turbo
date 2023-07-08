import { GraphQLExtension } from 'payload/config'
import productGraphQLQueries from '../../collections/Products/graphql/queries'
import categoryGraphQLQueries from '../../collections/Categories/graphql/queries'
import cartGraphQLQueries from '../../collections/Carts/graphql/queries'

const customGraphQLQueries: GraphQLExtension = (GraphQL, payload) => {
  return {
    ...productGraphQLQueries(GraphQL, payload),
    ...categoryGraphQLQueries(GraphQL, payload),
    ...cartGraphQLQueries(GraphQL, payload),
  }
}

export default customGraphQLQueries

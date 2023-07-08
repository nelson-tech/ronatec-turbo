import { GraphQLExtension } from 'payload/config'
import cartMutations from '../../collections/Carts/graphql/mutations'

const customGraphQLMutations: GraphQLExtension = (GraphQL, payload) => {
  return {
    ...cartMutations(GraphQL, payload),
  }
}

export default customGraphQLMutations

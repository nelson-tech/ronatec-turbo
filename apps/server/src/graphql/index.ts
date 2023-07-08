import { GraphQLExtension } from 'payload/config'
import queries from './queries'
import mutations from './mutations'

type customGraphQLOperationsType = {
  queries: GraphQLExtension
  mutations: GraphQLExtension
}

const customGraphQLOperations: customGraphQLOperationsType = {
  queries,
  mutations,
}

export default customGraphQLOperations

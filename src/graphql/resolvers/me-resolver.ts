import { QueryResolvers } from '../../types/graphql'
import { fromUser } from './common/db-to-gql'

/**
 * Fetches data of current user
 */
export const meResolver: QueryResolvers['me'] = async (
  parent,
  args,
  context,
) => {
  const { user } = context

  if (user) {
    return fromUser(user)
  }
  return {
    isAuthenticated: false,
  }
}

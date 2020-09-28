import { QueryResolvers } from '../../types/graphql'

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
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      googleId: user.googleId,
      thumbnail: user.thumbnail,
      isAuthenticated: true,
    }
  }
  return {
    isAuthenticated: false,
  }
}

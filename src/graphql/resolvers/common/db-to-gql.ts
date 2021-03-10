import { User as DBUser } from '../../../entity'
import { User as GqlUser } from '../../../types/graphql-types'
export function fromUser(user: DBUser): GqlUser {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    googleId: user.googleId,
    thumbnail: user.thumbnail,
    isAuthenticated: true,
  }
}
